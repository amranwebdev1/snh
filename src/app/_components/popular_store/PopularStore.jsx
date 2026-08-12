import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import {Star,MapPin,Trophy,Bookmark} from "lucide-react"
function PopularStore() {
  return (
    <div className='py-2'>
        <div className='py-3 flex items-center justify-between'>
            <h1 className='text-xl font-bold'>Popular Store</h1>
            <p className='text-blue-500 underline cursor-pointer text-xs'>View all</p>
        </div>
        <div className='flex gap-3 items-center grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5'>
            <Card className="p-0 relative">
                <CardContent className="p-0">
                    <img 
                    alt="image" 
                    src="https://picsum.photos/id/1043/1600/420" className="w-full h-22 object-cover" />
                    <p className="absolute top-1 left-1 text-[10px] font-bold py-1 px-2 rounded-lg bg-green-600 text-white flex items-center gap-0.5">
                      <Trophy className="w-3 h-3" /> Popular
                    </p>
                    <div className="absolute top-1 right-1.5 p-1 rounded-full bg-black/20 backdrop-blur-2xl cursor-pointer">
                      <Bookmark className="text-white" />
                    </div>
                    <div className="p-2">
                      <p className="text-md font-bold">Green corner</p>
                      <div className='flex flex-wrap items-center gap-x-2'>
                        <p className="flex items-center text-xs font-bold gap-1">
                          <Star fill="yellow" className="w-3 h-3" />
                          <span>4.5</span>
                          <span>1.5k reviews</span>
                        </p>
                        <p className="flex items-center text-[10px] font-bold">
                          <MapPin className="w-3 h-3" />
                          0.4 km
                        </p>
                       
                      </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    </div>
  )
}

export default PopularStore;