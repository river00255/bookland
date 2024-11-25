import prisma from '@/lib/prisma';

export const GET = async (
  request: Request,
  { params }: { params: { isbn: string } }
) => {
  const review = await prisma.review.findMany({
    where: {
      isbn: params.isbn,
      public: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 8,
  });

  if (!review)
    return new Response(
      JSON.stringify({ message: `Not Found review ${params.isbn}.` }),
      {
        status: 404,
      }
    );

  return Response.json(review);
};
