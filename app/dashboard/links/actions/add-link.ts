'use server';

import { ErrorReturn } from '@/lib/types/error-return';
import { auth } from '@/auth';

export type LinkSaveReturnType = {
   data: {
      id: string;
   } | undefined,
   error: ErrorReturn;
}

export default async function addLink(url: string): Promise<LinkSaveReturnType> {

   const titleFetchResponse = await fetch(url);
   const html = await titleFetchResponse.text();
   const match = html.match(/<title>(.*?)<\/title>/);
   const title = match ? match[1] : '';
   const session = await auth();
   console.log('calling the add function');


   const response = await fetch(`${process.env.API_SERVER}/api/v1/links`, {
      body: JSON.stringify({ title: title, linkUrl: url }),
      method: 'POST',
      headers: {
         'Authorization': `Bearer ${session?.accessToken}`,
         'Content-Type': 'application/json',
      },
   });

   if (!response.ok) {
      console.log(response.status);
      console.log('error');
      return {
         data: undefined,
         error: {
            errorCode: response.status,
            error: response.statusText,
         },
      };
   }
   return await response.json();
}