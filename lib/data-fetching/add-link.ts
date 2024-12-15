"use server";

import { ErrorReturn } from '@/lib/types/error-return';
import { revalidatePath } from 'next/cache';

export type LinkSaveReturnType = {
   data: {
      id: string;
   } | undefined,
   error: ErrorReturn;
}

export default async function addLink(title: string, url: string): Promise<LinkSaveReturnType> {
   const response = await fetch('/api/v1/links', {
      body: JSON.stringify({ title: title, linkUrl: url }),
      method: 'POST',
      headers: {
         'Content-Type': 'application/json'
      }
   });

   if(!response.ok) {
      return {
         data: undefined,
         error: {
            errorCode: response.status,
            error: response.statusText
         }
      }
   }
   revalidatePath("/dashboard");
}