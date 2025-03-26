'use client';

import { useState, useEffect } from 'react';
import { fetchFromGAS, postToGAS } from '@/lib/gas-client';
import type { Salesperson } from '@/lib/gas-client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

export default function SalespersonList() {
  const [salespersons, setSalespersons] = useState<Salesperson[]>([]);
  const [loading, setLoading] = useState(true);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const { toast } = useToast();

  // 担当者一覧を取得
  const fetchSalespersons = async () => {
    try {
      const response = await fetchFromGAS<{ salespersons: Salesperson[] }>('getSalespersons');
      if (response.success && response.data) {
        setSalespersons(response.data.salespersons);
      } else {
        throw new Error(response.error || '担当者データの取得に失敗しました');
      }
    } catch (error) {
      toast({
        title: 'エラー',
        description: error instanceof Error ? error.message : '担当者データの取得に失敗しました',
        variant: 'destructive',
      });
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
        toast({
          title: '成功',
          description: '担当者を追加しました',
        });
        setNewName('');
        setNewEmail('');
        fetchSalespersons();
      } else {
        throw new Error(response.error || '担当者の追加に失敗しました');
      }
    } catch (error) {
      toast({
        title: 'エラー',
        description: error instanceof Error ? error.message : '担当者の追加に失敗しました',
        variant: 'destructive',
      });
    }
  };

  useEffect(() => {
    fetchSalespersons();
  }, []);

  if (loading) {
    return <div>読み込み中...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">営業担当者一覧</h1>

      {/* 担当者追加フォーム */}
      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">名前</label>
          <Input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">メールアドレス</label>
          <Input
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            required
          />
        </div>
        <Button type="submit">追加</Button>
      </form>

      {/* 担当者一覧 */}
      <div className="grid gap-4">
        {salespersons.length === 0 ? (
          <p>担当者が登録されていません</p>
        ) : (
          salespersons.map((person) => (
            <div
              key={person.id}
              className="border rounded-lg p-4 flex justify-between items-center"
            >
              <div>
                <h3 className="font-medium">{person.name}</h3>
                <p className="text-sm text-gray-500">{person.email}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
} 