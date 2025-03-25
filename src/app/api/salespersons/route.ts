import { NextResponse } from 'next/server';
import { GoogleSheetsService } from '@/lib/google-sheets/config';
import { SPREADSHEET_CONFIG } from '@/lib/google-sheets/config';
import { Salesperson, ApiResponse } from '@/lib/types';

const sheetsService = new GoogleSheetsService(SPREADSHEET_CONFIG.spreadsheetId);

// GET: 営業担当者データの取得
export async function GET() {
  try {
    const range = `${SPREADSHEET_CONFIG.sheets.salespersons}!A2:F`;
    const values = await sheetsService.readSheet(range);
    
    const salespersons: Salesperson[] = values.map((row: string[]) => ({
      id: row[0],
      name: row[1],
      email: row[2],
      department: row[3],
      createdAt: row[4],
      updatedAt: row[5],
    }));

    return NextResponse.json<ApiResponse<Salesperson[]>>({
      success: true,
      data: salespersons,
    });
  } catch (error) {
    console.error('Error fetching salespersons:', error);
    return NextResponse.json<ApiResponse<null>>({
      success: false,
      error: '営業担当者データの取得に失敗しました',
    }, { status: 500 });
  }
}

// POST: 営業担当者データの作成
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const salesperson: Omit<Salesperson, 'id' | 'createdAt' | 'updatedAt'> = body;

    const newSalesperson: Salesperson = {
      ...salesperson,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const values = [
      [
        newSalesperson.id,
        newSalesperson.name,
        newSalesperson.email,
        newSalesperson.department,
        newSalesperson.createdAt,
        newSalesperson.updatedAt,
      ],
    ];

    await sheetsService.appendSheet(
      `${SPREADSHEET_CONFIG.sheets.salespersons}!A2:F`,
      values
    );

    return NextResponse.json<ApiResponse<Salesperson>>({
      success: true,
      data: newSalesperson,
    });
  } catch (error) {
    console.error('Error creating salesperson:', error);
    return NextResponse.json<ApiResponse<null>>({
      success: false,
      error: '営業担当者データの作成に失敗しました',
    }, { status: 500 });
  }
}

// PUT: 営業担当者データの更新
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...salesperson } = body;

    const updatedSalesperson: Salesperson = {
      ...salesperson,
      id,
      updatedAt: new Date().toISOString(),
    };

    const values = [
      [
        updatedSalesperson.id,
        updatedSalesperson.name,
        updatedSalesperson.email,
        updatedSalesperson.department,
        updatedSalesperson.createdAt,
        updatedSalesperson.updatedAt,
      ],
    ];

    await sheetsService.writeSheet(
      `${SPREADSHEET_CONFIG.sheets.salespersons}!A2:F`,
      values
    );

    return NextResponse.json<ApiResponse<Salesperson>>({
      success: true,
      data: updatedSalesperson,
    });
  } catch (error) {
    console.error('Error updating salesperson:', error);
    return NextResponse.json<ApiResponse<null>>({
      success: false,
      error: '営業担当者データの更新に失敗しました',
    }, { status: 500 });
  }
} 