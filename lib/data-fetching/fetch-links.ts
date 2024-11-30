'use server';


import { auth } from '@/auth';

export default async function fetchLinks() {
   const session = await auth();

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