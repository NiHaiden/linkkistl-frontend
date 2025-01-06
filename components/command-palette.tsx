'use client';

import * as React from 'react';
import { CreditCard, Home, Link, Settings, User } from 'lucide-react';

import {
   CommandDialog,
   CommandEmpty,
   CommandGroup,
   CommandInput,
   CommandItem,
   CommandList,
   CommandSeparator,
   CommandShortcut,
} from '@/components/ui/command';
import { AddLinkDialog } from './add-link-dialog';
import { useRouter } from 'next/navigation';
import { DialogTitle } from '@/components/ui/dialog';

export function CommandPalette() {
   const [open, setOpen] = React.useState(false);
   const [showAddLink, setShowAddLink] = React.useState(false);

   React.useEffect(() => {
      const down = (e: KeyboardEvent) => {
         if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
            e.preventDefault();
            setOpen((open) => !open);
         }
      };

      document.addEventListener('keydown', down);
      return () => document.removeEventListener('keydown', down);
   }, []);

   const handleAddLink = (title: string, url: string) => {
      // Here you would typically save the link to your collection
      console.log('New link added:', { title, url });
      setShowAddLink(false);
   };

   const router = useRouter();

   return (
      <>
         <div
            onClick={() => setOpen(true)}
         >
            Open Command Menu
         </div>
         <CommandDialog open={open} onOpenChange={setOpen}>

            <DialogTitle hidden={true}>Command Dialog</DialogTitle>
            <CommandInput placeholder="Type a command or search..." />
            <CommandList className="max-h-[300px] overflow-y-auto">
               <CommandEmpty className="py-6 text-center text-sm">
                  <p>No results found.</p>
                  <p className="text-muted-foreground mt-2">Try a different search term.</p>
               </CommandEmpty>
               <CommandGroup heading="Suggestions">
                  <CommandItem onSelect={() => setShowAddLink(true)}>
                     <Link className="mr-2 h-4 w-4" />
                     <span>Add New Link</span>
                  </CommandItem>
                  <CommandItem onSelect={() => router.push('/dashboard/links')}>
                     <Link className="mr-2 h-4 w-4" />
                     <span>View All Links</span>
                  </CommandItem>
                  <CommandItem onSelect={() => router.push('/dashboard')}>
                     <Home className="mr-2 h-4 w-4" />
                     <span>Dashboard Home</span>
                  </CommandItem>
               </CommandGroup>
               <CommandSeparator />
               <CommandGroup heading="Settings">
                  <CommandItem>
                     <User className="mr-2 h-4 w-4" />
                     <span>Profile</span>
                     <CommandShortcut>⌘P</CommandShortcut>
                  </CommandItem>
                  <CommandItem>
                     <CreditCard className="mr-2 h-4 w-4" />
                     <span>Billing</span>
                     <CommandShortcut>⌘B</CommandShortcut>
                  </CommandItem>
                  <CommandItem>
                     <Settings className="mr-2 h-4 w-4" />
                     <span>Settings</span>
                     <CommandShortcut>⌘S</CommandShortcut>
                  </CommandItem>
               </CommandGroup>
            </CommandList>
         </CommandDialog>
         <AddLinkDialog
            isOpen={showAddLink}
            onClose={() => setShowAddLink(false)}
            onSubmit={handleAddLink}
         />
      </>
   );
}

