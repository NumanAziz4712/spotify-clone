import NextAuth from 'next-auth';
import SpotifyProvider from 'next-auth/providers/spotify';

import spotifyApi, { LOGIN_URL } from '../../../lib/spotify';

// refresh the access token
async function refreshAccessToken(token) {
  try {
    spotifyApi.setAccessToken(token.accessToken);
    spotifyApi.setRefreshToken(token.refreshToken);
    const { body: refreshedToken } = await spotifyApi.refreshAccessToken();

    return {
      ...token,
      accessToken: refreshedToken.access_token,
      // 1 hour as 3600 returns from spotify api
      accessTokenExpires: Date.now + refreshedToken.expires_in * 1000,
      refreshToken: refreshedToken.refresh_token ?? token.refreshToken,
    };
  } catch (error) {
    // if there is an error, return it. we also return the token
    console.log(error);
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
}

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
      authorization: LOGIN_URL,
    }),
    // ...add more providers here
  ],
  secret: process.env.JWT_SECRET,
  // for  custom login page
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async({ token, account, user }) {
      // if its first time to sign, it returns token var and account var
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          // user name
          username: account.providerAccountId,
          // this is an hour ahead
          accessTokenExpires: account.expires_at * 1000,
        };
      }
      // we are checking if the token is expired
      // return prev token if the access token has not expired yet
      // it check it against the current time
      // this return the
      if (Date.now() < token.accessTokenExpires) {
        return token;
      }

      // if the access token expires, we need to refresh it..
      console.log('ACCESS TOKEN HAS EXPIRED, REFRESHING..');
      return refreshAccessToken(token);
    },

    async session({ session, token }) {
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      session.user.username = token.username;
      return session;
    },
  },
});
