'use client';

import { useState } from 'react';
import { postToGAS } from '@/lib/gas-client';

export default function SalespersonList() {
  const [newName, setNewName] = useState('');
  const [error, setError] = useState<string | null>(null);

  // 担当者を追加
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await postToGAS('addSalesperson', {
        name: newName
      });

      if (response.success) {
        setNewName('');
        alert('追加しました');
      } else {
        setError(response.error || '担当者の追加に失敗しました');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : '担当者の追加に失敗しました');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">営業担当者登録</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">名前</label>
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          追加
        </button>
      </form>
    </div>
  );
} 