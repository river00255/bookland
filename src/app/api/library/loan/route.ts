import { NextRequest } from 'next/server';

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const libCode = searchParams.get('libCode');
  const isbn = searchParams.get('isbn');

  const response = await fetch(
    `${process.env.LIB_API_URL}bookExist?authKey=${process.env.LIB_AUTH_KEY}&format=json&libCode=${libCode}&isbn13=${isbn}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  if (!response.ok) return new Response('Not found', { status: 404 });
  const data = await response.json();
  return Response.json(data);
};
