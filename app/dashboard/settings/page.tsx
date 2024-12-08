import SidebarPage from '@/components/sidebar';
import { ModeToggle } from '@/components/dark-mode-toggle';

export default function Settings() {
   return (
      <SidebarPage>
         <div>Settings</div>
         <ModeToggle/>
      </SidebarPage>
   );
}