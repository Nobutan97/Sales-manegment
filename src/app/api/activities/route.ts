import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { salespersonId, date, approaches, prospects, meetings, contracts } = await request.json();

    // 同じ日付の既存のデータを確認
    const existingActivity = await prisma.activity.findUnique({
      where: {
        date_salespersonId: {
          date: new Date(date),
          salespersonId,
        },
      },
    });

    if (existingActivity) {
      // 既存のデータを更新
      const activity = await prisma.activity.update({
        where: {
          id: existingActivity.id,
        },
        data: {
          approaches,
          prospects,
          meetings,
          contracts,
        },
      });
      return NextResponse.json(activity);
    } else {
      // 新規データを作成
      const activity = await prisma.activity.create({
        data: {
          date: new Date(date),
          salespersonId,
          approaches,
          prospects,
          meetings,
          contracts,
        },
      });
      return NextResponse.json(activity);
    }
  } catch (error) {
    console.error('Error creating/updating activity:', error);
    return NextResponse.json(
      { error: '活動データの登録に失敗しました' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const salespersonId = searchParams.get('salespersonId');

    const where: any = {};

    if (startDate && endDate) {
      where.date = {
        gte: new Date(startDate),
        lte: new Date(endDate),
      };
    }

    if (salespersonId) {
      where.salespersonId = salespersonId;
    }

    const activities = await prisma.activity.findMany({
      where,
      include: {
        salesperson: true,
      },
      orderBy: {
        date: 'desc',
      },
    });

    return NextResponse.json(activities);
  } catch (error) {
    console.error('Error fetching activities:', error);
    return NextResponse.json(
      { error: '活動データの取得に失敗しました' },
      { status: 500 }
    );
  }
} 