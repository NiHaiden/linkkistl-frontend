'use client';

import { useRouter } from 'next/navigation';
import { LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function LoginIconBtn() {
   const router = useRouter();


   return (
      <Button onClick={() => router.push('/login')}
              size={'icon'} variant={'outline'}>
         <LogIn
            className={'h-[1.2rem] w-[1.2rem]'} /></Button>
   );
}