'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ChartData {
  name: string;
  取得率: number;
  商談化率: number;
  成約率: number;
}

interface KPIs {
  今月アプローチ数: number;
  今月アポ数: number;
  今月商談数: number;
  今月トライアル数: number;
  今月契約数: number;
  今月アポ取得率: string;
  今月商談化率: string;
  今月成約率: string;
}

interface SalesPerson {
  id: number;
  name: string;
  アプローチ数: number;
  アポ数: number;
  商談数: number;
  契約数: number;
}

const Dashboard = () => {
  // ダミーデータ - 実際にはGoogleスプレッドシートから取得
  const [weeklyData, setWeeklyData] = useState([
    { name: '週1', 取得率: 28, 商談化率: 65, 成約率: 22 },
    { name: '週2', 取得率: 32, 商談化率: 58, 成約率: 25 },
    { name: '週3', 取得率: 35, 商談化率: 62, 成約率: 30 },
    { name: '週4', 取得率: 40, 商談化率: 70, 成約率: 35 }
  ]);

  const [monthlyData, setMonthlyData] = useState([
    { name: '1月', 取得率: 30, 商談化率: 60, 成約率: 25 },
    { name: '2月', 取得率: 32, 商談化率: 62, 成約率: 28 },
    { name: '3月', 取得率: 35, 商談化率: 65, 成約率: 30 }
  ]);

  const [kpis, setKpis] = useState({
    今月アプローチ数: 320,
    今月アポ数: 96,
    今月商談数: 64,
    今月トライアル数: 28,
    今月契約数: 18,
    今月アポ取得率: '30.0%',
    今月商談化率: '66.7%',
    今月成約率: '28.1%'
  });

  const [salesPersons, setSalesPersons] = useState([
    { id: 1, name: '鈴木', アプローチ数: 120, アポ数: 38, 商談数: 25, 契約数: 8 },
    { id: 2, name: '田中', アプローチ数: 105, アポ数: 30, 商談数: 20, 契約数: 6 },
    { id: 3, name: '佐藤', アプローチ数: 95, アポ数: 28, 商談数: 19, 契約数: 4 }
  ]);

  return (
    <div className="p-6 max-w-6xl mx-auto bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">営業活動ダッシュボード</h1>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-500">今月アプローチ数</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{kpis.今月アプローチ数}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-500">今月アポ数</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{kpis.今月アポ数}</p>
            <p className="text-xs text-blue-600">取得率: {kpis.今月アポ取得率}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-500">今月商談数</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{kpis.今月商談数}</p>
            <p className="text-xs text-blue-600">商談化率: {kpis.今月商談化率}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-500">今月契約数</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{kpis.今月契約数}</p>
            <p className="text-xs text-blue-600">成約率: {kpis.今月成約率}</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="weekly">
        <TabsList className="mb-4">
          <TabsTrigger value="weekly">週次データ</TabsTrigger>
          <TabsTrigger value="monthly">月次データ</TabsTrigger>
        </TabsList>

        <TabsContent value="weekly">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>週次推移</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="取得率" stroke="#8884d8" />
                    <Line type="monotone" dataKey="商談化率" stroke="#82ca9d" />
                    <Line type="monotone" dataKey="成約率" stroke="#ffc658" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monthly">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>月次推移</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="取得率" fill="#8884d8" />
                    <Bar dataKey="商談化率" fill="#82ca9d" />
                    <Bar dataKey="成約率" fill="#ffc658" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>営業担当者別パフォーマンス</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">担当者</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">アプローチ数</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">アポ数</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">商談数</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">契約数</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">アポ取得率</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">商談化率</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">成約率</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {salesPersons.map((person) => (
                  <tr key={person.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{person.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{person.アプローチ数}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{person.アポ数}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{person.商談数}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{person.契約数}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{((person.アポ数 / person.アプローチ数) * 100).toFixed(1)}%</td>
                    <td className="px-6 py-4 whitespace-nowrap">{((person.商談数 / person.アポ数) * 100).toFixed(1)}%</td>
                    <td className="px-6 py-4 whitespace-nowrap">{((person.契約数 / person.商談数) * 100).toFixed(1)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard; 