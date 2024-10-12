const option = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
};

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const region = searchParams.get('region');
  const page = searchParams.get('page');
  // let url = `${process.env.LIB_API_URL}libSrch?authKey=${process.env.LIB_AUTH_KEY}&format=json&pageNo=${page}&pageSize=20`;

  // if (Number(region) > 0)
  //   url = `${process.env.LIB_API_URL}libSrch?authKey=${process.env.LIB_AUTH_KEY}&format=json&pageNo=${page}&pageSize=20&region${region}`;

  // const response = await fetch(url, option);
  const response = await fetch(
    `${process.env.LIB_API_URL}libSrch?authKey=${process.env.LIB_AUTH_KEY}&format=json&pageNo=${page}&pageSize=20&region=${region}`,
    option
  );
  if (!response.ok) return new Response('Not found', { status: 404 });
  const data = await response.json();
  return Response.json(data);
};
