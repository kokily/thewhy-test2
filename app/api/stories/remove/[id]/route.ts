import { NextRequest, NextResponse } from 'next/server';

import db from '@/app/_helpers/server/database';
import { getSessionAdmin } from '@/app/_helpers/server/session';

export async function DELETE(_: NextRequest, { params: { id } }: any) {
  try {
    await getSessionAdmin();
    await db.story.delete({ where: { id } });

    return NextResponse.json({
      message: '삭제 완료',
    });
  } catch (err: any) {
    return NextResponse.json(
      {
        message: err.message,
      },
      {
        status: 500,
      },
    );
  }
}
