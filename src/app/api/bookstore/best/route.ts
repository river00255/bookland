const option = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
};

export const GET = async () => {
  const url = `${process.env.ALADIN_API_URL}ItemList.aspx?ttbkey=${process.env.ALADIN_AUTH_KEY}&QueryType=Bestseller&MaxResults=10&start=1&SearchTarget=Book&output=js&Version=20131101`;
  const response = await fetch(url, option);
  if (!response.ok) return new Response('Not found', { status: 404 });
  const data = await response.json();
  return Response.json(data);
};
