'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { fetchFromGAS } from '@/lib/gas-client';
import type { DailyActivity, Prospect } from '@/lib/gas-client';

interface PersonalKPI {
  salesPerson: string;
  期間: string;
  アプローチ数: number;
  アポ数: number;
  商談数: number;
  契約数: number;
  アポ取得率: number;
  商談化率: number;
  成約率: number;
  目標達成率: number;
}

interface TimeSeriesData {
  date: string;
  アプローチ数: number;
  アポ数: number;
  商談数: number;
  契約数: number;
  アポ取得率: number;
  商談化率: number;
  成約率: number;
}

interface Pipeline {
  ステージ: string;
  件数: number;
  案件リスト: {
    会社名: string;
    担当者名: string;
    次回アクション: string;
    次回アクション日: string;
    商談金額: number;
  }[];
}

interface ActivityAnalysis {
  時間帯: string;
  アプローチ成功率: number;
  アポ取得率: number;
  商談件数: number;
}

const PersonalDashboard = ({ salespersonId }: { salespersonId: string }) => {
  const [selectedPerson, setSelectedPerson] = useState('1');
  const [kpiData, setKpiData] = useState<PersonalKPI | null>(null);
  const [timeSeriesData, setTimeSeriesData] = useState<TimeSeriesData[]>([]);
  const [pipelineData, setPipelineData] = useState<Pipeline[]>([]);
  const [activityData, setActivityData] = useState<ActivityAnalysis[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchFromGAS();
        if (!response.success) {
          throw new Error(response.message || 'データの取得に失敗しました');
        }
        
        const activities = response.data?.activities || [];
        const prospects = response.data?.prospects || [];
        
        // KPIデータの計算
        const currentMonth = new Date().getMonth() + 1;
        const currentYear = new Date().getFullYear();
        const monthData = activities.filter((data) => {
          const [year, month] = data.date.split('-').map(Number);
          return year === currentYear && month === currentMonth;
        });

        const totalData = monthData.reduce((acc: { アプローチ数: number; アポ数: number; 商談数: number; 契約数: number }, curr) => ({
          アプローチ数: acc.アプローチ数 + curr.approaches,
          アポ数: acc.アポ数 + curr.appointments,
          商談数: acc.商談数 + curr.meetings,
          契約数: acc.契約数 + curr.contracts,
        }), { アプローチ数: 0, アポ数: 0, 商談数: 0, 契約数: 0 });

        const kpi: PersonalKPI = {
          salesPerson: selectedPerson,
          期間: `${currentYear}年${currentMonth}月`,
          ...totalData,
          アポ取得率: (totalData.アポ数 / totalData.アプローチ数) * 100,
          商談化率: (totalData.商談数 / totalData.アポ数) * 100,
          成約率: (totalData.契約数 / totalData.商談数) * 100,
          目標達成率: 0, // 目標値の設定が必要
        };

        setKpiData(kpi);

        // 時系列データの設定
        const timeData = activities.map((data) => ({
          date: data.date,
          アプローチ数: data.approaches,
          アポ数: data.appointments,
          商談数: data.meetings,
          契約数: data.contracts,
          アポ取得率: (data.appointments / data.approaches) * 100,
          商談化率: (data.meetings / data.appointments) * 100,
          成約率: (data.contracts / data.meetings) * 100,
        }));

        setTimeSeriesData(timeData);

        // パイプラインデータの設定
        const pipeline = prospects.filter((p) => p.salesperson_id === salespersonId).reduce((acc: Pipeline[], prospect) => {
          const stage = prospect.status;
          const existingStage = acc.find((s: Pipeline) => s.ステージ === stage);
          
          if (existingStage) {
            existingStage.件数++;
            existingStage.案件リスト.push({
              会社名: prospect.company,
              担当者名: prospect.contact,
              次回アクション: prospect.notes,
              次回アクション日: prospect.updated_at,
              商談金額: 0, // この値は現在のAPIでは提供されていません
            });
          } else {
            acc.push({
              ステージ: stage,
              件数: 1,
              案件リスト: [{
                会社名: prospect.company,
                担当者名: prospect.contact,
                次回アクション: prospect.notes,
                次回アクション日: prospect.updated_at,
                商談金額: 0, // この値は現在のAPIでは提供されていません
              }],
            });
          }
          return acc;
        }, []);

        setPipelineData(pipeline);

        // 活動分析データの設定（仮の実装）
        const activity = [
          { 時間帯: '9-11時', アプローチ成功率: 35, アポ取得率: 25, 商談件数: 2 },
          { 時間帯: '11-13時', アプローチ成功率: 28, アポ取得率: 20, 商談件数: 1 },
          { 時間帯: '13-15時', アプローチ成功率: 42, アポ取得率: 32, 商談件数: 3 },
          { 時間帯: '15-17時', アプローチ成功率: 38, アポ取得率: 28, 商談件数: 2 },
          { 時間帯: '17-19時', アプローチ成功率: 30, アポ取得率: 22, 商談件数: 1 },
        ];

        setActivityData(activity);
      } catch (error) {
        setError(error instanceof Error ? error.message : '予期せぬエラーが発生しました');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [salespersonId]);

  if (loading) {
    return <div>データを読み込み中...</div>;
  }

  if (!kpiData) {
    return <div>データが見つかりません</div>;
  }

  return (
    <div className="space-y-6">
      {/* 担当者選択 */}
      <div className="w-full">
        <select
          value={selectedPerson}
          onChange={(e) => setSelectedPerson(e.target.value)}
          className="w-full max-w-xs p-2 border rounded-md"
        >
          <option value="1">鈴木</option>
          <option value="2">田中</option>
          <option value="3">佐藤</option>
        </select>
      </div>

      {/* KPIサマリー */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-500">アプローチ数</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpiData.アプローチ数}</div>
            <div className="text-sm text-gray-500">目標達成率: {kpiData.目標達成率}%</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-500">アポイント数</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpiData.アポ数}</div>
            <div className="text-sm text-gray-500">取得率: {kpiData.アポ取得率}%</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-500">商談数</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpiData.商談数}</div>
            <div className="text-sm text-gray-500">商談化率: {kpiData.商談化率}%</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-500">契約数</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpiData.契約数}</div>
            <div className="text-sm text-gray-500">成約率: {kpiData.成約率}%</div>
          </CardContent>
        </Card>
      </div>

      {/* パフォーマンスグラフ */}
      <Card>
        <CardHeader>
          <CardTitle>活動推移</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="daily" className="w-full">
            <TabsList>
              <TabsTrigger value="daily">日次</TabsTrigger>
              <TabsTrigger value="weekly">週次</TabsTrigger>
              <TabsTrigger value="monthly">月次</TabsTrigger>
            </TabsList>
            <TabsContent value="daily">
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={timeSeriesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="アプローチ数" stroke="#8884d8" />
                    <Line type="monotone" dataKey="アポ数" stroke="#82ca9d" />
                    <Line type="monotone" dataKey="商談数" stroke="#ffc658" />
                    <Line type="monotone" dataKey="契約数" stroke="#ff7300" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
            {/* 週次・月次のタブコンテンツも同様に実装 */}
          </Tabs>
        </CardContent>
      </Card>

      {/* 転換率グラフ */}
      <Card>
        <CardHeader>
          <CardTitle>転換率推移</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={timeSeriesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="アポ取得率" stroke="#8884d8" />
                <Line type="monotone" dataKey="商談化率" stroke="#82ca9d" />
                <Line type="monotone" dataKey="成約率" stroke="#ffc658" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* 案件パイプライン */}
      <Card>
        <CardHeader>
          <CardTitle>案件パイプライン</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {pipelineData.map((stage, index) => (
              <Card key={index} className="bg-gray-50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stage.ステージ}
                    <span className="ml-2 text-blue-600">{stage.件数}件</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {stage.案件リスト.map((案件, idx) => (
                      <div key={idx} className="bg-white p-3 rounded-lg shadow-sm">
                        <div className="font-medium">{案件.会社名}</div>
                        <div className="text-sm text-gray-600">{案件.担当者名}</div>
                        <div className="text-sm text-gray-600">
                          次回: {案件.次回アクション}（{案件.次回アクション日}）
                        </div>
                        <div className="text-sm font-medium text-blue-600">
                          ¥{案件.商談金額.toLocaleString()}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 活動分析 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 時間帯別分析 */}
        <Card>
          <CardHeader>
            <CardTitle>時間帯別活動効率</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={activityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="時間帯" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="アプローチ成功率" fill="#8884d8" />
                  <Bar dataKey="アポ取得率" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* 本日のアクション */}
        <Card>
          <CardHeader>
            <CardTitle>本日のアクション</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pipelineData.flatMap(stage => 
                stage.案件リスト.filter(案件 => 
                  案件.次回アクション日 === new Date().toISOString().split('T')[0]
                ).map((案件, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium">{案件.会社名}</div>
                      <div className="text-sm text-gray-600">{案件.次回アクション}</div>
                    </div>
                    <div className="text-sm text-blue-600">{案件.次回アクション日}</div>
                  </div>
                ))
              )}
              {pipelineData.every(stage => 
                stage.案件リスト.every(案件 => 
                  案件.次回アクション日 !== new Date().toISOString().split('T')[0]
                )
              ) && (
                <div className="text-gray-500 text-center py-4">
                  本日のアクション予定はありません
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PersonalDashboard; 