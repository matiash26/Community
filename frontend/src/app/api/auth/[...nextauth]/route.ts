import { NextAuthOptions } from 'next-auth';
import TwitchProvider from 'next-auth/providers/twitch';
import NextAuth from 'next-auth';
import { login } from '@/utils/community';

export const authOptions: NextAuthOptions = {
  providers: [
    TwitchProvider({
      clientId: process.env.TWITCH_CLIENT_ID as string,
      clientSecret: process.env.NEXTAUTH_SECRET as string,
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token as string;
        try {
          const { data } = await login(token);
          token.role = data[0].role as string;
          token.totalLikes = data[0].totalLikes as number;
          token.totalComments = data[0].totalComments as number;
          token.totalPosts = data[0].totalPosts as number;
          token.descText = data[0].descText as string;
        } catch (error) {
          console.error(error);
        }
      }
      return token;
    },
    async session({ session, token }) {
      const customSession = session as unknown as any;
      customSession.accessToken = token.accessToken;
      customSession.user.role = token.role;
      customSession.user.totalLikes = token.totalLikes;
      customSession.user.totalComments = token.totalComments;
      customSession.user.totalPosts = token.totalPosts;
      customSession.user.descText = token.descText;
      return customSession;
    },
  },
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
