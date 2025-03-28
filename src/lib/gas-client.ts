// 基本的なレスポンス型
export interface GASResponse {
  success: boolean;
  data?: any;
  error?: string;
}

// 基本的なアクション型
export type GASAction = 
  | 'addSalesperson'
  | 'updateSalesperson'
  | 'deleteSalesperson'
  | 'addProspect'
  | 'updateProspect'
  | 'deleteProspect'
  | 'addActivity'
  | 'updateActivity'
  | 'deleteActivity';

// データ型
export interface Salesperson {
  id: string;
  name: string;
  email: string;
}

export interface Prospect {
  id: string;
  company: string;
  contact: string;
  email: string;
  status: string;
  notes: string;
  salesperson_id: string;
}

export interface Activity {
  id: string;
  date: string;
  salesperson_id: string;
  approaches: number;
  appointments: number;
  meetings: number;
  trials: number;
  contracts: number;
}

// GASとの通信関数
export async function fetchFromGAS(): Promise<GASResponse> {
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
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

export async function postToGAS(action: string, data: any): Promise<GASResponse> {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_GAS_URL || '', {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({ action, data })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error posting to GAS:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
} 