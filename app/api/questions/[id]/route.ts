import { NextRequest, NextResponse } from 'next/server';

import db from '@/app/_helpers/server/database';

export async function GET(_: NextRequest, { params: { id } }: any) {
  try {
    const question = await db.question.findUnique({
      where: { id },
    });

    return NextResponse.json(question);
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
