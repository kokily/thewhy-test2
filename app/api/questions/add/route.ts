import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

import db from '@/app/_helpers/server/database';

export async function POST(req: NextRequest) {
  try {
    const { title, body, username, password, email, phone } =
      (await req.json()) as QuestionPayload;

    const question = await db.question.create({
      data: {
        title,
        body,
        username,
        email,
        phone,
        password: await bcrypt.hash(password, 10),
      },
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
