import prisma from '@/lib/prisma';

export const GET = async (
  request: Request,
  { params }: { params: { userId: string } }
) => {
  const libs = await prisma.library.findMany({
    where: {
      userId: params.userId,
    },
  });

  return Response.json(libs);
};
