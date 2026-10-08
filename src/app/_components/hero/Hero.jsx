"use client";

import React from "react";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const slides = [
  {
    image: "https://picsum.photos/id/1018/1600/420",
    title: "সুনামগঞ্জের সকল ব্যবসা এখন এক প্ল্যাটফর্মে",
    description: "দোকান খুলুন, পণ্য কিনুন, সেবা নিন - সহজেই",
  },
  {
    image: "https://picsum.photos/id/1015/1600/420",
    title: "আজকের সেরা অফার",
    description: "লোকাল ব্যবসার বিশেষ ডিসকাউন্ট",
  },
  {
    image: "https://picsum.photos/id/1043/1600/420",
    title: "আপনার ব্যবসা অনলাইনে আনুন",
    description: "আজই দোকান নিবন্ধন করুন",
  },
];

export default function HeroCarousel() {
  const [api, setApi] = React.useState();
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div className="w-full relative">
      <Carousel
        setApi={setApi}
        className="w-full"
        opts={{
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 5000,
            stopOnInteraction: false,
          }),
        ]}
      >
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem key={index}>
              {/* কম হাইট করা হয়েছে: মোবাইলে h-[120px] এবং বড় স্ক্রিনে h-[240px] */}
              <div className="relative h-[126px] xs:h-[150px] sm:h-[180px] md:h-[220px] lg:h-[240px] overflow-hidden rounded-xl sm:rounded-2xl">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />

                {/* ওভারলে */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />

                {/* কন্টেন্ট সেকশন (কমপ্যাক্ট টেক্সট ও বাটন) */}
                <div className="absolute inset-0 flex items-center">
                  <div className="max-w-xl px-3 sm:px-6 md:px-10 text-white space-y-0.5 sm:space-y-1.5">
                    <h1 className="text-xl sm:text-2xl md:text-2xl font-bold leading-tight line-clamp-2">
                      {slide.title}
                    </h1>

                    <p className="text-[13px] xs:text-sm sm:text-sm text-gray-200 line-clamp-1">
                      {slide.description}
                    </p>

                    {/* ছোট আকারের বাটন */}
                    <div className="flex items-center gap-1.5 sm:gap-2 pt-1">
                      <button className="px-2.5 py-1 sm:px-4 sm:py-1.5 text-[10px] sm:text-xs font-semibold rounded-md bg-green-600 hover:bg-green-700 active:scale-95 transition">
                        এখনই শপ করুন
                      </button>

                      <button className="px-2.5 py-1 sm:px-4 sm:py-1.5 text-[10px] sm:text-xs font-semibold rounded-md bg-white/90 text-slate-900 hover:bg-white active:scale-95 transition">
                        দোকান যোগ করুন
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* নেভিগেশন বোতাম */}
        <CarouselPrevious className="hidden sm:flex left-2 h-7 w-7 border-none bg-black/40 text-white hover:bg-black/70 hover:text-white" />
        <CarouselNext className="hidden sm:flex right-2 h-7 w-7 border-none bg-black/40 text-white hover:bg-black/70 hover:text-white" />

        {/* ডট ইন্ডিকেটর */}
        <div className="absolute bottom-1.5 sm:bottom-3 left-1/2 -translate-x-1/2 flex gap-1 z-10">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={`transition-all duration-300 ${
                current === index
                  ? "w-4 sm:w-6 h-1 rounded-full bg-green-500"
                  : "w-1 h-1 rounded-full bg-white/70 hover:bg-white"
              }`}
            />
          ))}
        </div>
      </Carousel>
    </div>
  );
}
