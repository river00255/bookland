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

    if (email) {
      const findUser = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (!findUser) {
        const newUser = await prisma.user.create({
          data: {
            email,
            provider: 'email',
          },
        });
        return Response.json(newUser);
      }
    }

    return Response.json(decoded);
  } catch (e) {
    console.log(e);
    return new Response(JSON.stringify({ message: 'Invalid token.' }), {
      status: 500,
    });
  }
};
