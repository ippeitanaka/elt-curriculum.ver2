import React from 'react';
import { SearchX } from 'lucide-react';

export function NoResults() {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <SearchX className="h-12 w-12 text-gray-400 mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        検索結果が見つかりません
      </h3>
      <p className="text-sm text-gray-500 text-center max-w-md">
        検索条件を変更して、再度お試しください。
        フィルターをクリアするか、より広い範囲で検索することをお勧めします。
      </p>
    </div>
  );
}