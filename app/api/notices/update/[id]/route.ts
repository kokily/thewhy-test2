import { NextRequest, NextResponse } from 'next/server';

import db from '@/app/_helpers/server/database';
import { getSessionAdmin } from '@/app/_helpers/server/session';

export async function PATCH(req: NextRequest, { params: { id } }: any) {
  try {
    await getSessionAdmin();

    const { title, body } = (await req.json()) as NoticePayload;
    const notice = await db.notice.update({
      where: { id },
      data: {
        title,
        body,
        updatedAt: new Date(),
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
