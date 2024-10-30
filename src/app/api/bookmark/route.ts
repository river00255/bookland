import prisma from '@/lib/prisma';
import { NextRequest } from 'next/server';

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const email = searchParams.get('user');

  if (!email) return new Response(`Not found.`, { status: 404 });

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) return new Response(`Not found user : ${email}.`, { status: 404 });

  const books = await prisma.book.findMany({
    where: {
      userId: user.email,
    },
  });

  const librarys = await prisma.library.findMany({
    where: {
      userId: user.email,
    },
  });

  return Response.json({
    user,
    bookmark: { book: books, lib: librarys },
  });
};
