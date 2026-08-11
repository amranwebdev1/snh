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
            <div className="relative h-[220px] md:h-[420px] overflow-hidden rounded-3xl">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-black/50" />

              <div className="absolute inset-0 flex items-center">
                <div className="max-w-xl px-6 md:px-12 text-white">
                  <h1 className="text-3xl md:text-6xl font-bold leading-tight">
                    {slide.title}
                  </h1>

                  <p className="mt-4 text-gray-200 md:text-lg">
                    {slide.description}
                  </p>

                  <div className="flex gap-4 mt-8">
                    <button className="px-6 py-3 rounded-xl bg-green-600 hover:bg-green-700 transition">
                      এখনই শপ করুন
                    </button>

                    <button className="px-6 py-3 rounded-xl bg-white text-black hover:bg-gray-100 transition">
                      দোকান যোগ করুন
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious className="left-5" />
      <CarouselNext className="right-5" />

      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => api?.scrollTo(index)}
            className={`transition-all duration-300 ${
              current === index
                ? "w-8 h-2 rounded-full bg-green-500"
                : "w-2 h-2 rounded-full bg-white"
            }`}
          />
        ))}
      </div>
    </Carousel>
  );
}