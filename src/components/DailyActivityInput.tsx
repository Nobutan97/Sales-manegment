'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2 } from 'lucide-react';
import { fetchFromGAS, postToGAS } from '@/lib/gas-client';

interface Salesperson {
  id: string;
  name: string;
}

interface DailyActivity {
  date: string;
  salesperson_id: string;
  approaches: number;
  appointments: number;
  meetings: number;
  trials: number;
  contracts: number;
}

export default function DailyActivityInput() {
  const [salespersons, setSalespersons] = useState<Salesperson[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<DailyActivity>({
    date: new Date().toISOString().split('T')[0],
    salesperson_id: '',
    approaches: 0,
    appointments: 0,
    meetings: 0,
    trials: 0,
    contracts: 0
  });

  useEffect(() => {
    fetchSalespersons();
  }, []);

  const fetchSalespersons = async () => {
    try {
      const response = await fetchFromGAS();
      setSalespersons(response.salespersons || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : '予期せぬエラーが発生しました');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.salesperson_id) {
      setError('営業担当者を選択してください');
      return;
    }

    setSubmitting(true);
    try {
      const response = await postToGAS('activities', formData);
      if (!response.success) {
        throw new Error(response.message || '活動記録の追加に失敗しました');
      }
      
      // フォームをリセット（日付は今日の日付を保持）
      setFormData({
        date: new Date().toISOString().split('T')[0],
        salesperson_id: '',
        approaches: 0,
        appointments: 0,
        meetings: 0,
        trials: 0,
        contracts: 0
      });
      setError(null);
    } catch (error) {
      console.error('Error adding activity:', error);
      setError(error instanceof Error ? error.message : '活動記録の追加に失敗しました');
    } finally {
      setSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof DailyActivity, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="flex justify-center py-6">
          <Loader2 className="h-6 w-6 animate-spin" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>日次営業活動入力</CardTitle>
      </CardHeader>
      <CardContent>
        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">日付</label>
              <Input
                type="date"
                value={formData.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">営業担当者</label>
              <Select
                value={formData.salesperson_id}
                onValueChange={(value) => handleInputChange('salesperson_id', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="選択してください" />
                </SelectTrigger>
                <SelectContent>
                  {salespersons.map((person) => (
                    <SelectItem key={person.id} value={person.id}>
                      {person.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">アプローチ数</label>
              <Input
                type="number"
                min="0"
                value={formData.approaches}
                onChange={(e) => handleInputChange('approaches', parseInt(e.target.value) || 0)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">アポイントメント数</label>
              <Input
                type="number"
                min="0"
                value={formData.appointments}
                onChange={(e) => handleInputChange('appointments', parseInt(e.target.value) || 0)}
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">商談数</label>
              <Input
                type="number"
                min="0"
                value={formData.meetings}
                onChange={(e) => handleInputChange('meetings', parseInt(e.target.value) || 0)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">トライアル成約数</label>
              <Input
                type="number"
                min="0"
                value={formData.trials}
                onChange={(e) => handleInputChange('trials', parseInt(e.target.value) || 0)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">契約数</label>
              <Input
                type="number"
                min="0"
                value={formData.contracts}
                onChange={(e) => handleInputChange('contracts', parseInt(e.target.value) || 0)}
              />
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={submitting}>
            {submitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                保存中...
              </>
            ) : (
              '保存する'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
} 