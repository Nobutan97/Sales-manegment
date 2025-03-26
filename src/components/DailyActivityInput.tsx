'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2 } from 'lucide-react';
import { fetchFromGAS, postToGAS } from '@/lib/gas-client';
import { useToast } from '@/components/ui/use-toast';

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
  const { toast } = useToast();
  const [salespersons, setSalespersons] = useState<Salesperson[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setSubmitting] = useState(false);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await postToGAS('addActivity', {
        date: formData.date,
        salesperson_id: formData.salesperson_id,
        approaches: formData.approaches,
        appointments: formData.appointments,
        meetings: formData.meetings,
        trials: formData.trials,
        contracts: formData.contracts
      });
      
      if (response.success) {
        toast({
          title: '成功',
          description: '活動記録を保存しました',
        });
        
        // 数値フィールドをリセット
        setFormData(prev => ({
          ...prev,
          approaches: 0,
          appointments: 0,
          meetings: 0,
          trials: 0,
          contracts: 0
        }));
      }
    } catch (error) {
      toast({
        title: 'エラー',
        description: error instanceof Error ? error.message : '活動記録の保存に失敗しました',
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'date' ? value : Number(value)
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
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">営業担当者</label>
              <Select
                value={formData.salesperson_id}
                onValueChange={(value) => setFormData(prev => ({ ...prev, salesperson_id: value }))}
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
                id="approaches"
                name="approaches"
                value={formData.approaches}
                onChange={handleChange}
                min="0"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">アポイントメント数</label>
              <Input
                type="number"
                id="appointments"
                name="appointments"
                value={formData.appointments}
                onChange={handleChange}
                min="0"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">商談数</label>
              <Input
                type="number"
                id="meetings"
                name="meetings"
                value={formData.meetings}
                onChange={handleChange}
                min="0"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">トライアル成約数</label>
              <Input
                type="number"
                id="trials"
                name="trials"
                value={formData.trials}
                onChange={handleChange}
                min="0"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">契約数</label>
              <Input
                type="number"
                id="contracts"
                name="contracts"
                value={formData.contracts}
                onChange={handleChange}
                min="0"
              />
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
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