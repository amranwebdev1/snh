import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import {
  Utensils,
  Shirt,
  Smartphone,
  Laptop,
  Car,
  Home,
  Dumbbell,
  BookOpen,
  Music,
  Camera,
} from "lucide-react"

const categories = [
  {
    name: "Food",
    icon: Utensils,
  },
  {
    name: "Fashion",
    icon: Shirt,
  },
  {
    name: "Electronics",
    icon: Smartphone,
  },
  {
    name: "Computers",
    icon: Laptop,
  },
  {
    name: "Vehicles",
    icon: Car,
  },
  {
    name: "Home",
    icon: Home,
  },
  {
    name: "Fitness",
    icon: Dumbbell,
  },
  {
    name: "Books",
    icon: BookOpen,
  },
  {
    name: "Music",
    icon: Music,
  },
  {
    name: "Photography",
    icon: Camera,
  },
]
function Category() {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full"
    >
      {/* Header */}
      <div className="flex items-center justify-between py-3">
        <h1 className="text-xl font-bold">
          Category
        </h1>

        <p className="cursor-pointer text-md text-blue-500 underline">
          View all
        </p>
      </div>

      {/* Categories */}
      <CarouselContent className="-ml-3">
       {categories?.map((item)=> {
        let Icon = item?.icon
          return <CarouselItem
            key={item?.length}
            className="pl-3 basis-1/5 md:basis-1/5 lg:basis-1/8"
          >
            <Card>
              <CardContent className="flex aspect-square items-center justify-center p-2 flex-col">
                <Icon />
                <p>{item?.name}</p>
              </CardContent>
            </Card>
          </CarouselItem>
})}
          
      
      </CarouselContent>

      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}

export default Category