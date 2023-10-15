import { getServerSession } from 'next-auth';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import db from './database';

export async function getSessionAdmin() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.id) {
    throw new Error('관리자 로그인 후 사용하세요');
  }

  const admin = await db.admin.findFirst({
    where: { id: session.user.id },
  });

  if (!admin) {
    throw new Error('관리자 생성 후 이용하세요');
  }

  return {
    id: admin.id,
  };
}
