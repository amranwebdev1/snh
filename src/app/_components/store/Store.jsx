"use client"
import React, { useRef } from 'react'

import {useRouter} from "next/navigation"
import StoreCard from "@/components/common/SmartStoreCard"
import { ChevronLeft, ChevronRight } from "lucide-react" // আইকন ইমপোর্ট করুন
import SeeAllBtn from "@/components/common/SeeAllBtn"


function Store({popularShops}) {
  const router = useRouter();
  const scrollRef = useRef(null);

  // স্ক্রল করার ফাংশন
  const scroll = (offset) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: offset,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className='py-2 relative group'>
        <div className='py-3 flex items-center justify-between'>
            <h1 className='text-sm font-bold text-slate-900 sm:text-lg'>Store</h1>
            {/* See All */}
          <SeeAllBtn href="/shops" />
        </div>

        {/* বাম দিকের বাটন (শুধুমাত্র ডেস্কটপে দেখাবে) */}
        <button 
          onClick={() => scroll(-300)} 
          className='hidden md:flex absolute left-0 top-[60%] z-10 bg-white p-2 rounded-full shadow-lg border hover:bg-gray-100 transition-all'>
          <ChevronLeft size={20} />
        </button>

        {/* মেইন স্ক্রলেবল এরিয়া */}
        <div 
          ref={scrollRef}
          className='w-full flex gap-3 items-center overflow-x-auto pb-4 scrollbar-hide snap-x'
        >
          {popularShops.length > 0 ? popularShops?.map((shop)=>(
          <div key={shop?.id}  className="w-[calc(50%-6px)] md:w-[220px] shrink-0 snap-start">
            <StoreCard
                shop={shop}
                viewMode={"grid"}
                showRating={false}
                showBookmark={false}
                showOpenStatus={false}
                onClick={() =>
  router.push(
    `/shops/${shop?.profiles?.username}/${shop?.slug}`
  )
}
              />
          </div>
          )):(
          <div>nai</div>
          )}
            
        </div>

        {/* ডান দিকের বাটন (শুধুমাত্র ডেস্কটপে দেখাবে) */}
        <button 
          onClick={() => scroll(300)} 
          className='hidden md:flex absolute right-0 top-[60%] z-10 bg-white p-2 rounded-full shadow-lg border hover:bg-gray-100 transition-all'>
          <ChevronRight size={20} />
        </button>
    </div>
  )
}

export default Store
