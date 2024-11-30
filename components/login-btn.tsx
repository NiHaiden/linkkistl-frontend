import { signIn } from '@/auth';
import { Button } from '@/components/ui/button';
import { LockIcon } from 'lucide-react';

export function LoginBtn() {
   return (
      <form
         action={async () => {
            'use server';
            await signIn('keycloak', { redirectTo: '/dashboard' });
         }}
      >
         <Button variant={'default'} className={'text-lg p-5'} type="submit"><LockIcon />Sign in with Keycloak</Button>
      </form>
   );
}