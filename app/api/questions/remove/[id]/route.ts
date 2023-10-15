import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

import db from '@/app/_helpers/server/database';
import { getSessionAdmin } from '@/app/_helpers/server/session';

export async function PATCH(req: NextRequest, { params: { id } }: any) {
  try {
    const { password } = (await req.json()) as { password?: string };
    const question = await db.question.findUnique({
      where: { id },
    });

    if (!question) {
      return NextResponse.json(
        {
          message: '존재하지 않는 질문 글입니다.',
        },
        {
          status: 404,
        },
      );
    }

    if (password) {
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
      } else {
        await db.question.delete({ where: { id } });

        return NextResponse.json({
          message: '삭제 완료',
        });
      }
    } else {
      await getSessionAdmin();
      await db.question.delete({ where: { id } });

      return NextResponse.json({
        message: '삭제 완료',
      });
    }
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
