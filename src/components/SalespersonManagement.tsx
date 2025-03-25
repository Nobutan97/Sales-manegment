'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';

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
      const response = await fetch('/api/salespersons');
      if (!response.ok) throw new Error('担当者データの取得に失敗しました');
      const data = await response.json();
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
    if (!newName.trim()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/salespersons', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newName.trim(),
        }),
      });

      if (!response.ok) throw new Error('担当者の追加に失敗しました');
      
      setNewName('');
      fetchSalespersons();
    } catch (err) {
      setError(err instanceof Error ? err.message : '予期せぬエラーが発生しました');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('この担当者を削除してもよろしいですか？')) return;

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/salespersons', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) throw new Error('担当者の削除に失敗しました');
      
      fetchSalespersons();
    } catch (err) {
      setError(err instanceof Error ? err.message : '予期せぬエラーが発生しました');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center p-6">
          <Loader2 className="h-6 w-6 animate-spin" />
        </CardContent>
      </Card>
    );
  }

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
          {salespersons.length === 0 ? (
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