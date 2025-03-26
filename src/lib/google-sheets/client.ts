import { google } from 'googleapis';
import { JWT } from 'google-auth-library';

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

export async function getGoogleSheetsClient() {
  const credentials = JSON.parse(process.env.NEXT_PUBLIC_GOOGLE_CREDENTIALS || '{}');
  const auth = new JWT({
    email: credentials.client_email,
    key: credentials.private_key,
    scopes: SCOPES,
  });

  return google.sheets({ version: 'v4', auth });
}

export async function appendToSheet(sheetName: string, values: any[][]) {
  const sheets = await getGoogleSheetsClient();
  const spreadsheetId = process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID;

  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `${sheetName}!A2:Z`,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values,
      },
    });
    return true;
  } catch (error) {
    console.error('Error appending to sheet:', error);
    return false;
  }
}

export async function readFromSheet(sheetName: string, range: string) {
  const sheets = await getGoogleSheetsClient();
  const spreadsheetId = process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID;

  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${sheetName}!${range}`,
    });
    return response.data.values || [];
  } catch (error) {
    console.error('Error reading from sheet:', error);
    return [];
  }
} 