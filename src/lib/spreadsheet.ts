import { google } from 'googleapis';
import { JWT } from 'google-auth-library';

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

// 認証情報の設定
const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS || '{}');

const auth = new JWT({
  email: credentials.client_email,
  key: credentials.private_key,
  scopes: SCOPES,
});

const sheets = google.sheets({ version: 'v4', auth });

export interface SalesData {
  date: string;
  salesPerson: string;
  approaches: number;
  appointments: number;
  meetings: number;
  trials: number;
  contracts: number;
}

export interface ProspectData {
  companyName: string;
  contactPerson: string;
  status: string;
  nextAction: string;
  nextActionDate: string;
  amount: number;
  salespersonId: string;
}

export async function getSalesData(): Promise<SalesData[]> {
  try {
    const response = await fetch('/api/sales');
    if (!response.ok) {
      throw new Error('Failed to fetch sales data');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching sales data:', error);
    return [];
  }
}

export async function getProspects(): Promise<ProspectData[]> {
  try {
    const response = await fetch('/api/prospects');
    if (!response.ok) {
      throw new Error('Failed to fetch prospects');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching prospects:', error);
    return [];
  }
}

export async function addSalesData(data: SalesData): Promise<void> {
  try {
    const response = await fetch('/api/sales', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to add sales data');
    }
  } catch (error) {
    console.error('Error adding sales data:', error);
    throw error;
  }
}

export async function addProspect(data: ProspectData): Promise<void> {
  try {
    const response = await fetch('/api/prospects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to add prospect');
    }
  } catch (error) {
    console.error('Error adding prospect:', error);
    throw error;
  }
} 