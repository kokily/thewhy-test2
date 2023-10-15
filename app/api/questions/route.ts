import { NextRequest, NextResponse } from 'next/server';

import db from '@/app/_helpers/server/database';

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.nextUrl);

    const title = url.searchParams.get('title') ?? '';
    const email = url.searchParams.get('email') ?? '';
    const phone = url.searchParams.get('phone') ?? '';
    const cursor = (url.searchParams.get('cursor') as string) ?? '';
    const cursorObj = cursor === '' ? undefined : { id: cursor };
    const limit = 25;

    const questions = await db.question.findMany({
      where: {
        title: {
          contains: title,
        },
        email: {
          contains: email,
        },
        phone: {
          contains: phone,
        },
      },
      cursor: cursorObj,
      take: limit,
      skip: cursor !== '' ? 1 : 0,
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(questions);
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
