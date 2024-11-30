import Link from 'next/link';
import { Earth } from 'lucide-react';
import { ModeToggle } from '@/components/dark-mode-toggle';
import { auth } from '@/auth';
import LoginIconBtn from '@/components/login-icon-btn';

export default async function Navbar() {
   const session = await auth();

   return (
      <nav className={'w-full h-fit p-4 border-b'}>
         <div className={'flex flex-row justify-between items-center'}>
            <div>
               <div><Link href={'/'} className={'flex flex-row gap-2'}><Earth />Linkkistl</Link></div>
            </div>
            <div className={'flex flex-row gap-2'}>
               {!session?.user && <LoginIconBtn />}
               <ModeToggle />
            </div>
         </div>

      </nav>
   );
}