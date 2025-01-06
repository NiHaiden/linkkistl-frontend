'use client';

import SidebarPage from '@/components/sidebar';
import fetchLinks from '@/lib/data-fetching/fetch-links';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import * as React from 'react';
import { Link } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import LinkDetail from '@/app/dashboard/links/components/LinkDetail';
import AddLinkTextbox from '@/app/dashboard/links/components/add-link-textbox';

export default function AllLinks() {
   const router = useRouter();
   const searchParams = useSearchParams();
   const { data, refetch, isPending } = useQuery({
      queryKey: ['links'],
      queryFn: async () => {
         return await fetchLinks();
      },
   });

   if (isPending) return (
      <SidebarPage>
         <div>Loading...</div>
      </SidebarPage>
   );

   const isSelected = (linkId: string) => {
      return searchParams.get('linkId') === linkId;
   };


   return (
      <SidebarPage>
         <main className={'flex flex-col gap-5 w-full'}>
            <h1 className={'text-4xl font-bold flex flex-row gap-2 items-center'}><Link size={36} /> All Links</h1>
            <AddLinkTextbox refetch={refetch} />
            <div className={'flex gap-5'}>

               <div className={'grid grid-cols-1 lg:grid-cols-1 gap-3 w-2/5'}>

                  {data!.length >= 1 ? data!.map((link) => (
                     <button className={'cursor-pointer'} onClick={(e) => {
                        e.preventDefault();
                        console.log(link.linkId);
                        router.replace(`/dashboard/links?linkId=${link.linkId}`);
                     }} key={link.linkId}>
                        <Card key={link.linkId}
                              className={`${isSelected(link.linkId!) ? 'border-blue-400' : ''}`}>

                           <CardHeader>
                              <CardTitle>{link.title}</CardTitle>
                              <CardDescription>{link.description}</CardDescription>
                           </CardHeader>
                           <CardContent>
                              <div>{link.linkUrl}</div>
                           </CardContent>
                        </Card>
                     </button>
                  )) : <div>Seems like you haven&#39;t created any links yet!</div>}
               </div>
               <div>
                  <LinkDetail />
               </div>
            </div>

         </main>
      </SidebarPage>
   );
}