import { NextAuthOptions } from 'next-auth';
import TwitchProvider from 'next-auth/providers/twitch';
import refreshToken from '@/utils/refreshToken';
import ValidToken from '@/utils/ValidToken';
import { login } from '@/utils/community';
import NextAuth from 'next-auth';

export const authOptions: NextAuthOptions = {
  providers: [
    TwitchProvider({
      clientId: process.env.NEXTAUTH_CLIENT_ID as string,
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
        token.refresh_token = account.refresh_token as string;
        try {
          const { data } = await login(token);
          token.role = data.role as string;
          token.totalLikes = data.totalLikes as number;
          token.totalComments = data.totalComments as number;
          token.totalPosts = data.totalPosts as number;
          token.descText = data.descText as string;
        } catch (error) {
          console.error(error);
        }
      }
      return token;
    },
    async session({ session, token }) {
      const getToken = token.accessToken as string;
      const getRefreshToken = token.refresh_token as string;
      const customSession = session as unknown as any;
      customSession.accessToken = token.accessToken;

      //verificar se token é válido
      const isValid = await ValidToken(getToken);
      if (!isValid) {
        const newToken = await refreshToken(getRefreshToken);
        customSession.accessToken = newToken.access_token;
      }
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
