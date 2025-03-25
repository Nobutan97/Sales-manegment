'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface FormData {
  date: string;
  salesPerson: string;
  approaches: number;
  appointments: number;
  meetings: number;
  trials: number;
  contracts: number;
}

const DailyInputForm = () => {
  const [formData, setFormData] = useState<FormData>({
    date: new Date().toISOString().split('T')[0],
    salesPerson: '',
    approaches: 0,
    appointments: 0,
    meetings: 0,
    trials: 0,
    contracts: 0
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'date' ? value : parseInt(value) || 0
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('送信データ:', formData);
    // ここにGoogleスプレッドシートへの送信ロジックを実装
    alert('活動データを保存しました！');
    
    // 数値フィールドをリセット
    setFormData({
      ...formData,
      approaches: 0,
      appointments: 0,
      meetings: 0,
      trials: 0,
      contracts: 0
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader className="bg-blue-600 text-white">
          <CardTitle className="text-xl font-bold text-center">日次営業活動入力</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">日付</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">営業担当者</label>
                  <select
                    name="salesPerson"
                    value={formData.salesPerson}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                  >
                    <option value="">選択してください</option>
                    <option value="1">鈴木</option>
                    <option value="2">田中</option>
                    <option value="3">佐藤</option>
                  </select>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium mb-1">アプローチ数</label>
                  <input
                    type="number"
                    name="approaches"
                    min="0"
                    value={formData.approaches}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">アポイントメント数</label>
                  <input
                    type="number"
                    name="appointments"
                    min="0"
                    value={formData.appointments}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">商談数</label>
                  <input
                    type="number"
                    name="meetings"
                    min="0"
                    value={formData.meetings}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">トライアル成約数</label>
                  <input
                    type="number"
                    name="trials"
                    min="0"
                    value={formData.trials}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">契約数</label>
                  <input
                    type="number"
                    name="contracts"
                    min="0"
                    value={formData.contracts}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                保存する
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default DailyInputForm; 