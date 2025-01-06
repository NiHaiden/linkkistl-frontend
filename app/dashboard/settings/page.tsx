import SidebarPage from '@/components/sidebar';
import { ModeToggle } from '@/components/dark-mode-toggle';

export default function Settings() {
   return (
      <SidebarPage>
         <main className={'w-full h-full p-3 flex flex-col'}>
            <h1 className={'text-3xl font-bold'}>Settings</h1>
            <ModeToggle />
         </main>
      </SidebarPage>
   );
}