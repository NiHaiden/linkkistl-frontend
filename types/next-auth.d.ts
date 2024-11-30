// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DefaultSession } from 'next-auth';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import JWT from 'next-auth/jwt';

declare module 'next-auth' {
   interface AdapterUser {
      accessToken;
      string;
      idToken: string;
   }

   /**
    * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
    */
   interface Session {
      error: string;
      accessToken: string;
      idToken: string;
      user: {} & DefaultSession['user'] & AdapterUser[] | null;
   }

   interface Account {
      expires_in: number;
   }

}

declare module 'next-auth/jwt' {
   interface JWT {
      expiresAt: number;
      accessToken: string;
      idToken: string;
      refreshToken: string;
   }
}