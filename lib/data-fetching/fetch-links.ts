'use server';


import { auth } from '@/auth';
import { SavedLinkResponse } from '@/lib/types/saved-link-response';

export default async function fetchLinks(): Promise<SavedLinkResponse[] | undefined> {
   const session = await auth();
   console.log(session?.accessToken);

   const response = await fetch(`${process.env.API_SERVER}/api/v1/links`, {
      method: 'GET',
      headers: {
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${session?.accessToken}`,
      },
   });


   if (!response.ok) {
      return undefined;
   }

   return await response.json();
}