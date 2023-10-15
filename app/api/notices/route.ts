import { NextRequest, NextResponse } from 'next/server';

import db from '@/app/_helpers/server/database';

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.nextUrl);

    const title = url.searchParams.get('title') ?? '';
    const cursor = (url.searchParams.get('cursor') as string) ?? '';
    const cursorObj = cursor === '' ? undefined : { id: cursor };
    const limit = 25;

    const notices = await db.notice.findMany({
      where: {
        title: {
          contains: title,
        },
      },
      cursor: cursorObj,
      take: limit,
      skip: cursor !== '' ? 1 : 0,
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(notices);
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
