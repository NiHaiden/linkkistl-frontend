import SidebarPage from '@/components/sidebar';
import { auth } from '@/auth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartBarIncreasing, Folders, Tags } from 'lucide-react';
import { redirect } from 'next/navigation';
import { SidebarTrigger } from '@/components/ui/sidebar';
import * as React from 'react';

export default async function Page() {

   const session = await auth();


   if (!session?.user) {
      redirect('/');
   } else {
      await fetch(`${process.env.API_SERVER}/api/v1/users/save-user-id`, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session?.accessToken}`,
         },
      });
   }

   const response2 = await fetch(`${process.env.API_SERVER}/api/v1/links/count`, {
      method: 'GET',
      headers: {
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${session?.accessToken}`,
      },
   });

   const count: string = await response2.text();
   return (
      <SidebarPage>
         <header className="flex p-0 h-fit shrink-0 items-center gap-2">
            <div className="flex flex-1 items-center gap-2">
               <SidebarTrigger />
            </div>
            <div className="ml-auto px-3">
            </div>
         </header>
         <div className={'flex flex-col gap-5 mt-10 w-full'}>
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
         </div>
      </SidebarPage>
   );
}