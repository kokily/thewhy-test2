import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

import db from '@/app/_helpers/server/database';
import { signJwtAccessToken } from '@/app/_helpers/client/tokens';

export async function POST(req: NextRequest) {
  try {
    const { password } = (await req.json()) as { password: string };
    const admin = await db.admin.findFirst();

    if (!admin) {
      return NextResponse.json(
        {
          message: '관리자 생성 후 이용하세요',
        },
        {
          status: 401,
        },
      );
    }

    if (admin && (await bcrypt.compare(password, admin.password))) {
      const { password, ...adminWithoutPassword } = admin;
      const token = signJwtAccessToken(adminWithoutPassword);
      const result = {
        ...adminWithoutPassword,
        token,
      };

      return NextResponse.json(result);
    } else {
      return NextResponse.json(null);
    }
  } catch (err: any) {
    return NextResponse.json(
      {
        message: err.message,
      },
      { status: 500 },
    );
  }
}
