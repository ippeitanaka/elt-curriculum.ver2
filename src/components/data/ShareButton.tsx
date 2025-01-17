import React, { useState } from 'react';
import { Share2, Check, Copy, AlertCircle } from 'lucide-react';
import { useSchedules } from '../../contexts/schedule';
import { scheduleDB } from '../../services/db';

export function ShareButton() {
  const { schedules } = useSchedules();
  const [isGenerating, setIsGenerating] = useState(false);
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [shareUrl, setShareUrl] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleShare = async () => {
    if (schedules.length === 0) {
      setError('共有するデータがありません。');
      return;
    }

    setIsGenerating(true);
    setError(null);
    
    try {
      const timestamp = Date.now().toString(36);
      const randomStr = Math.random().toString(36).substring(2, 7);
      const shareId = `${timestamp}-${randomStr}`;
      
      // IndexedDBに共有データを保存
      await scheduleDB.saveSharedSchedules(shareId, schedules);
      
      // 保存成功後にURLを生成
      const url = `${window.location.origin}/s/${shareId}`;
      setShareUrl(url);
      setShowShareDialog(true);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '共有URLの生成に失敗しました。';
      console.error('Share error:', errorMessage);
      setError(errorMessage);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy URL:', error);
      setError('URLのコピーに失敗しました。');
    }
  };

  return (
    <>
      <button
        onClick={handleShare}
        disabled={isGenerating || schedules.length === 0}
        className={`
          inline-flex items-center px-4 py-2 rounded-md
          ${isGenerating || schedules.length === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}
          text-white font-medium text-sm transition-colors
        `}
      >
        <Share2 className="w-4 h-4 mr-2" />
        {isGenerating ? '生成中...' : '共有URLを発行'}
      </button>

      {error && (
        <div className="fixed top-4 right-4 bg-red-100 text-red-700 px-4 py-2 rounded-md flex items-center shadow-lg">
          <AlertCircle className="w-4 h-4 mr-2" />
          {error}
          <button 
            onClick={() => setError(null)}
            className="ml-4 text-red-500 hover:text-red-700"
          >
            ✕
          </button>
        </div>
      )}

      {showShareDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full">
            <h3 className="text-lg font-medium mb-4">共有URL</h3>
            <div className="flex items-center space-x-2 mb-4">
              <input
                type="text"
                value={shareUrl}
                readOnly
                className="flex-1 p-2 border rounded-md bg-gray-50"
              />
              <button
                onClick={handleCopy}
                className={`p-2 rounded-md ${
                  copied ? 'bg-green-100 text-green-600' : 'bg-gray-100 hover:bg-gray-200'
                }`}
                title={copied ? 'コピーしました' : 'URLをコピー'}
              >
                {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
              </button>
            </div>
            <div className="text-sm text-gray-600 mb-4">
              <p>
                このURLを共有することで、他のユーザーがカリキュラムデータを閲覧できます。
                データを更新する場合は、新しい共有URLを発行してください。
              </p>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setShowShareDialog(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
              >
                閉じる
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}