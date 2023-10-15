import { NextRequest, NextResponse } from 'next/server';

import db from '@/app/_helpers/server/database';
import { getSessionAdmin } from '@/app/_helpers/server/session';

export async function POST(req: NextRequest) {
  try {
    await getSessionAdmin();
    
    const { title, body, tags, thumbnail } = (await req.json()) as StoryPayload;
    const story = await db.story.create({
      data: {
        title,
        body,
        tags,
        thumbnail,
      },
    });

    return NextResponse.json(story);
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
