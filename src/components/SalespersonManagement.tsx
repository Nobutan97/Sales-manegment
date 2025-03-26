'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { fetchFromGAS, postToGAS } from '@/lib/gas-client';

interface Salesperson {
  id: string;
  name: string;
}

export default function SalespersonManagement() {
  const [salespersons, setSalespersons] = useState<Salesperson[]>([]);
  const [newName, setNewName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchSalespersons = async () => {
    try {
      const data = await fetchFromGAS();
      setSalespersons(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : '予期せぬエラーが発生しました');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSalespersons();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      console.log('送信開始:', { name: newName });
      const response = await postToGAS('salespersons', { name: newName.trim() });
      console.log('送信結果:', response);
      if (!response.success) {
        throw new Error(response.message || '担当者の追加に失敗しました');
      }
      setNewName('');
      await fetchSalespersons();
      setError('');
    } catch (error) {
      console.error('エラー詳細:', error);
      setError(error instanceof Error ? error.message : '担当者の追加に失敗しました');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    // 削除機能は現在サポートされていません
    alert('削除機能は現在サポートされていません');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>担当者管理</CardTitle>
      </CardHeader>
      <CardContent>
        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="flex gap-2">
            <Input
              type="text"
              value={newName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewName(e.target.value)}
              placeholder="担当者名"
              required
            />
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  追加中...
                </>
              ) : (
                '追加'
              )}
            </Button>
          </div>
        </form>

        <div className="space-y-2">
          {loading ? (
            <div className="flex justify-center py-4">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          ) : salespersons.length === 0 ? (
            <p className="text-gray-500 text-center py-4">
              担当者が登録されていません
            </p>
          ) : (
            salespersons.map((person) => (
              <div
                key={person.id}
                className="flex justify-between items-center p-3 bg-gray-50 rounded"
              >
                <span>{person.name}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(person.id)}
                  disabled={isSubmitting}
                  className="text-red-600 hover:text-red-800"
                >
                  削除
                </Button>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
} 