import prisma from '@/lib/prisma';
import { NextRequest } from 'next/server';

export const POST = async (request: Request) => {
  try {
    const json = await request.json();

    const prev = await prisma.book.findFirst({
      where: {
        userId: json.userId,
        isbn: json.isbn,
      },
    });

    if (prev)
      return new Response(JSON.stringify({ message: `${json.isbn} exist.` }), {
        status: 500,
      });

    const book = await prisma.book.create({
      data: json,
    });

    return Response.json(json);
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ message: 'Add Book Failed.' }), {
      status: 500,
    });
  }
};

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const user = searchParams.get('user');
  const isbn = searchParams.get('isbn');

  if (!user || !isbn)
    return new Response(JSON.stringify({ message: `Not found.` }), {
      status: 404,
    });

  const book = await prisma.book.findMany({
    where: {
      userId: user,
      isbn,
    },
  });

  return Response.json(book);
};

export const DELETE = async (request: Request) => {
  try {
    const url = new URL(request.url);
    const user = url.searchParams.get('user');
    const isbn = url.searchParams.get('isbn');

    if (!user || !isbn)
      return new Response(JSON.stringify({ message: `Not found.` }), {
        status: 404,
      });

    await prisma.book.deleteMany({
      where: {
        isbn,
        userId: user,
      },
    });

    return new Response(JSON.stringify({ message: `Book ${isbn} delete.` }), {
      status: 200,
    });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ message: 'Delete Book Failed.' }), {
      status: 500,
    });
  }
};
