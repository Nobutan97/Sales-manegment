import { google } from 'googleapis';
import { JWT } from 'google-auth-library';

// Google Sheets APIのスコープ
const SCOPES = [
  'https://www.googleapis.com/auth/spreadsheets',
  'https://www.googleapis.com/auth/drive.file',
];

// スプレッドシートの設定
export const SPREADSHEET_CONFIG = {
  // スプレッドシートのID（後で設定）
  spreadsheetId: process.env.GOOGLE_SHEET_ID || '',
  
  // シート名
  sheets: {
    dailyActivities: '日次活動',
    prospects: '案件管理',
    salespersons: '営業担当者',
  },
};

// Google Sheets APIクライアントの設定
export const getAuthClient = async () => {
  const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS || '{}');
  
  const auth = new JWT({
    email: credentials.client_email,
    key: credentials.private_key,
    scopes: SCOPES,
  });
  
  return auth;
};

// スプレッドシートの操作クラス
export class GoogleSheetsService {
  private sheets;
  private spreadsheetId: string;

  constructor(spreadsheetId: string) {
    this.spreadsheetId = spreadsheetId;
    this.sheets = google.sheets({ version: 'v4' });
  }

  // データの読み取り
  async readSheet(range: string) {
    const auth = await getAuthClient();
    const response = await this.sheets.spreadsheets.values.get({
      auth,
      spreadsheetId: this.spreadsheetId,
      range,
    });
    return response.data.values || [];
  }

  // データの書き込み
  async writeSheet(range: string, values: any[][]) {
    const auth = await getAuthClient();
    await this.sheets.spreadsheets.values.update({
      auth,
      spreadsheetId: this.spreadsheetId,
      range,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values,
      },
    });
  }

  // データの追加
  async appendSheet(range: string, values: any[][]) {
    const auth = await getAuthClient();
    await this.sheets.spreadsheets.values.append({
      auth,
      spreadsheetId: this.spreadsheetId,
      range,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values,
      },
    });
  }
} 