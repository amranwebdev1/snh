"use client";

import { Minus, Plus } from "lucide-react";

export default function QuantitySelector({
  quantity,
  onIncrease,
  onDecrease,
  max = 0,
  size = "md", // sm | md | lg
}) {
  const outOfStock = max <= 0;

  const sizeClasses = {
    sm: {
      btn: "h-9 w-9",
      icon: "h-4 w-4",
      value: "h-9 min-w-[48px] text-base",
      title: "text-sm",
      info: "text-xs",
      section: "mt-2 p-3 rounded-xl",
    },
    md: {
      btn: "h-11 w-11",
      icon: "h-5 w-5",
      value: "h-11 min-w-[60px] text-lg",
      title: "text-base",
      info: "text-sm",
      section: "mt-3 p-4 rounded-2xl",
    },
    lg: {
      btn: "h-12 w-12",
      icon: "h-6 w-6",
      value: "h-12 min-w-[72px] text-xl",
      title: "text-lg",
      info: "text-base",
      section: "mt-4 p-5 rounded-2xl",
    },
  };

  const ui = sizeClasses[size];

  return (
    <section className={`border border-slate-200 bg-white shadow-sm ${ui.section}`}>
      <div className="mb-3 flex items-center justify-between">
        <h2 className={`${ui.title} font-bold text-slate-900`}>Quantity</h2>

        {!outOfStock && (
          <span className={`${ui.info} text-slate-500`}>
            Max {max}
          </span>
        )}
      </div>

      {outOfStock ? (
        <div className="rounded-xl bg-slate-100 p-3 text-center text-sm font-medium text-slate-500">
          This product is currently unavailable.
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <div className="flex items-center rounded-xl border border-slate-200">
            <button
              onClick={onDecrease}
              disabled={quantity <= 1}
              className={`flex items-center justify-center rounded-l-xl text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:text-slate-300 ${ui.btn}`}
            >
              <Minus className={ui.icon} />
            </button>

            <div
              className={`flex items-center justify-center border-x border-slate-200 font-bold ${ui.value}`}
            >
              {quantity}
            </div>

            <button
              onClick={onIncrease}
              disabled={quantity >= max}
              className={`flex items-center justify-center rounded-r-xl text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:text-slate-300 ${ui.btn}`}
            >
              <Plus className={ui.icon} />
            </button>
          </div>

          <p className={`text-right text-slate-500 ${ui.info}`}>
            Selected: <span className="font-semibold">{quantity}</span>
          </p>
        </div>
      )}
    </section>
  );
}