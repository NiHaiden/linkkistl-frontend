import SidebarPage from '@/components/sidebar';
import { auth } from '@/auth';
import { SavedLinkResponse } from '@/lib/types/saved-link-response';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import fetchLinks from '@/lib/data-fetching/fetch-links';
import { ChartBarIncreasing, Folders, Tags } from 'lucide-react';
import { redirect } from 'next/navigation';

export default async function Page() {

   const session = await auth();
   
   if (!session?.user) {
      redirect('/');
   }

   const response2 = await fetch('http://localhost:8080/api/v1/links/count', {
      method: 'GET',
      headers: {
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${session?.accessToken}`,
      },
   });

   const data: SavedLinkResponse[] = await fetchLinks();
   const count: string = await response2.text();
   console.log(data);
   return (
      <SidebarPage>
         <div className={'flex flex-col gap-5 w-full'}>
            <div>
               <h1 className={'text-2xl lg:text-4xl font-bold'}>👋 Hi, {session?.user?.name}!</h1>
               <div>This is your dashboard.</div>
            </div>
            <div className={'grid grid-cols-1 lg:grid-cols-3 gap-3 w-full'}>
               <Card>
                  <CardHeader>
                     <CardTitle className={'text-2xl font-bold flex flex-row items-center gap-2'}><ChartBarIncreasing />Link
                        count</CardTitle>
                  </CardHeader>
                  <CardContent>
                     <div className={'text-lg font-semibold'}>{count} Links</div>
                  </CardContent>
               </Card>

               <Card>
                  <CardHeader>
                     <CardTitle className={'text-2xl font-bold flex flex-row items-center gap-2'}><Folders />Folder
                        Count</CardTitle>
                  </CardHeader>
                  <CardContent>
                     <div className={'text-lg font-semibold'}>{count} Folders</div>
                  </CardContent>
               </Card>

               <Card>
                  <CardHeader>
                     <CardTitle className={'text-2xl font-bold flex flex-row items-center gap-2'}><Tags />Tag
                        count</CardTitle>
                  </CardHeader>
                  <CardContent>
                     <div className={'text-lg font-semibold'}>{count} Tags</div>
                  </CardContent>
               </Card>
            </div>
            <hr />
            <div className={'grid grid-cols-1 lg:grid-cols-3 gap-3 w-full'}>
               {data.length >= 1 ? data.map((link) => (
                  <Card key={link.linkId}>
                     <CardHeader>
                        <CardTitle>{link.title}</CardTitle>
                        <CardDescription>{link.description}</CardDescription>
                     </CardHeader>
                     <CardContent>
                        <div>{link.linkUrl}</div>
                     </CardContent>
                  </Card>
               )) : <div>Seems like you haven&#39;t created any links yet!</div>}
            </div>
         </div>
      </SidebarPage>
   );
}