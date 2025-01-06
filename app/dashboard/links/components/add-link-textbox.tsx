import { Textarea } from '@/components/ui/textarea';
import { useCallback, useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import addLink from '@/app/dashboard/links/actions/add-link';
import { LoaderCircle } from 'lucide-react';
import { QueryObserverResult, RefetchOptions } from '@tanstack/query-core';
import { SavedLinkResponse } from '@/lib/types/saved-link-response';
import { useMutation } from '@tanstack/react-query';

export type AddLinkTextboxProps = {
   refetch: (options?: RefetchOptions) => Promise<QueryObserverResult<SavedLinkResponse[] | undefined, Error>>
}


export default function AddLinkTextbox({ refetch }: AddLinkTextboxProps) {

   const [url, setUrl] = useState('');
   const [debouncedUrl] = useDebounce(url, 500);
   const [isProcessing, setIsProcessing] = useState(false);
   const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

   const isValidUrl = useCallback((string: string) => {
      try {
         new URL(string);
         return true;
      } catch {
         return false;
      }
   }, []);


   const mutation = useMutation({
      mutationFn: async () => {
         addLink(debouncedUrl)
            .finally(() => {
               setIsProcessing(false);
            });
         await refetch();
         setUrl('');
      },
   });


   useEffect(() => {
      if (isValidUrl(debouncedUrl)) {
         setIsProcessing(true);
         mutation.mutate();
      } else {
         setResult(null);
      }
   }, [debouncedUrl, isValidUrl]);

   return (
      <div className="space-y-4">
         <Textarea
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste or type a valid URL"
         />
         {isProcessing && (
            <LoaderCircle className="animate-spin" />
         )}
         {result && (
            <p className={result.success ? 'text-green-500' : 'text-red-500'}>
               {result.message}
            </p>
         )}
      </div>
   );
}