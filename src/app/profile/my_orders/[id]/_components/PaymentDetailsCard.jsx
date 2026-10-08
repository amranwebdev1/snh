import React from 'react';
import { CreditCard, CheckCircle } from 'lucide-react';

export default function PaymentDetailsCard() {
  const paymentDetails = [
    { label: 'পেমেন্ট মেথড:', value: 'বিকাশ (bKash)', iconColor: 'text-pink-500' },
    { label: 'ট্রানজেকশন আইডি:', value: 'TRX-998241028' },
    { label: 'পেমেন্টের সময়:', value: '১২ সেপ, ১০:৩২ AM' },
  ];

  const priceDetails = [
    { label: 'পণ্যের মোট মূল্য', value: '৳৪,৫৫০' },
    { label: 'ডেলিভারি চার্জ', value: '৳৬০' },
    { label: 'কুপন ডিসকাউন্ট (PROMO200)', value: '- ৳২০০', valueColor: 'text-emerald-500' },
    { label: 'ভ্যাট (০%)', value: '৳০' },
  ];

  return (
    <div className="w-full p-5 sm:p-7 bg-[#121212] text-white rounded-3xl border border-gray-800/80 font-sans shadow-2xl mb-6">
      {/* Header Section */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-800/80">
        <div className="flex items-center gap-3">
          <div className="text-sky-500">
            <CreditCard className="w-6 h-6 sm:w-7 sm:h-7 stroke-[1.5]" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
            পেমেন্ট তথ্য
          </h2>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-950/50 border border-emerald-900 rounded-full text-emerald-400 text-xs sm:text-sm font-medium">
          <CheckCircle className="w-4 h-4" />
          <span>পরিশোধিত (Paid)</span>
        </div>
      </div>

      {/* Payment Information List */}
      <div className="py-5 space-y-3.5 border-b border-gray-800/80">
        {paymentDetails.map((detail, index) => (
          <div key={index} className="flex items-center justify-between gap-4 text-sm sm:text-base">
            <span className="text-gray-400 font-normal">
              {detail.label}
            </span>
            <div className="flex items-center gap-2 text-right">
              {detail.iconColor && (
                <div className={`w-2.5 h-2.5 rounded-full bg-current ${detail.iconColor}`}></div>
              )}
              <span className="text-gray-100 font-semibold">
                {detail.value}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Price Details List */}
      <div className="py-5 space-y-3.5 border-b border-gray-800/80">
        {priceDetails.map((detail, index) => (
          <div key={index} className="flex items-center justify-between gap-4 text-sm sm:text-base">
            <span className="text-gray-100 font-normal">
              {detail.label}
            </span>
            <span className={`text-gray-100 font-semibold ${detail.valueColor || ''}`}>
              {detail.value}
            </span>
          </div>
        ))}
      </div>

      {/* Total Amount Paid Section */}
      <div className="pt-5 flex items-center justify-between gap-4 text-lg sm:text-xl">
        <span className="text-gray-100 font-bold">
          সর্বমোট পরিশোধিত
        </span>
        <span className="text-emerald-500 font-bold tracking-tight">
          ৳৪,৪১০
        </span>
      </div>
    </div>
  );
}
