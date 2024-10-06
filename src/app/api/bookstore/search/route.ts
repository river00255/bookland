const option = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
};

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');
  const type = searchParams.get('type');
  const page = searchParams.get('page');

  const url = `${process.env.ALADIN_API_URL}ItemSearch.aspx?ttbkey=${process.env.ALADIN_AUTH_KEY}&Query=${query}&QueryType=${type}&MaxResults=10&start=${page}&SearchTarget=Book&output=js&Version=20131101`;

  const response = await fetch(url, option);
  if (!response.ok) return new Response('Not found', { status: 404 });
  const data = await response.json();
  return Response.json(data);
};
