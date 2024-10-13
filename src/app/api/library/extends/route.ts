const option = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
};

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const libCode = searchParams.get('libCode');

  const response = await fetch(
    `${process.env.LIB_API_URL}extends/libSrch?authKey=${process.env.LIB_AUTH_KEY}&format=json&pageNo=1&pageSize=10&libCode=${libCode}`,
    option
  );
  if (!response.ok) return new Response('Not found', { status: 404 });
  const data = await response.json();
  return Response.json(data);
};
