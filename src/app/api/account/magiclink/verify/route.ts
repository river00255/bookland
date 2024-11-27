import prisma from '@/lib/prisma';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextRequest } from 'next/server';

export const POST = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const token = searchParams.get('token') as string;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    const { email } = decoded as JwtPayload;
    if (!email) throw new Error('Invalid email.');

    const findUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!findUser) {
      return new Response(JSON.stringify({ message: 'Fail to verify.' }), {
        status: 400,
      });
    }

    return Response.json(findUser);
  } catch (e) {
    console.log(e);
    return new Response(JSON.stringify({ message: 'Invalid token.' }), {
      status: 500,
    });
  }
};
