import SidebarPage from '@/components/sidebar';
import fetchLinks from '@/lib/data-fetching/fetch-links';
import { SavedLinkResponse } from '@/lib/types/saved-link-response';

export default async function AllLinks() {

   const links: SavedLinkResponse[] = await fetchLinks();

   return (
      <SidebarPage>
         <div>hello world</div>
      </SidebarPage>
   )
}