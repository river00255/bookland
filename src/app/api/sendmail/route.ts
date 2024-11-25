import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';

export const POST = async (request: Request) => {
  // const searchParams = request.nextUrl.searchParams;
  // const email = searchParams.get('email') as string;
  const data = await request.json();

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SERVER_HOST as string,
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
  });

  const token = jwt.sign(
    { email: data.email },
    process.env.JWT_SECRET as string,
    {
      expiresIn: '15m',
    }
  );

  const mailOption = {
    from: `"Hello! 👻" <${process.env.EMAIL_FROM}>`,
    to: data.email,
    subject: '[Bookland] Verify your email ✔',
    html: `<div>
      <p>Welcome! ${data.email}</p>
      <p>Into the Bookland</p>
      <button style="padding: 4px 24px; background: #e2e8f0;">
        <a href=${`${request.headers.get('origin')}/account/verify?token=${token}`} target="_blank">Signin</a>
      </button>
    </div>`,
  };

  let result = '';

  try {
    await new Promise((resolve, reject) => {
      transporter.sendMail(mailOption, (err, info) => {
        if (err) {
          reject(err);
          result = err.message;
        } else {
          resolve(info);
          result = info.messageId;
        }
      });
    });
    return Response.json({ message: result });
  } catch (e) {
    console.log(e);
    return new Response(JSON.stringify({ message: 'Fail to send mail.' }), {
      status: 500,
    });
  }
};
