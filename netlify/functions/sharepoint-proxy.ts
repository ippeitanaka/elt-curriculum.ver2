import { Handler } from '@netlify/functions';
import https from 'https';

export const handler: Handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers };
  }

  if (event.httpMethod !== 'POST' || !event.body) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: 'Invalid request' })
    };
  }

  try {
    const { url, originalUrl } = JSON.parse(event.body);
    
    if (!url) {
      throw new Error('URL is required');
    }

    // カスタムHTTPSエージェントを作成（タイムアウト設定付き）
    const agent = new https.Agent({
      timeout: 30000, // 30秒
      rejectUnauthorized: true
    });

    const response = await fetch(url, {
      agent,
      headers: {
        'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Cache-Control': 'no-cache',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    if (!response.ok) {
      let errorMessage = 'ファイルのダウンロードに失敗しました';
      
      switch (response.status) {
        case 401:
          errorMessage = '認証エラー: 共有リンクの権限設定を確認してください';
          break;
        case 403:
          errorMessage = 'アクセス拒否: 共有リンクの権限が不足しています';
          break;
        case 404:
          errorMessage = 'ファイルが見つかりません: URLを確認してください';
          break;
        case 429:
          errorMessage = 'リクエスト制限超過: しばらく時間をおいて再試行してください';
          break;
      }

      throw new Error(`${errorMessage} (${response.status})`);
    }

    const contentType = response.headers.get('content-type');
    if (!contentType?.includes('spreadsheet')) {
      throw new Error('ダウンロードされたファイルがExcelファイルではありません');
    }

    const buffer = await response.arrayBuffer();
    const base64Data = Buffer.from(buffer).toString('base64');

    return {
      statusCode: 200,
      headers: {
        ...headers,
        'Content-Type': contentType,
        'Content-Disposition': 'attachment; filename=schedule.xlsx'
      },
      body: base64Data,
      isBase64Encoded: true
    };
  } catch (error) {
    console.error('Proxy error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: error instanceof Error ? error.message : 'Internal server error',
        details: error instanceof Error ? error.stack : undefined
      })
    };
  }
};