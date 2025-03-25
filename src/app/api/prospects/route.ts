import { NextResponse } from 'next/server';
import { google } from 'googleapis';
import { JWT } from 'google-auth-library';

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

export async function GET() {
  try {
    const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS || '{}');
    const auth = new JWT({
      email: credentials.client_email,
      key: credentials.private_key,
      scopes: SCOPES,
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'Prospects!A2:F',
    });

    const rows = response.data.values;
    if (!rows) return NextResponse.json([]);

    const data = rows.map(row => ({
      companyName: row[0],
      contactPerson: row[1],
      status: row[2],
      nextAction: row[3],
      nextActionDate: row[4],
      amount: parseInt(row[5]) || 0,
    }));

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching prospects:', error);
    return NextResponse.json({ error: 'Failed to fetch prospects' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS || '{}');
    const auth = new JWT({
      email: credentials.client_email,
      key: credentials.private_key,
      scopes: SCOPES,
    });

    const sheets = google.sheets({ version: 'v4', auth });
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

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error adding prospect:', error);
    return NextResponse.json({ error: 'Failed to add prospect' }, { status: 500 });
  }
} 