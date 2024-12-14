import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { LoginBtn } from '@/components/login-btn';

export default async function Home() {
   const session = await auth();

   if (session?.user) {
      redirect('/dashboard');
   }

   return (
      <main className={'w-full h-[100dvh] dark:bg-black grid grid-cols-1 lg:grid-cols-2'}>
         <div className={'bgimg'} />
         <div className={'flex flex-col justify-center items-center'}>
            <div className={'w-2/3 flex-col flex gap-3'}>
               <h1 className={'text-5xl font-bold'}>Welcome to Linkkistl!</h1>
               <div className={'text-xl font-medium'}>Linkkistl is your personal companion so you can keep track of
                  all your
                  links. Never loose that recipe again.
                  <div>Let&#39;s choose an auth provider and get started!</div>
               </div>
               <div>
                  <LoginBtn />
               </div>
            </div>
         </div>
      </main>
   );
}
