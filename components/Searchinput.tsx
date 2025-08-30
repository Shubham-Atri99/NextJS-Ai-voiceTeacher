"use client";
import { usePathname } from 'next/navigation';
import React, { use, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { formUrlQuery, removeKeysFromUrlQuery } from '@jsmastery/utils';

const Searchinput = () => {
    const pathname=usePathname();
    const router=useRouter();
    const searchparms=useSearchParams();
    const query=searchparms.get("topic")||"";
    const [search, setsearch] = useState('');
    
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (search) {
    const newUrl = formUrlQuery({
      params: searchparms.toString(),
      key: "topic",
      value: search,
    });

    router.push(newUrl, { scroll: false });
  } else {
    if (pathname === "/companions") {
      const newUrl = removeKeysFromUrlQuery({
        params: search.toString(),
        keysToRemove: ["topic"],
      });

      router.push(newUrl, { scroll: false });
    }
  }
        }, 500); // Adjust the delay as needed (e.g., 300ms)
  
}, [search]);


  return (
    <div className='  relative border border-black rounded-2xl items-center  flex  gap-2 px-2 py-1'>
        <Image src='/icons/search.svg' alt='search' width={20} height={20} className='object-contain'/>
        <input type='text' value={search} onChange={(e)=>setsearch(e.target.value)} placeholder='Search by topic' className='outline-none  bg-transparent'/>

    </div>
  )
}

export default Searchinput