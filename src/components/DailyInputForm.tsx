'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2 } from 'lucide-react';
import { postToGAS } from '@/lib/gas-client';
import { useToast } from '@/components/ui/use-toast';

interface FormData {
  date: string;
  salesperson_id: string;
  approaches: number;
  appointments: number;
  meetings: number;
  trials: number;
  contracts: number;
}

const DailyInputForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    date: new Date().toISOString().split('T')[0],
    salesperson_id: '',
    approaches: 0,
    appointments: 0,
    meetings: 0,
    trials: 0,
    contracts: 0
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'date' ? value : Number(value)
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

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
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="bg-blue-600 text-white">
        <CardTitle className="text-xl font-bold text-center">日次営業活動入力</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {success && (
          <Alert className="mb-4">
            <AlertDescription>データを保存しました！</AlertDescription>
          </Alert>
        )}
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="date" className="block text-sm font-medium">
                  日付
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="salesperson_id" className="block text-sm font-medium">
                  営業担当者ID
                </label>
                <input
                  type="text"
                  id="salesperson_id"
                  name="salesperson_id"
                  value={formData.salesperson_id}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="approaches" className="block text-sm font-medium">
                  アプローチ数
                </label>
                <input
                  type="number"
                  id="approaches"
                  name="approaches"
                  value={formData.approaches}
                  onChange={handleChange}
                  min="0"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label htmlFor="appointments" className="block text-sm font-medium">
                  アポイント数
                </label>
                <input
                  type="number"
                  id="appointments"
                  name="appointments"
                  value={formData.appointments}
                  onChange={handleChange}
                  min="0"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label htmlFor="meetings" className="block text-sm font-medium">
                  商談数
                </label>
                <input
                  type="number"
                  id="meetings"
                  name="meetings"
                  value={formData.meetings}
                  onChange={handleChange}
                  min="0"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label htmlFor="trials" className="block text-sm font-medium">
                  トライアル数
                </label>
                <input
                  type="number"
                  id="trials"
                  name="trials"
                  value={formData.trials}
                  onChange={handleChange}
                  min="0"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label htmlFor="contracts" className="block text-sm font-medium">
                  契約数
                </label>
                <input
                  type="number"
                  id="contracts"
                  name="contracts"
                  value={formData.contracts}
                  onChange={handleChange}
                  min="0"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    保存中...
                  </div>
                ) : (
                  '保存する'
                )}
              </button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default DailyInputForm; 