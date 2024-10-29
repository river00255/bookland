import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions = {
  secret: process.env.AUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  // callbacks: {
  // async signIn({ user, account, profile, email, credentials }: any) {
  //   if (account.provider === 'google') {
  //     console.log(credentials);
  //   }
  //   return true;
  // },
  // async session({ session, user, token }) {
  //   return session;
  // },
  // },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
