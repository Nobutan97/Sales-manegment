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
}

export async function getSalesData(): Promise<SalesData[]> {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'SalesData!A2:G',
    });

    const rows = response.data.values;
    if (!rows) return [];

    return rows.map(row => ({
      date: row[0],
      salesPerson: row[1],
      approaches: parseInt(row[2]) || 0,
      appointments: parseInt(row[3]) || 0,
      meetings: parseInt(row[4]) || 0,
      trials: parseInt(row[5]) || 0,
      contracts: parseInt(row[6]) || 0,
    }));
  } catch (error) {
    console.error('Error fetching sales data:', error);
    return [];
  }
}

export async function getProspects(): Promise<ProspectData[]> {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'Prospects!A2:F',
    });

    const rows = response.data.values;
    if (!rows) return [];

    return rows.map(row => ({
      companyName: row[0],
      contactPerson: row[1],
      status: row[2],
      nextAction: row[3],
      nextActionDate: row[4],
      amount: parseInt(row[5]) || 0,
    }));
  } catch (error) {
    console.error('Error fetching prospects:', error);
    return [];
  }
}

export async function addSalesData(data: SalesData): Promise<void> {
  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'SalesData!A2:G',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[
          data.date,
          data.salesPerson,
          data.approaches,
          data.appointments,
          data.meetings,
          data.trials,
          data.contracts,
        ]],
      },
    });
  } catch (error) {
    console.error('Error adding sales data:', error);
    throw error;
  }
}

export async function addProspect(data: ProspectData): Promise<void> {
  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'Prospects!A2:F',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[
          data.companyName,
          data.contactPerson,
          data.status,
          data.nextAction,
          data.nextActionDate,
          data.amount,
        ]],
      },
    });
  } catch (error) {
    console.error('Error adding prospect:', error);
    throw error;
  }
} 