export const GET = async (request: Request, { params }: { params: { isbn: string } }) => {
  const isbn = params.isbn;

  const response = await fetch(
    `${process.env.ALADIN_API_URL}ItemLookUp.aspx?ttbkey=${process.env.ALADIN_AUTH_KEY}&itemIdType=ISBN&ItemId=${isbn}&Cover=big&output=js&Version=20131101&OptResult=ebookList,reviewList,cardReviewImgList,ratingInfo`,
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
