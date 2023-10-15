import { NextRequest, NextResponse } from 'next/server';

import db from '@/app/_helpers/server/database';

export async function GET(_: NextRequest, { params: { id } }: any) {
  try {
    const notice = await db.notice.findUnique({
      where: { id },
    });

    return NextResponse.json(notice);
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
