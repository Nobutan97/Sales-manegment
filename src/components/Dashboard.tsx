'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, Pencil, Trash2, X, Check } from 'lucide-react';
import { format, startOfMonth, endOfMonth } from 'date-fns';
import { ja } from 'date-fns/locale';
import { fetchFromGAS, postToGAS } from '@/lib/gas-client';
import type { DailyActivity, Salesperson } from '@/lib/gas-client';
import { useToast } from '@/components/ui/use-toast';

interface DashboardData {
  totalApproaches: number;
  totalProspects: number;
  totalMeetings: number;
  totalContracts: number;
  prospectRate: number;
  meetingRate: number;
  contractRate: number;
}

interface ActivityWithSalesperson extends DailyActivity {
  salesperson?: Salesperson;
}

export default function Dashboard() {
  const { toast } = useToast();
  const [activities, setActivities] = useState<ActivityWithSalesperson[]>([]);
  const [salespersons, setSalespersons] = useState<Salesperson[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<string>(
    format(new Date(), 'yyyy-MM')
  );
  const [editingActivity, setEditingActivity] = useState<ActivityWithSalesperson | null>(null);

  const fetchData = async () => {
    try {
      const response = await fetchFromGAS();
      if (response.success && response.data) {
        const { activities, salespersons } = response.data;
        const activitiesWithSalesperson = activities.map(activity => {
          const salesperson = salespersons.find(
            s => s.id === activity.salesperson_id
          );
          return {
            ...activity,
            salesperson
          };
        });
        setActivities(activitiesWithSalesperson);
        setSalespersons(salespersons);
      } else {
        throw new Error('データの取得に失敗しました');
      }
    } catch (error) {
      toast({
        title: 'エラー',
        description: error instanceof Error ? error.message : 'データの取得に失敗しました',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const calculateMetrics = (): DashboardData => {
    const totalApproaches = activities.reduce((sum, activity) => sum + activity.approaches, 0);
    const totalProspects = activities.reduce((sum, activity) => sum + activity.appointments, 0);
    const totalMeetings = activities.reduce((sum, activity) => sum + activity.meetings, 0);
    const totalContracts = activities.reduce((sum, activity) => sum + activity.contracts, 0);

    return {
      totalApproaches,
      totalProspects,
      totalMeetings,
      totalContracts,
      prospectRate: totalApproaches ? (totalProspects / totalApproaches) * 100 : 0,
      meetingRate: totalProspects ? (totalMeetings / totalProspects) * 100 : 0,
      contractRate: totalMeetings ? (totalContracts / totalMeetings) * 100 : 0,
    };
  };

  const handleEdit = async (activity: DailyActivity) => {
    try {
      const response = await postToGAS('updateActivity', activity);
      if (!response.success) {
        throw new Error(response.message || '活動データの更新に失敗しました');
      }
      await fetchData();
    } catch (error) {
      toast({
        title: 'エラー',
        description: error instanceof Error ? error.message : '活動データの更新に失敗しました',
        variant: 'destructive',
      });
    }
  };

  const handleCancelEdit = () => {
    setEditingActivity(null);
  };

  const handleSaveEdit = async () => {
    if (!editingActivity) return;

    try {
      const response = await postToGAS('updateActivity', editingActivity);
      if (!response.success) {
        throw new Error(response.message || '活動データの更新に失敗しました');
      }
      await fetchData();
      setEditingActivity(null);
    } catch (error) {
      setError(error instanceof Error ? error.message : '予期せぬエラーが発生しました');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('このデータを削除してもよろしいですか？')) return;

    try {
      const response = await postToGAS('deleteActivity', { id });
      if (!response.success) {
        throw new Error(response.message || '活動データの削除に失敗しました');
      }
      await fetchData();
    } catch (error) {
      toast({
        title: 'エラー',
        description: error instanceof Error ? error.message : '活動データの削除に失敗しました',
        variant: 'destructive',
      });
    }
  };

  const handleEditInputChange = (field: keyof ActivityWithSalesperson, value: string) => {
    if (!editingActivity) return;
    setEditingActivity({
      ...editingActivity,
      [field]: parseInt(value) || 0,
    });
  };

  const metrics = calculateMetrics();

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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">営業活動ダッシュボード</h2>
        <input
          type="month"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="px-3 py-2 border rounded-md"
        />
      </div>

      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-md">
          {error}
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">アプローチ数</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalApproaches}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">アポイント数</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalProspects}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">商談数</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalMeetings}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">契約数</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalContracts}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>活動データ一覧</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="px-4 py-2 text-left">日付</th>
                  <th className="px-4 py-2 text-left">担当者</th>
                  <th className="px-4 py-2 text-right">アプローチ</th>
                  <th className="px-4 py-2 text-right">アポ</th>
                  <th className="px-4 py-2 text-right">商談</th>
                  <th className="px-4 py-2 text-right">契約</th>
                  <th className="px-4 py-2 text-center">操作</th>
                </tr>
              </thead>
              <tbody>
                {activities.map((activity) => (
                  <tr key={activity.id} className="border-b">
                    <td className="px-4 py-2">
                      {format(new Date(activity.date), 'M/d (E)', { locale: ja })}
                    </td>
                    <td className="px-4 py-2">{activity.salesperson?.name || '不明'}</td>
                    {editingActivity?.id === activity.id ? (
                      <>
                        <td className="px-4 py-2">
                          <Input
                            type="number"
                            min="0"
                            value={editingActivity.approaches}
                            onChange={(e) => handleEditInputChange('approaches', e.target.value)}
                            className="w-20"
                          />
                        </td>
                        <td className="px-4 py-2">
                          <Input
                            type="number"
                            min="0"
                            value={editingActivity.appointments}
                            onChange={(e) => handleEditInputChange('appointments', e.target.value)}
                            className="w-20"
                          />
                        </td>
                        <td className="px-4 py-2">
                          <Input
                            type="number"
                            min="0"
                            value={editingActivity.meetings}
                            onChange={(e) => handleEditInputChange('meetings', e.target.value)}
                            className="w-20"
                          />
                        </td>
                        <td className="px-4 py-2">
                          <Input
                            type="number"
                            min="0"
                            value={editingActivity.contracts}
                            onChange={(e) => handleEditInputChange('contracts', e.target.value)}
                            className="w-20"
                          />
                        </td>
                        <td className="px-4 py-2 text-center">
                          <div className="flex justify-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={handleSaveEdit}
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={handleCancelEdit}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="px-4 py-2 text-right">{activity.approaches}</td>
                        <td className="px-4 py-2 text-right">{activity.appointments}</td>
                        <td className="px-4 py-2 text-right">{activity.meetings}</td>
                        <td className="px-4 py-2 text-right">{activity.contracts}</td>
                        <td className="px-4 py-2 text-center">
                          <div className="flex justify-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setEditingActivity(activity)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(activity.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 