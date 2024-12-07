'use client';

import * as React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface AddLinkDialogProps {
   isOpen: boolean;
   onClose: () => void;
   onSubmit: (title: string, url: string) => void;
}

export function AddLinkDialog({ isOpen, onClose, onSubmit }: AddLinkDialogProps) {
   const [title, setTitle] = React.useState('');
   const [url, setUrl] = React.useState('');
   const { toast } = useToast();
   const hasReadClipboard = React.useRef(false);

   const isValidUrl = (string: string) => {
      try {
         new URL(string);
         return true;
      } catch (_) {
         return false;
      }
   };

   const fetchTitle = async (url: string) => {
      try {
         const response = await fetch(`/api/fetch-title?url=${encodeURIComponent(url)}`);
         const data = await response.json();
         if (data.title) {
            setTitle(data.title);
         }
      } catch (error) {
         console.error('Error fetching page title:', error);
      }
   };

   const readClipboard = async () => {
      if (hasReadClipboard.current) return;

      try {
         const text = await navigator.clipboard.readText();
         if (isValidUrl(text)) {
            setUrl(text);
            fetchTitle(text);
            toast({
               title: 'URL detected',
               description: 'A valid URL was found in your clipboard and has been added.',
            });
         }
      } catch (err) {
         console.error('Failed to read clipboard contents: ', err);
      }

      hasReadClipboard.current = true;
   };

   React.useEffect(() => {
      if (isOpen) {
         readClipboard();
      } else {
         hasReadClipboard.current = false;
      }
   }, [isOpen]);

   React.useEffect(() => {
      if (isValidUrl(url) && !title) {
         fetchTitle(url);
      }
   }, [url, title]);

   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSubmit(title, url);
      setTitle('');
      setUrl('');
      hasReadClipboard.current = false;
   };

   return (
      <Dialog open={isOpen} onOpenChange={onClose}>
         <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
               <DialogTitle>Add New Link</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
               <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                     <Label htmlFor="url" className="text-right">
                        URL
                     </Label>
                     <Input
                        id="url"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        className="col-span-3"
                        type="url"
                        required
                        autoFocus
                     />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                     <Label htmlFor="title" className="text-right">
                        Title
                     </Label>
                     <Input
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="col-span-3"
                        required
                     />
                  </div>
               </div>
               <DialogFooter>
                  <Button type="submit">Add Link</Button>
               </DialogFooter>
            </form>
         </DialogContent>
      </Dialog>
   );
}

