import prisma from '@/lib/prisma';
import { NextRequest } from 'next/server';

export const POST = async (request: Request) => {
  try {
    const json = await request.json();

    const prev = await prisma.library.findFirst({
      where: {
        userId: json.userId,
        code: json.code,
      },
    });

    if (prev) return new Response(`${json.code} exist.`, { status: 500 });

    const lib = await prisma.library.create({
      data: json,
    });

    return Response.json(json);
  } catch (e) {
    console.error(e);
    return new Response('Add Library Failed.', { status: 500 });
  }
};

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const user = searchParams.get('user');
  const code = searchParams.get('code');

  if (!user || !code) return new Response(`Not found.`, { status: 404 });

  const libs = await prisma.library.findMany({
    where: {
      userId: user,
      code: code,
    },
  });

  return Response.json(libs);
};

export const DELETE = async (request: Request) => {
  try {
    const url = new URL(request.url);
    const user = url.searchParams.get('user');
    const code = url.searchParams.get('code');

    if (!user || !code) return new Response(`Not found.`, { status: 404 });

    await prisma.library.deleteMany({
      where: {
        code,
        userId: user,
      },
    });

    return new Response(`Lib ${code} delete.`, { status: 200 });
  } catch (e) {
    console.error(e);
    return new Response('Delete Library Failed.', { status: 500 });
  }
};
