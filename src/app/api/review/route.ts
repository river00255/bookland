import prisma from '@/lib/prisma';
import { NextRequest } from 'next/server';

export const findExistCursor = async (id: number, count: number) => {
  let currentId = id;

  while (true) {
    const review = await prisma.review.findUnique({
      where: { id: currentId },
    });
    if (review) return currentId;
    currentId += 1;

    if (currentId > count) return 0;
  }
};

export const PAGE_SIZE = 10;

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const cursor = searchParams.get('cursor');
  const isPublic = searchParams.get('isPublic');

  const count = await prisma.review.count();

  const id = await findExistCursor(Number(cursor), count);

  const review = await prisma.review.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    where: {
      public: Number(isPublic) > 0 ? false : true,
    },
    take: PAGE_SIZE, // page size
    ...(id > PAGE_SIZE && {
      // skip: 1, // skip the cursor
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

export const POST = async (request: Request) => {
  try {
    const data = await request.json();

    const review = await prisma.review.create({
      data,
    });

    return Response.json(review);
  } catch (e) {
    return new Response(JSON.stringify({ message: 'Add review failed.' }), {
      status: 500,
    });
  }
};
