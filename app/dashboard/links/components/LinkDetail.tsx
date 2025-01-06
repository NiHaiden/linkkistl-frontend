import { useQuery } from '@tanstack/react-query';
import fetchLink from '@/app/dashboard/links/actions/fetch-link';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function LinkDetail() {

   const searchParams = useSearchParams();
   const linkId = searchParams.get('linkId')!;

   const {data, isFetching, refetch} = useQuery({
      queryKey: ['link'],
      queryFn: async () => {
         const link = await fetchLink(searchParams.get('linkId')!);
         return link;
      }
   })

   useEffect(() => {
      refetch();
   }, [linkId, refetch]);

   if(isFetching) return (
      <div>Loading...</div>
   )

   return (
      <div className={'flex flex-col border-l w-full p-3'}>
         <h1 className={"text-4xl font-bold"}>Details for {data?.title}</h1>
         <div>Description: {data?.description}</div>
      </div>
   );
}