import prisma from '@/lib/prisma';
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import KakaoProvider from 'next-auth/providers/kakao';
import CredentialsProvider from 'next-auth/providers/credentials';

const authOptions = {
  secret: process.env.AUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID as string,
      clientSecret: process.env.KAKAO_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'Email' },
      },
      async authorize(credentials, req) {
        if (!credentials) throw new Error('SignIn Error');
        const { email } = credentials;

        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        });

        if (user) {
          return { id: user.email, email: user.email };
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }: any) {
      if (!user) throw new Error('SignIn Error');

      const findUser = await prisma.user.findUnique({
        where: {
          email: user.email,
        },
      });

      if (!findUser) {
        const newUser = await prisma.user.create({
          data: {
            email: user.email,
            provider: account.provider,
          },
        });
      }
      // if (account.provider === 'google') {
      // }
      return true;
    },
    // async session({ session, user, token }: any) {
    //   return session;
    // },
  },
  pages: {
    signIn: '../login',
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
