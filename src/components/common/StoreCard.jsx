import Image from 'next/image'
import { Card, CardContent } from "@/components/ui/card"
import { Star, MapPin, Bookmark } from "lucide-react"

const StoreCard = ({shopItem}) => {
  return (
    <Card className="p-0 relative rounded-2xl overflow-hidden shrink-0 w-full shadow-sm">
        <CardContent className="p-0">
            {/* Image Section */}
            <div className="w-full aspect-[16/10] relative">
              <Image
              width={150} 
              height={150}
              src={shopItem?.logo} 
              alt={shopItem?.name}
              className="w-full h-full object-cover" 
              />
              <p className="absolute top-2 left-2 text-[10px] font-bold py-0.5 px-2 rounded-lg bg-green-600 text-white">
                খোলা আছে
              </p>
              <div className="absolute top-2 right-2 p-1.5 rounded-full bg-black/30 backdrop-blur-md cursor-pointer hover:bg-black/50 transition-all hidden">
                <Bookmark className="text-white w-3.5 h-3.5" />
              </div>
            </div>

            {/* Info Section */}
            <div className="p-2.5">
              <p className="text-sm font-bold truncate">{shopItem?.name}</p>
              
              <div className='flex flex-wrap items-center gap-x-2 gap-y-1 mt-1'>
                <p className="flex items-center gap-0.5 text-[10px] font-bold text-amber-500">
                  <Star fill="currentColor" className="w-3 h-3" />
                  4.5
                </p>
                <p className="flex items-center gap-0.5 text-[10px] font-medium text-gray-500">
                  <MapPin className="w-3 h-3" />
                  {shopItem?.location}
                </p>
              </div>
              
              <p className="text-[11px] font-semibold text-gray-600 mt-0.5 truncate">মুদি মাল</p>  
            </div>
        </CardContent>
    </Card>
  )
}

export default StoreCard
