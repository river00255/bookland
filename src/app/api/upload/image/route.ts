import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

const bucket = process.env.AWS_BUCKET as string;

const s3 = new S3Client({
  region: process.env.AWS_REGION as string,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
});

export const POST = async (request: Request) => {
  try {
    const formData = await request.formData();
    const files = formData.getAll('file') as File[];

    const buffer = Buffer.from(await files[0].arrayBuffer());
    const name = crypto.randomUUID();
    const type = files[0].type;

    const uploadParams = {
      Bucket: bucket,
      Key: `review/${name}`,
      Body: buffer,
      ContentType: type,
    };

    await s3.send(new PutObjectCommand(uploadParams));

    return Response.json({
      url: `https://${bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/review/${name}`,
      name,
    });
  } catch (e) {
    console.log(e);
    return new Response(
      JSON.stringify({ message: 'Failed to upload image.' }),
      {
        status: 500,
      }
    );
  }
};
