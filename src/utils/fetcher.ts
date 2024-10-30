type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

const mutate = async (
  method: Method,
  url: string,
  body: { [key: string]: any }
) => {
  const response = await fetch(url, {
    method,
    body: JSON.stringify(body),
  });
  if (!response.ok) throw new Error();
  return await response.json();
};

export const fetcher = async (
  method: Method,
  url: string,
  body?: { [key: string]: any }
) => {
  try {
    if (method !== 'GET' && body) mutate(method, url, body);

    const response = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) throw new Error();
    return await response.json();
  } catch (e) {
    console.error(e);
  }
};
