"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Package } from "lucide-react";

export default function ProductGallery({ images = [], thumbnail }) {
  const gallery =
    images.length > 0
      ? images
      : thumbnail
      ? [thumbnail]
      : [];

  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent((prev) => (prev + 1) % gallery.length);
  };

  const prev = () => {
    setCurrent((prev) => (prev - 1 + gallery.length) % gallery.length);
  };

  return (
    <section className="bg-white">
      {/* Main Image */}
      <div className="relative aspect-square overflow-hidden bg-slate-100">
        {gallery.length > 0 ? (
          <Image
            src={gallery[current]}
            alt={`Product ${current + 1}`}
            fill
            priority
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <Package className="h-16 w-16 text-slate-300" />
          </div>
        )}

        {/* Desktop Arrow */}
        {gallery.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow md:flex"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <button
              onClick={next}
              className="absolute right-3 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow md:flex"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}

        {/* Image Counter */}
        {gallery.length > 1 && (
          <div className="absolute bottom-3 right-3 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold text-white">
            {current + 1}/{gallery.length}
          </div>
        )}
      </div>

      {/* Thumbnail */}
      {gallery.length > 1 && (
        <div className="flex gap-2 overflow-x-auto p-3 scrollbar-hide">
          {gallery.map((img, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border-2 transition ${
                current === index
                  ? "border-emerald-600"
                  : "border-slate-200"
              }`}
            >
              <Image
                src={img}
                alt={`Thumb ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </section>
  );
}