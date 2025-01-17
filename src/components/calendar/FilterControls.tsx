import React from 'react';

export function FilterControls() {
  return (
    <div className="flex space-x-2">
      <select className="rounded-md border-gray-300 py-1 px-3 text-sm">
        <option>1年</option>
        <option>2年</option>
        <option>3年</option>
      </select>
      <select className="rounded-md border-gray-300 py-1 px-3 text-sm">
        <option>昼間部</option>
        <option>夜間部</option>
      </select>
      <select className="rounded-md border-gray-300 py-1 px-3 text-sm">
        <option>Aクラス</option>
        <option>Bクラス</option>
        <option>Nクラス</option>
      </select>
    </div>
  );
}