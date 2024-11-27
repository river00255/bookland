import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import prisma from '@/lib/prisma';

export const POST = async (request: Request) => {
  const data = await request.json();

  const findUser = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (findUser)
    return new Response(
      JSON.stringify({ message: '이미 가입된 계정입니다.' }),
      {
        status: 400,
      }
    );

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SERVER_HOST as string,
    port: Number(process.env.EMAIL_SERVER_PORT as string),
    secure: true,
    auth: {
      user: process.env.EMAIL_SERVER_USER as string,
      pass: process.env.EMAIL_SERVER_PASSWORD as string,
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
    subject: '[Bookland] Register your email ✔',
    html: `<div>
      <p>Welcome!</p>
      <p>${data.email} 🥳</p>
      <p>Into the Bookland.</p>
      <button style="padding: 4px 32px; background: #e2e8f0; border: none;">
        <a href=${`${request.headers.get('origin')}/account/register?token=${token}`} target="_blank" style="text-decoration: none; color: #444;">Register</a>
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
          // result = info.messageId;
          result = '가입 메일이 전송되었습니다. 메일함을 확인해주세요.';
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
