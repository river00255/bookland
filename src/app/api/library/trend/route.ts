const option = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
};

const getTimestamp = () => {
  const date = new Date();
  date.setHours(date.getHours() + 9);
  return date.toISOString().split('T')[0];
};

export const GET = async () => {
  const date = getTimestamp();
  const response = await fetch(
    `${process.env.LIB_API_URL}hotTrend?authKey=${process.env.LIB_AUTH_KEY}&format=json&searchDt=${date}`,
    option
  );
  if (!response.ok) return new Response('Not found', { status: 404 });
  const data = await response.json();
  return Response.json(data);
};
