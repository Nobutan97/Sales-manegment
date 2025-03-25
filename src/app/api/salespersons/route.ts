import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const salespersons = await prisma.salesperson.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return NextResponse.json(salespersons);
  } catch (error) {
    return NextResponse.json(
      { error: '担当者データの取得に失敗しました' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { name } = await request.json();
    const salesperson = await prisma.salesperson.create({
      data: {
        name,
      },
    });
    return NextResponse.json(salesperson);
  } catch (error) {
    return NextResponse.json(
      { error: '担当者の追加に失敗しました' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    await prisma.salesperson.delete({
      where: {
        id,
      },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: '担当者の削除に失敗しました' },
      { status: 500 }
    );
  }
} 