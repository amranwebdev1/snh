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
  { name: "Food", icon: Utensils },
  { name: "Fashion", icon: Shirt },
  { name: "Electronics", icon: Smartphone },
  { name: "Computers", icon: Laptop },
  { name: "Vehicles", icon: Car },
  { name: "Home", icon: Home },
  { name: "Fitness", icon: Dumbbell },
  { name: "Books", icon: BookOpen },
  { name: "Music", icon: Music },
  { name: "Photography", icon: Camera },
]

function Category() {
  return (
    <div className="w-full my-4">
      {/* 1. Header (Carousel এর বাইরে থাকবে, যাতে বাটনগুলোর পজিশনে প্রভাব না পড়ে) */}
      <div className="flex items-center justify-between pb-3">
        <h2 className="text-xl font-bold text-gray-900">Category</h2>
        <p className="cursor-pointer text-sm font-medium text-blue-600 hover:underline">
          View all
        </p>
      </div>

      {/* 2. Carousel Container */}
      <div className="relative px-6"> 
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-1">
            {categories.map((item) => {
              const Icon = item.icon
              return (
                <CarouselItem
                  key={item.name}
                  className=" basis-1/3 sm:basis-1/5 md:basis-1/7 lg:basis-[12.5%]"
                >
                  <Card className=" border border-gray-100 shadow-sm p-1 md:p-3 lg:p-4">
                    <CardContent className="flex items-center justify-center flex-col md:gap-2 text-center p-1 md:p-3 lg:p-4">
                      <Icon  className=" w-6 h-6 md:w-8 md:h-8 text-gray-700" />
                      <p className="text-xs md:text-md font-semibold text-gray-700 truncate w-full">
                        {item.name}
                      </p>
                    </CardContent>
                  </Card>
                </CarouselItem>
              )
            })}
          </CarouselContent>

          {/* 3. Navigation Buttons (এখন এগুলো ঠিক কার্ডের সেন্টারে থাকবে) */}
          <CarouselPrevious className="-left-5 h-8 w-8 bg-white border border-gray-200 shadow-md" />
          <CarouselNext className="-right-5 h-8 w-8 bg-white border border-gray-200 shadow-md" />
        </Carousel>
      </div>
    </div>
  )
}

export default Category
