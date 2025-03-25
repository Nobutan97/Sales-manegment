import { NextResponse } from 'next/server';
import { GoogleSheetsService } from '@/lib/google-sheets/config';
import { SPREADSHEET_CONFIG } from '@/lib/google-sheets/config';
import { DailyActivity, ApiResponse } from '@/lib/types';

const sheetsService = new GoogleSheetsService(SPREADSHEET_CONFIG.spreadsheetId);

// GET: 日次活動データの取得
export async function GET() {
  try {
    const range = `${SPREADSHEET_CONFIG.sheets.dailyActivities}!A2:J`;
    const values = await sheetsService.readSheet(range);
    
    const activities: DailyActivity[] = values.map((row) => ({
      id: row[0],
      date: row[1],
      salespersonId: row[2],
      approaches: Number(row[3]),
      appointments: Number(row[4]),
      meetings: Number(row[5]),
      trials: Number(row[6]),
      contracts: Number(row[7]),
      createdAt: row[8],
      updatedAt: row[9],
    }));

    return NextResponse.json<ApiResponse<DailyActivity[]>>({
      success: true,
      data: activities,
    });
  } catch (error) {
    console.error('Error fetching daily activities:', error);
    return NextResponse.json<ApiResponse<null>>({
      success: false,
      error: '日次活動データの取得に失敗しました',
    }, { status: 500 });
  }
}

// POST: 日次活動データの作成
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const activity: Omit<DailyActivity, 'id' | 'createdAt' | 'updatedAt'> = body;

    const newActivity: DailyActivity = {
      ...activity,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const values = [
      [
        newActivity.id,
        newActivity.date,
        newActivity.salespersonId,
        newActivity.approaches,
        newActivity.appointments,
        newActivity.meetings,
        newActivity.trials,
        newActivity.contracts,
        newActivity.createdAt,
        newActivity.updatedAt,
      ],
    ];

    await sheetsService.appendSheet(
      `${SPREADSHEET_CONFIG.sheets.dailyActivities}!A2:J`,
      values
    );

    return NextResponse.json<ApiResponse<DailyActivity>>({
      success: true,
      data: newActivity,
    });
  } catch (error) {
    console.error('Error creating daily activity:', error);
    return NextResponse.json<ApiResponse<null>>({
      success: false,
      error: '日次活動データの作成に失敗しました',
    }, { status: 500 });
  }
} 