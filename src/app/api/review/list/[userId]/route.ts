import prisma from '@/lib/prisma';
import { NextRequest } from 'next/server';

const PAGE_SIZE = 10;

export const GET = async (
  request: NextRequest,
  { params }: { params: { userId: string } }
) => {
  const searchParams = request.nextUrl.searchParams;
  const skip = searchParams.get('skip');

  const allList = await prisma.review.findMany({
    where: {
      userId: params.userId,
    },
  });

  const review = await prisma.review.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    where: {
      userId: params.userId,
    },
    take: PAGE_SIZE, // page size
    skip: Number(skip),
  });

  return Response.json({
    review,
    totalCount: allList.length,
  });
};
