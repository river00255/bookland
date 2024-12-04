import prisma from '@/lib/prisma';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextRequest } from 'next/server';

export const POST = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const token = searchParams.get('token');

  try {
    if (!token) throw new Error('Invalid token.');
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    const { email, username } = decoded as JwtPayload;
    if (!email) throw new Error('Invalid email.');

    const newUser = await prisma.user.create({
      data: {
        email: email,
        provider: 'email',
        username,
      },
    });

    return Response.json(newUser);
  } catch (e) {
    console.log(e);
    return new Response(JSON.stringify({ message: 'Invalid Email.' }), {
      status: 500,
    });
  }
};
