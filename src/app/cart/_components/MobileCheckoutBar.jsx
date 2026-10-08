"use client";
import {useRouter} from "next/navigation"
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function MobileCheckoutBar({ total }) {
  const [showBar, setShowBar] = useState(true);
  const router = useRouter();
  useEffect(() => {
    const target = document.getElementById("cart-summary");
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => setShowBar(!entry.isIntersecting),
      { threshold: 0.2 }
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`fixed bottom-16 left-0 right-0 z-50 px-4 lg:hidden transition-all duration-300 ${
        showBar
          ? "translate-y-0 opacity-100"
          : "translate-y-8 opacity-0 pointer-events-none"
      }`}
    >
      <div className="flex items-center justify-between rounded-2xl border bg-white/95 p-3 shadow-xl backdrop-blur">
        <div>
          <p className="text-xs text-muted-foreground">Total</p>
          <h3 className="text-lg font-bold">৳{total}</h3>
        </div>

        <Button onClick={()=> router.push("/checkout")} className="h-11 rounded-xl px-6">Checkout</Button>
      </div>
    </div>
  );
}