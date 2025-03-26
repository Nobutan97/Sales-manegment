import { NextApiRequest, NextApiResponse } from 'next';
import { google } from 'googleapis';
import { JWT } from 'google-auth-library';

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

async function getGoogleSheetsClient() {
  const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS || '{}');
  const auth = new JWT({
    email: credentials.client_email,
    key: credentials.private_key,
    scopes: SCOPES,
  });

  return google.sheets({ version: 'v4', auth });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query, body } = req;
  const { sheet, range } = query;

  try {
    const sheets = await getGoogleSheetsClient();
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    switch (method) {
      case 'GET':
        const response = await sheets.spreadsheets.values.get({
          spreadsheetId,
          range: `${sheet}!${range}`,
        });
        res.status(200).json(response.data.values || []);
        break;

      case 'POST':
        await sheets.spreadsheets.values.append({
          spreadsheetId,
          range: `${sheet}!A2:Z`,
          valueInputOption: 'USER_ENTERED',
          requestBody: {
            values: [body.values],
          },
        });
        res.status(200).json({ success: true });
        break;

      default:
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    console.error('Sheets API Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
} 