import { NextRequest, NextResponse } from 'next/server';

import db from '@/app/_helpers/server/database';

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.nextUrl);

    const title = url.searchParams.get('title') ?? '';
    const tag = url.searchParams.get('tag') ?? '';
    const cursor = (url.searchParams.get('cursor') as string) ?? '';
    const cursorObj = cursor === '' ? undefined : { id: cursor };
    const limit = 12;

    let where = tag
      ? {
          title: {
            contains: title,
          },
          tags: {
            has: tag,
          },
        }
      : {
          title: {
            contains: title,
          },
        };

    const stories = await db.story.findMany({
      where,
      cursor: cursorObj,
      take: limit,
      skip: cursor !== '' ? 1 : 0,
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(stories);
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
