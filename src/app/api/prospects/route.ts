import { NextResponse } from 'next/server';
import { GoogleSheetsService } from '@/lib/google-sheets/config';
import { SPREADSHEET_CONFIG } from '@/lib/google-sheets/config';
import { Prospect, ApiResponse } from '@/lib/types';

const sheetsService = new GoogleSheetsService(SPREADSHEET_CONFIG.spreadsheetId);

// GET: 案件データの取得
export async function GET() {
  try {
    const range = `${SPREADSHEET_CONFIG.sheets.prospects}!A2:J`;
    const values = await sheetsService.readSheet(range);
    
    const prospects: Prospect[] = values.map((row: string[]) => ({
      id: row[0],
      companyName: row[1],
      contactName: row[2],
      contactInfo: row[3],
      status: row[4] as Prospect['status'],
      nextActionDate: row[5],
      notes: row[6],
      salespersonId: row[7],
      createdAt: row[8],
      updatedAt: row[9],
    }));

    return NextResponse.json<ApiResponse<Prospect[]>>({
      success: true,
      data: prospects,
    });
  } catch (error) {
    console.error('Error fetching prospects:', error);
    return NextResponse.json<ApiResponse<null>>({
      success: false,
      error: '案件データの取得に失敗しました',
    }, { status: 500 });
  }
}

// POST: 案件データの作成
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const prospect: Omit<Prospect, 'id' | 'createdAt' | 'updatedAt'> = body;

    const newProspect: Prospect = {
      ...prospect,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const values = [
      [
        newProspect.id,
        newProspect.companyName,
        newProspect.contactName,
        newProspect.contactInfo,
        newProspect.status,
        newProspect.nextActionDate,
        newProspect.notes,
        newProspect.salespersonId,
        newProspect.createdAt,
        newProspect.updatedAt,
      ],
    ];

    await sheetsService.appendSheet(
      `${SPREADSHEET_CONFIG.sheets.prospects}!A2:J`,
      values
    );

    return NextResponse.json<ApiResponse<Prospect>>({
      success: true,
      data: newProspect,
    });
  } catch (error) {
    console.error('Error creating prospect:', error);
    return NextResponse.json<ApiResponse<null>>({
      success: false,
      error: '案件データの作成に失敗しました',
    }, { status: 500 });
  }
}

// PUT: 案件データの更新
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...prospect } = body;

    const updatedProspect: Prospect = {
      ...prospect,
      id,
      updatedAt: new Date().toISOString(),
    };

    const values = [
      [
        updatedProspect.id,
        updatedProspect.companyName,
        updatedProspect.contactName,
        updatedProspect.contactInfo,
        updatedProspect.status,
        updatedProspect.nextActionDate,
        updatedProspect.notes,
        updatedProspect.salespersonId,
        updatedProspect.createdAt,
        updatedProspect.updatedAt,
      ],
    ];

    await sheetsService.writeSheet(
      `${SPREADSHEET_CONFIG.sheets.prospects}!A2:J`,
      values
    );

    return NextResponse.json<ApiResponse<Prospect>>({
      success: true,
      data: updatedProspect,
    });
  } catch (error) {
    console.error('Error updating prospect:', error);
    return NextResponse.json<ApiResponse<null>>({
      success: false,
      error: '案件データの更新に失敗しました',
    }, { status: 500 });
  }
} 