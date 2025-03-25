// 日次活動データの型定義
export interface DailyActivity {
  id: string;
  date: string;
  salespersonId: string;
  approaches: number;
  appointments: number;
  meetings: number;
  trials: number;
  contracts: number;
  createdAt: string;
  updatedAt: string;
}

// 案件データの型定義
export interface Prospect {
  id: string;
  companyName: string;
  contactName: string;
  contactInfo: string;
  status: 'アプローチ済' | 'アポ予定' | '商談実施' | 'トライアル中' | '契約済';
  nextActionDate: string;
  notes: string;
  salespersonId: string;
  createdAt: string;
  updatedAt: string;
}

// 営業担当者データの型定義
export interface Salesperson {
  id: string;
  name: string;
  email: string;
  department: string;
  createdAt: string;
  updatedAt: string;
}

// APIレスポンスの型定義
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
} 