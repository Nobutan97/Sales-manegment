import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.activity.delete({
      where: {
        id: params.id,
      },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting activity:', error);
    return NextResponse.json(
      { error: '活動データの削除に失敗しました' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { approaches, prospects, meetings, contracts } = await request.json();
    const activity = await prisma.activity.update({
      where: {
        id: params.id,
      },
      data: {
        approaches,
        prospects,
        meetings,
        contracts,
      },
    });
    return NextResponse.json(activity);
  } catch (error) {
    console.error('Error updating activity:', error);
    return NextResponse.json(
      { error: '活動データの更新に失敗しました' },
      { status: 500 }
    );
  }
} 