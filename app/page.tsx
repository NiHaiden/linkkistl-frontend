import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import Navbar from '@/components/navbar';

export default async function Home() {
   const session = await auth();

   if (session?.user) {
      redirect('/dashboard');
   }

   return (
      <div className={'h-full w-full flex-grow flex flex-col items-center justify-center'}>
         <Navbar />
         <h1 className={'text-4xl font-bold'}>Welcome to Linkkistl.</h1>
         Click the button at the top to login.
         Hello there.
      </div>
   );
}
