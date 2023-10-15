import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

import db from '@/app/_helpers/server/database';

export async function POST(req: NextRequest, { params: { id } }: any) {
  try {
    const { password } = (await req.json()) as { password: string };
    const question = await db.question.findUnique({
      where: { id },
    });

    if (!question) {
      return NextResponse.json(
        {
          message: '해당 질문 글이 존재하지 않습니다.',
        },
        {
          status: 404,
        },
      );
    }

    const valid = await bcrypt.compare(password, question.password);

    if (!valid) {
      return NextResponse.json(
        {
          message: '비밀번호가 틀렸습니다.',
        },
        {
          status: 403,
        },
      );
    }

    return NextResponse.json({
      message: 'ok',
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
