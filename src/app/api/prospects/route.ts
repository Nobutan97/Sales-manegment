import { NextResponse } from 'next/server';
import { google } from 'googleapis';
import { JWT } from 'google-auth-library';

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
const SHEET_NAME = 'Prospects';

// スプレッドシートの列インデックス
const COLUMNS = {
  ID: 0,
  COMPANY_NAME: 1,
  CONTACT_PERSON: 2,
  CONTACT_EMAIL: 3,
  STATUS: 4,
  NEXT_ACTION: 5,
  NEXT_ACTION_DATE: 6,
  SALESPERSON_ID: 7,
  NOTES: 8,
  CREATED_AT: 9,
  UPDATED_AT: 10
};

// シートの初期化（ヘッダー行の作成）
async function initializeSheet(sheets: any, spreadsheetId: string) {
  const headers = [
    'ID',
    '会社名',
    '担当者名',
    '連絡先',
    'ステータス',
    '次のアクション',
    '次回アクション日',
    '営業担当ID',
    '備考',
    '作成日時',
    '更新日時'
  ];

  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: `${SHEET_NAME}!A1:K1`,
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

// データの取得
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const salespersonId = searchParams.get('salespersonId');

    const { sheets, spreadsheetId } = await getAuthorizedSheets();
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${SHEET_NAME}!A2:K`,
    });

    const rows = response.data.values || [];
    let data = rows.map(row => ({
      id: row[COLUMNS.ID],
      companyName: row[COLUMNS.COMPANY_NAME],
      contactName: row[COLUMNS.CONTACT_PERSON],
      contactInfo: row[COLUMNS.CONTACT_EMAIL],
      status: parseInt(row[COLUMNS.STATUS]) || 1,
      nextAction: row[COLUMNS.NEXT_ACTION],
      nextActionDate: row[COLUMNS.NEXT_ACTION_DATE],
      salespersonId: row[COLUMNS.SALESPERSON_ID],
      notes: row[COLUMNS.NOTES],
      createdAt: row[COLUMNS.CREATED_AT],
      updatedAt: row[COLUMNS.UPDATED_AT]
    }));

    // 担当者でフィルタリング
    if (salespersonId) {
      data = data.filter(item => item.salespersonId === salespersonId);
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching prospects:', error);
    return NextResponse.json(
      { error: '案件データの取得に失敗しました' },
      { status: 500 }
    );
  }
}

// データの追加
export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { sheets, spreadsheetId } = await getAuthorizedSheets();

    const now = new Date().toISOString();
    const id = crypto.randomUUID();

    const values = [[
      id,
      data.companyName,
      data.contactName,
      data.contactInfo,
      data.status,
      data.nextAction,
      data.nextActionDate,
      data.salespersonId,
      data.notes,
      now,
      now
    ]];

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `${SHEET_NAME}!A2:K`,
      valueInputOption: 'RAW',
      requestBody: { values },
    });

    return NextResponse.json({ id, ...data, createdAt: now, updatedAt: now });
  } catch (error) {
    console.error('Error adding prospect:', error);
    return NextResponse.json(
      { error: '案件の追加に失敗しました' },
      { status: 500 }
    );
  }
}

// データの更新
export async function PUT(request: Request) {
  try {
    const data = await request.json();
    const { sheets, spreadsheetId } = await getAuthorizedSheets();

    // 既存データの取得
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${SHEET_NAME}!A2:K`,
    });

    const rows = response.data.values || [];
    const rowIndex = rows.findIndex(row => row[COLUMNS.ID] === data.id);

    if (rowIndex === -1) {
      return NextResponse.json(
        { error: '指定された案件が見つかりません' },
        { status: 404 }
      );
    }

    const now = new Date().toISOString();
    const values = [[
      data.id,
      data.companyName,
      data.contactName,
      data.contactInfo,
      data.status,
      data.nextAction,
      data.nextActionDate,
      data.salespersonId,
      data.notes,
      rows[rowIndex][COLUMNS.CREATED_AT],
      now
    ]];

    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `${SHEET_NAME}!A${rowIndex + 2}:K${rowIndex + 2}`,
      valueInputOption: 'RAW',
      requestBody: { values },
    });

    return NextResponse.json({ ...data, updatedAt: now });
  } catch (error) {
    console.error('Error updating prospect:', error);
    return NextResponse.json(
      { error: '案件の更新に失敗しました' },
      { status: 500 }
    );
  }
}

// データの削除
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: '案件IDが指定されていません' },
        { status: 400 }
      );
    }

    const { sheets, spreadsheetId } = await getAuthorizedSheets();

    // 既存データの取得
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${SHEET_NAME}!A2:K`,
    });

    const rows = response.data.values || [];
    const rowIndex = rows.findIndex(row => row[COLUMNS.ID] === id);

    if (rowIndex === -1) {
      return NextResponse.json(
        { error: '指定された案件が見つかりません' },
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
    console.error('Error deleting prospect:', error);
    return NextResponse.json(
      { error: '案件の削除に失敗しました' },
      { status: 500 }
    );
  }
} 