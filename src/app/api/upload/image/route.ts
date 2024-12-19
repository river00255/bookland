import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

const bucket = process.env.SUPABASE_BUCKET as string;

const s3 = new S3Client({
  forcePathStyle: true,
  region: process.env.SUPABASE_REGION as string,
  endpoint: process.env.SUPABASE_ENDPOINT as string,
  credentials: {
    accessKeyId: process.env.SUPABASE_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.SUPABASE_SECRET_ACCESS_KEY as string,
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
      url: `https://${process.env.SUPABASE_PROJECT_ID}.supabase.co/storage/v1/object/public/${bucket}/review/${name}`,
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
