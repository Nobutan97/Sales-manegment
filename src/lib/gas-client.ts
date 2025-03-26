// 型定義
export interface GASResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
}

export interface Salesperson {
  id: string;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
}

export interface Prospect {
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

export interface DailyActivity {
  id: string;
  date: string;
  salesperson_id: string;
  approaches: number;
  appointments: number;
  meetings: number;
  trials: number;
  contracts: number;
  created_at: string;
  updated_at: string;
}

export interface SheetData {
  salespersons: Salesperson[];
  prospects: Prospect[];
  activities: DailyActivity[];
}

export type GASAction = 
  | 'addSalesperson'
  | 'addProspect'
  | 'addActivity'
  | 'updateActivity'
  | 'deleteActivity';

const GAS_URL = process.env.NEXT_PUBLIC_GAS_URL;

export interface GASResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface SalespersonResponse {
  salespersons: Salesperson[];
}

export const fetchFromGAS = async (): Promise<GASResponse<SalespersonResponse>> => {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_GAS_URL || '', {
      method: 'GET',
      mode: 'cors',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching from GAS:', error);
    throw error;
  }
};

export async function postToGAS<T = any>(
  action: GASAction,
  data: any
): Promise<GASResponse<T>> {
  try {
    if (!GAS_URL) {
      throw new Error('GAS_URLが設定されていません');
    }

    console.log('Posting to GAS:', { action, data });

    const response = await fetch(GAS_URL, {
      method: 'POST',
      mode: 'cors',
      credentials: 'omit',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ action, data }),
      cache: 'no-store',
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('GAS response error:', {
        status: response.status,
        statusText: response.statusText,
        errorText,
        headers: Object.fromEntries(response.headers.entries()),
      });
      throw new Error(`データの送信に失敗しました (${response.status}: ${response.statusText})`);
    }

    const result = await response.json();
    console.log('GAS response:', result);

    if (!result.success) {
      throw new Error(result.message || 'データの送信に失敗しました');
    }
    return result;
  } catch (error) {
    console.error('Error posting to GAS:', error);
    throw error;
  }
} 