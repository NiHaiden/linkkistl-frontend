import NextAuth, { Session } from 'next-auth';
import Keycloak from 'next-auth/providers/keycloak';

export const { handlers, signOut, auth, signIn } = NextAuth({
   providers: [Keycloak({
      clientId: process.env.AUTH_KEYCLOAK_ID,
      clientSecret: process.env.AUTH_KEYCLOAK_SECRET,
      issuer: process.env.AUTH_KEYCLOAK_ISSUER,
   }),
   ],
   pages: {
      signIn: '/api/auth/signin',
   },
   callbacks: {
      async jwt({ token, account }) {
         if (account) {
            return {
               ...token,
               accessToken: account.access_token,
               idToken: account.id_token,
               expiresAt: Math.floor(Date.now() / 1000 + account.expires_in),
               refreshToken: account.refresh_token,
            };
         } else if (Date.now() / 1000 < token.expiresAt) {
            return token;
         } else {
            if (!token.refreshToken) throw new Error('Missing refresh token');

            try {
               const response = await fetch(`${process.env.AUTH_KEYCLOAK_ISSUER}/protocol/openid-connect/token`, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                  body: new URLSearchParams({
                     client_id: process.env.AUTH_KEYCLOAK_ID ? process.env.AUTH_KEYCLOAK_ID : '',
                     client_secret: process.env.AUTH_KEYCLOAK_SECRET ? process.env.AUTH_KEYCLOAK_SECRET : '',
                     grant_type: 'refresh_token',
                     refresh_token: token.refreshToken,
                  }),
               });

               const newTokens = await response.json();

               if (!response.ok) throw newTokens;

               return {
                  ...token,
                  accessToken: newTokens.access_token,
                  idToken: newTokens.id_token || token.idToken,
                  expiresAt: Math.floor(Date.now() / 1000 + newTokens.expires_in),
                  refreshToken: newTokens.refresh_token || token.refreshToken,
               };
            } catch (error: unknown) {
               token.error = 'RefreshTokenError';
               return token;
            }
         }
      },
      async session({ session, token }) {
         if (token?.error === 'RefreshTokenError') {
            return {
               ...session,
               error: 'RefreshTokenError',
               user: null,
            };
         }

         if (token?.accessToken) {
            session.accessToken = token.accessToken;
         }

         if (token?.idToken) {
            session.idToken = token.idToken;
         }

         return session;
      },
   },
});