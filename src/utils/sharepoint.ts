import { Schedule } from '../types/schedule';
import { parseExcelFile } from './excel/parser';

export async function parseExcelFromSharePoint(sharePointUrl: string): Promise<Schedule[]> {
  try {
    // SharePointの共有リンクを検証
    if (!isValidSharePointUrl(sharePointUrl)) {
      throw new Error('有効なSharePointの共有リンクではありません。\n正しい形式の共有リンクを入力してください。');
    }

    // SharePointのダウンロードURLを構築
    const downloadUrl = convertToDownloadUrl(sharePointUrl);

    // プロキシを通してファイルをダウンロード
    const response = await fetch('/.netlify/functions/sharepoint-proxy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        url: downloadUrl,
        originalUrl: sharePointUrl 
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'ファイルのダウンロードに失敗しました');
    }

    // レスポンスをBlobとして取得
    const blob = await response.blob();
    
    // Content-Typeを確認
    if (!blob.type.includes('spreadsheet')) {
      throw new Error('ダウンロードされたファイルがExcelファイルではありません');
    }

    const file = new File([blob], 'schedule.xlsx', { type: blob.type });

    // Excelファイルをパース
    const schedules = await parseExcelFile(file);

    if (schedules.length === 0) {
      throw new Error('有効なスケジュールデータが見つかりませんでした');
    }

    return schedules;
  } catch (error) {
    console.error('SharePoint Excel parse error:', error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('SharePointからのデータ読み込みに失敗しました');
  }
}

function isValidSharePointUrl(url: string): boolean {
  try {
    const parsedUrl = new URL(url);
    
    // SharePointのドメインチェック
    if (!parsedUrl.hostname.includes('sharepoint.com')) {
      return false;
    }

    // 共有リンクのパターンチェック
    const validPatterns = [
      '/:x:/g/', // 標準的な共有リンク
      '/:w:/g/', // Web表示用リンク
      '/personal/', // 個人用OneDriveリンク
      '/teams/' // Teamsファイル
    ];

    return validPatterns.some(pattern => parsedUrl.pathname.includes(pattern));
  } catch {
    return false;
  }
}

function convertToDownloadUrl(shareUrl: string): string {
  try {
    const url = new URL(shareUrl);
    const path = url.pathname;

    // ファイルIDの抽出パターンを拡張
    const patterns = [
      /\/:x:\/g\/(.*?)\//,
      /\/:w:\/g\/(.*?)\//,
      /\/personal\/(.*?)\//,
      /\/teams\/(.*?)\//
    ];

    let fileId = '';
    for (const pattern of patterns) {
      const matches = path.match(pattern);
      if (matches && matches[1]) {
        fileId = matches[1];
        break;
      }
    }

    if (!fileId) {
      throw new Error('ファイルIDの抽出に失敗しました');
    }

    const baseUrl = `https://${url.hostname}`;
    const downloadPath = `/_layouts/15/download.aspx`;
    const downloadParams = new URLSearchParams({
      'share': fileId,
      'download': '1',
      'app': '1', // アプリケーションでの開封を指定
      'e': new URLSearchParams(url.search).get('e') || ''
    });

    return `${baseUrl}${downloadPath}?${downloadParams.toString()}`;
  } catch (error) {
    throw new Error('ダウンロードURLの生成に失敗しました');
  }
}