import prisma from '@/lib/prisma';

export const GET = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const id = Number(params.id);
  const review = await prisma.review.findUnique({
    where: {
      id,
    },
  });

  if (!review)
    return new Response(
      JSON.stringify({ message: `Not Found review ${params.id}.` }),
      {
        status: 404,
      }
    );

  return Response.json(review);
};

export const PUT = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const id = Number(params.id);
  const data = await request.json();

  const prevReview = await prisma.review.findUnique({
    where: {
      id,
      userId: data.userId,
    },
  });

  if (!prevReview)
    return new Response(
      JSON.stringify({ message: `Not Found review ${params.id}.` }),
      { status: 404 }
    );

  const updated = await prisma.review.update({
    where: {
      id,
    },
    data,
  });

  return Response.json(updated);
};

export const DELETE = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const id = Number(params.id);
    const data = await request.json();

    const prevReview = await prisma.review.findUnique({
      where: {
        id,
        userId: data.userId,
      },
    });

    if (!prevReview)
      return new Response(
        JSON.stringify({ message: `Not Found review ${params.id}.` }),
        { status: 404 }
      );

    await prisma.review.delete({
      where: {
        id,
      },
    });

    return new Response(id.toString(), { status: 200 });
  } catch (e) {
    return new Response(
      JSON.stringify({ message: `${params.id} review delete failed.` }),
      { status: 500 }
    );
  }
};
