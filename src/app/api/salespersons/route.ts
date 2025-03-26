import { NextResponse } from 'next/server';
import { google } from 'googleapis';
import { JWT } from 'google-auth-library';

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
const SHEET_NAME = 'Salespersons';

// スプレッドシートの列インデックス
const COLUMNS = {
  ID: 0,
  NAME: 1,
  EMAIL: 2,
  CREATED_AT: 3,
  UPDATED_AT: 4
};

// シートの初期化（ヘッダー行の作成）
async function initializeSheet(sheets: any, spreadsheetId: string) {
  const headers = [
    'ID',
    '名前',
    'メールアドレス',
    '作成日時',
    '更新日時'
  ];

  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: `${SHEET_NAME}!A1:E1`,
    valueInputOption: 'RAW',
    requestBody: {
      values: [headers]
    }
  });
}

// シートの存在確認と作成
async function ensureSheetExists(sheets: any, spreadsheetId: string) {
  try {
    const response = await sheets.spreadsheets.get({
      spreadsheetId,
    });

    const sheet = response.data.sheets.find(
      (s: any) => s.properties.title === SHEET_NAME
    );

    if (!sheet) {
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId,
        requestBody: {
          requests: [{
            addSheet: {
              properties: {
                title: SHEET_NAME
              }
            }
          }]
        }
      });
      await initializeSheet(sheets, spreadsheetId);
    }
  } catch (error) {
    console.error('Error ensuring sheet exists:', error);
    throw error;
  }
}

// 認証とシートの取得
async function getAuthorizedSheets() {
  const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS || '{}');
  const auth = new JWT({
    email: credentials.client_email,
    key: credentials.private_key,
    scopes: SCOPES,
  });

  const sheets = google.sheets({ version: 'v4', auth });
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;

  if (!spreadsheetId) {
    throw new Error('GOOGLE_SHEET_ID is not set');
  }

  await ensureSheetExists(sheets, spreadsheetId);

  return { sheets, spreadsheetId };
}

export async function GET() {
  try {
    const { sheets, spreadsheetId } = await getAuthorizedSheets();
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${SHEET_NAME}!A2:E`,
    });

    const rows = response.data.values || [];
    const data = rows.map(row => ({
      id: row[COLUMNS.ID],
      name: row[COLUMNS.NAME],
      email: row[COLUMNS.EMAIL],
      createdAt: row[COLUMNS.CREATED_AT],
      updatedAt: row[COLUMNS.UPDATED_AT]
    }));

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching salespersons:', error);
    return NextResponse.json(
      { error: '担当者データの取得に失敗しました' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { name, email } = await request.json();
    const { sheets, spreadsheetId } = await getAuthorizedSheets();

    const now = new Date().toISOString();
    const id = crypto.randomUUID();

    const values = [[
      id,
      name,
      email,
      now,
      now
    ]];

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `${SHEET_NAME}!A2:E`,
      valueInputOption: 'RAW',
      requestBody: { values },
    });

    return NextResponse.json({ id, name, email, createdAt: now, updatedAt: now });
  } catch (error) {
    console.error('Error adding salesperson:', error);
    return NextResponse.json(
      { error: '担当者の追加に失敗しました' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: '担当者IDが指定されていません' },
        { status: 400 }
      );
    }

    const { sheets, spreadsheetId } = await getAuthorizedSheets();

    // 既存データの取得
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${SHEET_NAME}!A2:E`,
    });

    const rows = response.data.values || [];
    const rowIndex = rows.findIndex(row => row[COLUMNS.ID] === id);

    if (rowIndex === -1) {
      return NextResponse.json(
        { error: '指定された担当者が見つかりません' },
        { status: 404 }
      );
    }

    // 行の削除
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: {
        requests: [{
          deleteDimension: {
            range: {
              sheetId: 0,
              dimension: 'ROWS',
              startIndex: rowIndex + 1,
              endIndex: rowIndex + 2
            }
          }
        }]
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting salesperson:', error);
    return NextResponse.json(
      { error: '担当者の削除に失敗しました' },
      { status: 500 }
    );
  }
} 