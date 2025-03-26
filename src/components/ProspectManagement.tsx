'use client';

import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { useRouter, useSearchParams } from 'next/navigation';
import { fetchFromGAS, postToGAS } from '@/lib/gas-client';
import type { Prospect as GASProspect } from '@/lib/gas-client';

interface Status {
  id: number;
  name: string;
}

interface Prospect {
  id: string;
  company: string;
  contact: string;
  email: string;
  status: string;
  notes: string;
  salesperson_id: string;
  created_at: string;
  updated_at: string;
}

interface FormData {
  companyName: string;
  contactName: string;
  contactInfo: string;
  status: number;
  nextAction: string;
  nextActionDate: string;
  notes: string;
}

interface ProspectListProps {
  prospects: Prospect[];
  statuses: Status[];
  onEdit: (prospect: Prospect) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, newStatus: string) => void;
}

const ProspectManagement = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const salespersonId = searchParams ? searchParams.get('salespersonId') : null;

  // ステータスの定義
  const statuses: Status[] = [
    { id: 1, name: 'アプローチ済' },
    { id: 2, name: 'アポ予定' },
    { id: 3, name: '商談実施' },
    { id: 4, name: 'トライアル中' },
    { id: 5, name: '契約済' }
  ];

  const [prospects, setProspects] = useState<Prospect[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 新規案件入力用のフォームデータ
  const [formData, setFormData] = useState<FormData>({
    companyName: '',
    contactName: '',
    contactInfo: '',
    status: 1,
    nextAction: '',
    nextActionDate: '',
    notes: ''
  });

  // 編集中の案件ID
  const [editingId, setEditingId] = useState<string | null>(null);

  // フォーム入力ハンドラ
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'status' ? parseInt(value) : value
    });
  };

  // 案件の追加/更新
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      const body = {
        company: formData.companyName,
        contact: formData.contactName,
        email: formData.contactInfo,
        status: formData.status.toString(),
        notes: formData.notes,
        salesperson_id: salespersonId || undefined
      };

      if (editingId) {
        // 既存案件の更新
        const response = await postToGAS('prospects/update', { id: editingId, ...body });
        if (!response.success) {
          throw new Error(response.message || '案件の更新に失敗しました');
        }
      } else {
        // 新規案件の追加
        const response = await postToGAS('prospects/create', body);
        if (!response.success) {
          throw new Error(response.message || '案件の追加に失敗しました');
        }
      }

      // データを再取得
      fetchProspects();
      
      // フォームリセット
      setFormData({
        companyName: '',
        contactName: '',
        contactInfo: '',
        status: 1,
        nextAction: '',
        nextActionDate: '',
        notes: ''
      });
      setEditingId(null);
    } catch (error) {
      setError(error instanceof Error ? error.message : '予期せぬエラーが発生しました');
    }
  };

  // 案件の編集
  const handleEdit = (prospect: Prospect) => {
    setFormData({
      companyName: prospect.company,
      contactName: prospect.contact,
      contactInfo: prospect.email,
      status: parseInt(prospect.status),
      nextAction: prospect.notes,
      nextActionDate: prospect.updated_at,
      notes: prospect.notes
    });
    setEditingId(prospect.id);
  };

  // 案件の削除
  const handleDelete = async (id: string) => {
    if (!confirm('この案件を削除してもよろしいですか？')) return;

    try {
      const response = await postToGAS('prospects/delete', { id });
      if (!response.success) {
        throw new Error(response.message || '案件の削除に失敗しました');
      }

      // データを再取得
      fetchProspects();
    } catch (error) {
      setError(error instanceof Error ? error.message : '予期せぬエラーが発生しました');
    }
  };

  // 案件データの取得
  const fetchProspects = async () => {
    try {
      const response = await fetchFromGAS();
      if (!response.success || !response.data) {
        throw new Error(response.message || '案件データの取得に失敗しました');
      }
      
      const prospects = response.data.prospects || [];
      setProspects(prospects);
      setError(null);
    } catch (error) {
      setError(error instanceof Error ? error.message : '予期せぬエラーが発生しました');
    } finally {
      setLoading(false);
    }
  };

  // 初回マウント時とsalespersonIdの変更時にデータを取得
  useEffect(() => {
    fetchProspects();
  }, [salespersonId]);

  // フィルター関数
  const filterProspects = (prospects: Prospect[], statusId: string) => {
    if (statusId === 'all') return prospects;
    return prospects.filter(p => p.status === statusId);
  };

  // ステータス変更ハンドラ
  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const prospect = prospects.find(p => p.id === id);
      if (!prospect) return;

      const response = await postToGAS('prospects/update', {
        id,
        status: newStatus,
      });

      if (!response.success) {
        throw new Error(response.message || 'ステータスの更新に失敗しました');
      }

      // データを再取得
      fetchProspects();
    } catch (error) {
      setError(error instanceof Error ? error.message : '予期せぬエラーが発生しました');
    }
  };

  if (loading) {
    return <div className="text-center py-4">読み込み中...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {error && (
        <Alert className="mb-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

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
                onDelete={handleDelete}
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
                  onDelete={handleDelete}
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
                type="text"
                name="nextAction"
                value={formData.nextAction}
                onChange={handleChange}
                required
                className="mt-1 block w-full border rounded-md shadow-sm p-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                次回アクション日
              </label>
              <input
                type="date"
                name="nextActionDate"
                value={formData.nextActionDate}
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
              <Button type="submit" variant="default">
                {editingId ? '更新' : '追加'}
              </Button>
              {editingId && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setEditingId(null);
                    setFormData({
                      companyName: '',
                      contactName: '',
                      contactInfo: '',
                      status: 1,
                      nextAction: '',
                      nextActionDate: '',
                      notes: ''
                    });
                  }}
                >
                  キャンセル
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

// 案件リストコンポーネント
const ProspectList: React.FC<ProspectListProps> = ({ prospects, statuses, onEdit, onDelete, onStatusChange }) => {
  // ステータス名を取得する関数
  const getStatusName = (statusId: string) => {
    const status = statuses.find(s => s.id.toString() === statusId);
    return status ? status.name : '不明';
  };

  // ステータスに応じた背景色を取得
  const getStatusColor = (statusId: string) => {
    switch(statusId) {
      case '1': return 'bg-gray-100';
      case '2': return 'bg-blue-100';
      case '3': return 'bg-yellow-100';
      case '4': return 'bg-green-100';
      case '5': return 'bg-purple-100';
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
                  <div className="font-medium text-gray-900">{prospect.company}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>{prospect.contact}</div>
                  <div className="text-sm text-gray-500">{prospect.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(prospect.status)}`}>
                    {getStatusName(prospect.status)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div>{prospect.notes}</div>
                  <div className="text-xs text-gray-400">{prospect.updated_at}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Button
                    onClick={() => onEdit(prospect)}
                    variant="ghost"
                    className="mr-2"
                  >
                    編集
                  </Button>
                  <Button
                    onClick={() => onDelete(prospect.id)}
                    variant="ghost"
                    className="text-red-600 hover:text-red-900"
                  >
                    削除
                  </Button>
                  <select
                    value={prospect.status}
                    onChange={(e) => onStatusChange(prospect.id, e.target.value)}
                    className="ml-2 text-sm border rounded p-1"
                  >
                    {statuses.map(status => (
                      <option key={status.id} value={status.id.toString()}>
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