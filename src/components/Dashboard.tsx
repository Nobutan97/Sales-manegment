'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, Pencil, Trash2, X, Check } from 'lucide-react';
import { format, startOfMonth, endOfMonth } from 'date-fns';
import { ja } from 'date-fns/locale';
import { fetchFromGAS, postToGAS } from '@/lib/gas-client';

interface Activity {
  id: string;
  date: string;
  approaches: number;
  prospects: number;
  meetings: number;
  contracts: number;
  salesperson: {
    id: string;
    name: string;
  };
}

interface DashboardData {
  totalApproaches: number;
  totalProspects: number;
  totalMeetings: number;
  totalContracts: number;
  prospectRate: number;
  meetingRate: number;
  contractRate: number;
}

interface EditingActivity {
  id: string;
  approaches: number;
  prospects: number;
  meetings: number;
  contracts: number;
}

export default function Dashboard() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<string>(
    format(new Date(), 'yyyy-MM')
  );
  const [editingActivity, setEditingActivity] = useState<EditingActivity | null>(null);

  const fetchActivities = async (start: string, end: string) => {
    try {
      const response = await fetchFromGAS();
      if (!response.success) {
        throw new Error(response.message || 'データの取得に失敗しました');
      }
      const activities = response.data?.activities || [];
      setActivities(activities);
      setError(null);
    } catch (error) {
      setError(error instanceof Error ? error.message : '予期せぬエラーが発生しました');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities(format(startOfMonth(new Date(selectedMonth)), 'yyyy-MM-dd'), format(endOfMonth(new Date(selectedMonth)), 'yyyy-MM-dd'));
  }, [selectedMonth]);

  const calculateMetrics = (): DashboardData => {
    const totalApproaches = activities.reduce((sum, act) => sum + act.approaches, 0);
    const totalProspects = activities.reduce((sum, act) => sum + act.prospects, 0);
    const totalMeetings = activities.reduce((sum, act) => sum + act.meetings, 0);
    const totalContracts = activities.reduce((sum, act) => sum + act.contracts, 0);

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

  const handleEdit = async (activity: Activity) => {
    try {
      const response = await postToGAS('activities/update', activity);
      if (!response.success) {
        throw new Error(response.message || '活動データの更新に失敗しました');
      }
      await fetchActivities(format(startOfMonth(new Date(selectedMonth)), 'yyyy-MM-dd'), format(endOfMonth(new Date(selectedMonth)), 'yyyy-MM-dd'));
    } catch (error) {
      setError(error instanceof Error ? error.message : '予期せぬエラーが発生しました');
    }
  };

  const handleCancelEdit = () => {
    setEditingActivity(null);
  };

  const handleSaveEdit = async () => {
    if (!editingActivity) return;

    try {
      const response = await postToGAS('activities/update', editingActivity);
      if (!response.success) {
        throw new Error(response.message || '活動データの更新に失敗しました');
      }
      await fetchActivities(format(startOfMonth(new Date(selectedMonth)), 'yyyy-MM-dd'), format(endOfMonth(new Date(selectedMonth)), 'yyyy-MM-dd'));
      setEditingActivity(null);
    } catch (error) {
      setError(error instanceof Error ? error.message : '予期せぬエラーが発生しました');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('このデータを削除してもよろしいですか？')) return;

    try {
      const response = await postToGAS('activities/delete', { id });
      if (!response.success) {
        throw new Error(response.message || '活動データの削除に失敗しました');
      }
      await fetchActivities(format(startOfMonth(new Date(selectedMonth)), 'yyyy-MM-dd'), format(endOfMonth(new Date(selectedMonth)), 'yyyy-MM-dd'));
    } catch (error) {
      setError(error instanceof Error ? error.message : '予期せぬエラーが発生しました');
    }
  };

  const handleEditInputChange = (field: keyof EditingActivity, value: string) => {
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
        <CardContent className="flex items-center justify-center p-6">
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>今月のアプローチ数</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{metrics.totalApproaches}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>今月のアポ数</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{metrics.totalProspects}</div>
            <div className="text-sm text-gray-500">
              取得率: {metrics.prospectRate.toFixed(1)}%
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>今月の商談数</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{metrics.totalMeetings}</div>
            <div className="text-sm text-gray-500">
              商談化率: {metrics.meetingRate.toFixed(1)}%
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>今月の契約数</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{metrics.totalContracts}</div>
            <div className="text-sm text-gray-500">
              成約率: {metrics.contractRate.toFixed(1)}%
            </div>
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
                    <td className="px-4 py-2">{activity.salesperson.name}</td>
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
                            value={editingActivity.prospects}
                            onChange={(e) => handleEditInputChange('prospects', e.target.value)}
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
                        <td className="px-4 py-2 text-right">{activity.prospects}</td>
                        <td className="px-4 py-2 text-right">{activity.meetings}</td>
                        <td className="px-4 py-2 text-right">{activity.contracts}</td>
                        <td className="px-4 py-2 text-center">
                          <div className="flex justify-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEdit(activity)}
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