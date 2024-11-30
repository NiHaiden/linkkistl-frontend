'use server';


import { signIn } from '@/auth';

export default async function redirectSignin() {
   await signIn('keycloak');
}