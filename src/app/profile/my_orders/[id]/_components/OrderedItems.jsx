import React from 'react';
import { ShoppingBag, CheckCircle2, ShieldCheck } from 'lucide-react';

const items = [
  {
    id: 1,
    title: 'প্রিমিয়াম প্রফেশনাল ওয়্যারলেস হেডফোন',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=300&auto=format&fit=crop',
    imageBg: 'bg-[#E5AC26]',
    variant: 'কালার: ম্যাট ব্ল্যাক | মডেল: Pro-X200',
    warranty: '৭ দিনের রিটার্ন ওয়ারেন্টি উপলব্ধ',
    warrantyIconType: 'check',
    price: '৳২,৪৫০',
    quantity: 'পরিমাণ: ১টি',
  },
  {
    id: 2,
    title: 'স্মার্ট ফিটনেস ট্র্যাকার ওয়াচ v2',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=300&auto=format&fit=crop',
    imageBg: 'bg-[#EFEFEF]',
    variant: 'স্ট্র্যাপ: সিলিকন ব্ল্যাক | সাইজ: ইউনিভার্সাল',
    warranty: '১ বছরের অফিশিয়াল ওয়ারেন্টি',
    warrantyIconType: 'shield',
    price: '৳১,৮৫০',
    quantity: 'পরিমাণ: ১টি',
  },
  {
    id: 3,
    title: 'সিলিকন প্রোটেক্টিভ কেস ইয়ারবাডস',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=300&auto=format&fit=crop',
    imageBg: 'bg-[#EFEFEF]',
    variant: 'রং: নেভি ব্লু',
    warranty: '',
    warrantyIconType: 'check',
    price: '৳২৫০',
    quantity: 'পরিমাণ: ১টি',
  },
];

export default function OrderedItems() {
  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 bg-[#121212] text-white rounded-3xl border border-gray-800 font-sans shadow-xl my-7">
      {/* Header Section */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-800/80">
        <div className="flex items-center gap-2.5">
          <div className="text-emerald-500">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <h2 className="text-base sm:text-lg font-bold tracking-wide">
            অর্ডারকৃত পণ্যসমূহ <span className="font-semibold text-gray-300">(৩)</span>
          </h2>
        </div>
        <span className="text-xs bg-[#1E2328] text-gray-300 px-3 py-1 rounded-full border border-gray-700/50">
          প্যাকেজ ১/১
        </span>
      </div>

      {/* Items List */}
      <div className="divide-y divide-gray-800/80">
        {items.map((item) => (
          <div
            key={item.id}
            className="py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          >
            {/* Product Image & Info */}
            <div className="flex items-start md:items-center gap-4 flex-1 min-w-0">
              <div
                className={`relative w-20 h-20 sm:w-22 sm:h-22 rounded-2xl overflow-hidden flex-shrink-0 flex items-center justify-center p-2 ${item.imageBg}`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-contain mix-blend-multiply"
                />
              </div>

              <div className="space-y-1 min-w-0">
                <h3 className="font-bold text-sm sm:text-base leading-snug text-gray-100 line-clamp-1">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-400 font-normal">
                  {item.variant}
                </p>

                {item.warranty && (
                  <div className="flex items-center gap-1.5 text-emerald-500 text-xs font-medium pt-0.5">
                    {item.warrantyIconType === 'check' ? (
                      <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
                    ) : (
                      <ShieldCheck className="w-3.5 h-3.5 flex-shrink-0" />
                    )}
                    <span>{item.warranty}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Price & Action Buttons */}
            <div className="flex items-end md:items-center justify-between md:justify-end gap-6 border-t border-gray-800/40 md:border-t-0">
              {/* Price Section */}
              <div className="text-left md:text-right flex-shrink-0">
                <p className="text-base sm:text-lg font-bold text-white tracking-wide">
                  {item.price}
                </p>
                <p className="text-xs text-gray-400 font-normal">
                  {item.quantity}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-row sm:flex-row md:flex-col gap-2 flex-shrink-0">
                <button
                  type="button"
                  className="px-2 md:px-4 text-xs font-medium text-gray-300 bg-[#1A1F26] hover:bg-gray-800 rounded-lg border border-gray-700/60 transition-colors w-full sm:w-auto text-center"
                >
                  রিভিউ লিখুন
                </button>
                <button
                  type="button"
                  className="px-2 md:px-4 text-xs font-medium text-sky-400 bg-[#132235] hover:bg-[#1a2d47] rounded-lg border border-sky-900/50 transition-colors w-full sm:w-auto text-center flex"
                >
                  আবার কিনুন
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
