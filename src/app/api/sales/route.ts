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
      range: 'SalesData!A2:G',
    });

    const rows = response.data.values;
    if (!rows) return NextResponse.json([]);

    const data = rows.map(row => ({
      date: row[0],
      salesPerson: row[1],
      approaches: parseInt(row[2]) || 0,
      appointments: parseInt(row[3]) || 0,
      meetings: parseInt(row[4]) || 0,
      trials: parseInt(row[5]) || 0,
      contracts: parseInt(row[6]) || 0,
    }));

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching sales data:', error);
    return NextResponse.json({ error: 'Failed to fetch sales data' }, { status: 500 });
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

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error adding sales data:', error);
    return NextResponse.json({ error: 'Failed to add sales data' }, { status: 500 });
  }
} 