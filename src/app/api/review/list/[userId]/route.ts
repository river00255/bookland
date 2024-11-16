import prisma from '@/lib/prisma';
import { NextRequest } from 'next/server';
import { findExistCursor, PAGE_SIZE } from '../../route';

export const GET = async (
  request: NextRequest,
  { params }: { params: { userId: string } }
) => {
  const searchParams = request.nextUrl.searchParams;
  const cursor = searchParams.get('cursor');

  const count = await prisma.review.count();

  const id = await findExistCursor(Number(cursor), count);

  const review = await prisma.review.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    where: {
      userId: params.userId,
    },
    take: PAGE_SIZE, // page size
    ...(id > PAGE_SIZE && {
      skip: 1, // skip the cursor
      cursor: {
        id,
      },
    }),
  });

  return Response.json({
    review,
    totalCount: count,
  });
};
