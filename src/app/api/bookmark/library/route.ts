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

    if (prev)
      return new Response(
        JSON.stringify({ message: `Library ${json.code} exist.` }),
        { status: 500 }
      );

    const lib = await prisma.library.create({
      data: json,
    });

    return Response.json(json);
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ message: 'Add Library Failed.' }), {
      status: 500,
    });
  }
};

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const user = searchParams.get('user');
  const code = searchParams.get('code');

  if (!user || !code)
    return new Response(JSON.stringify({ message: `Not found.` }), {
      status: 404,
    });

  const libs = await prisma.library.findMany({
    where: {
      userId: user,
      code: code,
    },
  });

  return Response.json(libs);
};

export const DELETE = async (request: NextRequest) => {
  try {
    const searchParams = request.nextUrl.searchParams;
    const user = searchParams.get('user');
    const code = searchParams.get('code');

    if (!user || !code)
      return new Response(JSON.stringify({ message: `Not found.` }), {
        status: 404,
      });

    await prisma.library.deleteMany({
      where: {
        code,
        userId: user,
      },
    });

    return new Response(
      JSON.stringify({ message: `Library ${code} delete.` }),
      { status: 200 }
    );
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ message: 'Delete Library Failed.' }), {
      status: 500,
    });
  }
};
