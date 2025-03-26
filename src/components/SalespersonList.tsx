'use client';

import { useState, useEffect } from 'react';
import { fetchFromGAS, postToGAS } from '@/lib/gas-client';
import type { Salesperson } from '@/lib/gas-client';

export default function SalespersonList() {
  const [salespersons, setSalespersons] = useState<Salesperson[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');

  // 担当者一覧を取得
  const fetchSalespersons = async () => {
    try {
      const response = await fetchFromGAS();
      if (response.success && response.data?.salespersons) {
        setSalespersons(response.data.salespersons);
      } else {
        setError('担当者データの取得に失敗しました');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : '担当者データの取得に失敗しました');
    } finally {
      setLoading(false);
    }
  };

  // 担当者を追加
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await postToGAS('addSalesperson', {
        name: newName,
        email: newEmail,
      });

      if (response.success) {
        setNewName('');
        setNewEmail('');
        fetchSalespersons();
      } else {
        setError(response.error || '担当者の追加に失敗しました');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : '担当者の追加に失敗しました');
    }
  };

  useEffect(() => {
    fetchSalespersons();
  }, []);

  if (loading) {
    return <div>読み込み中...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">営業担当者一覧</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* 担当者追加フォーム */}
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
        <div>
          <label className="block text-sm font-medium mb-1">メールアドレス</label>
          <input
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
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

      {/* 担当者一覧 */}
      <div className="space-y-4">
        {salespersons.length === 0 ? (
          <p>担当者が登録されていません</p>
        ) : (
          salespersons.map((person) => (
            <div
              key={person.id}
              className="border rounded p-4"
            >
              <h3 className="font-medium">{person.name}</h3>
              <p className="text-sm text-gray-500">{person.email}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
} 