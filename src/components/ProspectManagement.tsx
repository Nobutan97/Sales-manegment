'use client';

import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface Status {
  id: number;
  name: string;
}

interface Prospect {
  id: number;
  companyName: string;
  contactName: string;
  contactInfo: string;
  status: number;
  nextAction: string;
  notes: string;
}

interface FormData {
  companyName: string;
  contactName: string;
  contactInfo: string;
  status: number;
  nextAction: string;
  notes: string;
}

interface ProspectListProps {
  prospects: Prospect[];
  statuses: Status[];
  onEdit: (prospect: Prospect) => void;
  onStatusChange: (prospectId: number, newStatus: number) => void;
}

const ProspectManagement = () => {
  // ステータスの定義
  const statuses: Status[] = [
    { id: 1, name: 'アプローチ済' },
    { id: 2, name: 'アポ予定' },
    { id: 3, name: '商談実施' },
    { id: 4, name: 'トライアル中' },
    { id: 5, name: '契約済' }
  ];

  // ダミーデータ - 実際にはGoogleスプレッドシートから取得
  const [prospects, setProspects] = useState<Prospect[]>([
    { id: 1, companyName: '株式会社ABC', contactName: '山田太郎', contactInfo: 'yamada@abc.co.jp', status: 2, nextAction: '2025-04-01', notes: '初回アポ設定済み' },
    { id: 2, companyName: '株式会社DEF', contactName: '佐藤次郎', contactInfo: 'sato@def.co.jp', status: 3, nextAction: '2025-04-03', notes: '商談でニーズヒアリング完了' },
    { id: 3, companyName: '株式会社GHI', contactName: '鈴木三郎', contactInfo: 'suzuki@ghi.co.jp', status: 4, nextAction: '2025-04-15', notes: 'トライアル中、使用感フィードバック待ち' },
    { id: 4, companyName: '株式会社JKL', contactName: '高橋四郎', contactInfo: 'takahashi@jkl.co.jp', status: 1, nextAction: '2025-03-28', notes: 'アプローチメール送信済み' },
    { id: 5, companyName: '株式会社MNO', contactName: '田中五郎', contactInfo: 'tanaka@mno.co.jp', status: 5, nextAction: '2025-05-01', notes: '契約済み、導入サポート予定' }
  ]);

  // 新規案件入力用のフォームデータ
  const [formData, setFormData] = useState<FormData>({
    companyName: '',
    contactName: '',
    contactInfo: '',
    status: 1,
    nextAction: '',
    notes: ''
  });

  // 編集中の案件ID
  const [editingId, setEditingId] = useState<number | null>(null);

  // フォーム入力ハンドラ
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'status' ? parseInt(value) : value
    });
  };

  // 案件の追加/更新
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (editingId) {
      // 既存案件の更新
      setProspects(prospects.map(prospect => 
        prospect.id === editingId ? { ...formData, id: editingId } : prospect
      ));
      setEditingId(null);
    } else {
      // 新規案件の追加
      const newId = Math.max(...prospects.map(p => p.id), 0) + 1;
      setProspects([...prospects, { ...formData, id: newId }]);
    }
    
    // フォームリセット
    setFormData({
      companyName: '',
      contactName: '',
      contactInfo: '',
      status: 1,
      nextAction: '',
      notes: ''
    });
  };

  // 案件の編集
  const handleEdit = (prospect: Prospect) => {
    setFormData({
      companyName: prospect.companyName,
      contactName: prospect.contactName,
      contactInfo: prospect.contactInfo,
      status: prospect.status,
      nextAction: prospect.nextAction,
      notes: prospect.notes
    });
    setEditingId(prospect.id);
  };

  // フィルター関数を修正
  const filterProspects = (prospects: Prospect[], statusId: string) => {
    if (statusId === 'all') return prospects;
    return prospects.filter(p => p.status === parseInt(statusId));
  };

  // ステータス変更ハンドラを修正
  const handleStatusChange = (prospectId: number, newStatus: number) => {
    setProspects(prospects.map(prospect => 
      prospect.id === prospectId ? { ...prospect, status: newStatus } : prospect
    ));
  };

  // ステータス名を取得する関数を修正
  const getStatusName = (statusId: number) => {
    const status = statuses.find(s => s.id === statusId);
    return status ? status.name : '不明';
  };

  // ステータスに応じた背景色を取得する関数を修正
  const getStatusColor = (statusId: number) => {
    switch(statusId) {
      case 1: return 'bg-gray-100';
      case 2: return 'bg-blue-100';
      case 3: return 'bg-yellow-100';
      case 4: return 'bg-green-100';
      case 5: return 'bg-purple-100';
      default: return 'bg-gray-100';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="all">全ての案件</TabsTrigger>
          {statuses.map(status => (
            <TabsTrigger key={status.id} value={status.id.toString()}>
              {status.name}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>全ての案件</CardTitle>
            </CardHeader>
            <CardContent>
              <ProspectList 
                prospects={prospects} 
                statuses={statuses} 
                onEdit={handleEdit} 
                onStatusChange={handleStatusChange} 
              />
            </CardContent>
          </Card>
        </TabsContent>

        {statuses.map(status => (
          <TabsContent key={status.id} value={status.id.toString()}>
            <Card>
              <CardHeader>
                <CardTitle>{status.name}の案件</CardTitle>
              </CardHeader>
              <CardContent>
                <ProspectList 
                  prospects={filterProspects(prospects, status.id.toString())} 
                  statuses={statuses} 
                  onEdit={handleEdit} 
                  onStatusChange={handleStatusChange} 
                />
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>{editingId ? '案件を編集' : '新規案件を追加'}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                会社名
              </label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                required
                className="mt-1 block w-full border rounded-md shadow-sm p-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                担当者名
              </label>
              <input
                type="text"
                name="contactName"
                value={formData.contactName}
                onChange={handleChange}
                required
                className="mt-1 block w-full border rounded-md shadow-sm p-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                連絡先
              </label>
              <input
                type="text"
                name="contactInfo"
                value={formData.contactInfo}
                onChange={handleChange}
                required
                className="mt-1 block w-full border rounded-md shadow-sm p-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                ステータス
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="mt-1 block w-full border rounded-md shadow-sm p-2"
              >
                {statuses.map(status => (
                  <option key={status.id} value={status.id}>
                    {status.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                次のアクション
              </label>
              <input
                type="date"
                name="nextAction"
                value={formData.nextAction}
                onChange={handleChange}
                required
                className="mt-1 block w-full border rounded-md shadow-sm p-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                備考
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                className="mt-1 block w-full border rounded-md shadow-sm p-2"
                rows={3}
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                {editingId ? '更新' : '追加'}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingId(null);
                    setFormData({
                      companyName: '',
                      contactName: '',
                      contactInfo: '',
                      status: 1,
                      nextAction: '',
                      notes: ''
                    });
                  }}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  キャンセル
                </button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

// 案件リストコンポーネント
const ProspectList = ({ prospects, statuses, onEdit, onStatusChange }: ProspectListProps) => {
  // ステータス名を取得する関数
  const getStatusName = (statusId: number) => {
    const status = statuses.find(s => s.id === statusId);
    return status ? status.name : '不明';
  };

  // ステータスに応じた背景色を取得
  const getStatusColor = (statusId: number) => {
    switch(statusId) {
      case 1: return 'bg-gray-100';
      case 2: return 'bg-blue-100';
      case 3: return 'bg-yellow-100';
      case 4: return 'bg-green-100';
      case 5: return 'bg-purple-100';
      default: return 'bg-gray-100';
    }
  };

  return (
    <div className="overflow-x-auto">
      {prospects.length === 0 ? (
        <p className="text-center py-4">案件がありません</p>
      ) : (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">企業名</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">担当者</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ステータス</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">次回アクション</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">アクション</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {prospects.map((prospect) => (
              <tr key={prospect.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-900">{prospect.companyName}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>{prospect.contactName}</div>
                  <div className="text-sm text-gray-500">{prospect.contactInfo}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(prospect.status)}`}>
                    {getStatusName(prospect.status)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {prospect.nextAction}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => onEdit(prospect)}
                    className="text-indigo-600 hover:text-indigo-900 mr-2"
                  >
                    編集
                  </button>
                  <select
                    value={prospect.status}
                    onChange={(e) => onStatusChange(prospect.id, parseInt(e.target.value))}
                    className="text-sm border rounded p-1"
                  >
                    {statuses.map(status => (
                      <option key={status.id} value={status.id}>
                        {status.name}に変更
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProspectManagement; 