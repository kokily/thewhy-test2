import { NextRequest, NextResponse } from 'next/server';

import db from '@/app/_helpers/server/database';
import { getSessionAdmin } from '@/app/_helpers/server/session';

export async function POST(req: NextRequest) {
  try {
    await getSessionAdmin();

    const { title, body } = (await req.json()) as NoticePayload;
    const notice = await db.notice.create({
      data: {
        title,
        body,
      },
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
