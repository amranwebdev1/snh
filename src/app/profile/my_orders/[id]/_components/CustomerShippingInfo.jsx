import React from 'react';
import { User, MapPin, Phone, Mail, Truck, Building, Tag } from 'lucide-react';

export default function CustomerShippingInfo() {
  const customer = {
    name: 'আরিফুল ইসলাম',
    phone: '+880 1712-345678',
    altPhone: '+880 1911-000000',
    email: 'ariful.islam@example.com',
    addressType: 'হোম (Home)', // Home / Office
    fullAddress: 'বাসা #১২, রোড #৫, ব্লক-সি, মিরপুর-১০',
    city: 'ঢাকা',
    postalCode: '১২১৬',
    deliveryNote: 'গেট ঢুকতেই বাম পাশের ৩য় তলার ফ্ল্যাট (৩-এ)। বিকেলে ডেলিভারি দিলে ভালো হয়।',
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-5 sm:p-7 bg-[#121212] text-white rounded-3xl border border-gray-800/80 font-sans shadow-2xl space-y-6 mb-6">
      {/* Section Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-800/80">
        <div className="flex items-center gap-3">
          <div className="text-emerald-500">
            <MapPin className="w-6 h-6 sm:w-7 sm:h-7 stroke-[1.8]" />
          </div>
          <h2 className="text-lg sm:text-xl font-bold tracking-wide">
            শিপিং ও কাস্টমার তথ্য
          </h2>
        </div>
        <span className="flex items-center gap-1.5 px-3 py-1 bg-emerald-950/60 border border-emerald-800/80 rounded-full text-emerald-400 text-xs font-medium">
          <Tag className="w-3.5 h-3.5" />
          <span>{customer.addressType}</span>
        </span>
      </div>

      {/* Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Customer Personal Info */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#171A21] border border-gray-800/60 space-y-4">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2 border-b border-gray-800 pb-2">
            <User className="w-4 h-4 text-emerald-500" />
            গ্রাহকের ব্যক্তিগত তথ্য
          </h3>

          <div className="space-y-3 text-sm">
            <div>
              <span className="text-xs text-gray-400 block">পূর্ণ নাম:</span>
              <p className="font-semibold text-gray-100">{customer.name}</p>
            </div>

            <div>
              <span className="text-xs text-gray-400 block">মোবাইল নম্বর:</span>
              <p className="font-medium text-gray-200 flex items-center gap-1.5 pt-0.5">
                <Phone className="w-3.5 h-3.5 text-emerald-500" />
                {customer.phone}
              </p>
              {customer.altPhone && (
                <p className="text-xs text-gray-400 pl-5 pt-0.5">
                  বিকল্প: {customer.altPhone}
                </p>
              )}
            </div>

            <div>
              <span className="text-xs text-gray-400 block">ইমেইল ঠিকানা:</span>
              <p className="font-medium text-gray-200 flex items-center gap-1.5 pt-0.5">
                <Mail className="w-3.5 h-3.5 text-emerald-500" />
                {customer.email}
              </p>
            </div>
          </div>
        </div>

        {/* Shipping Address Details */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#171A21] border border-gray-800/60 space-y-4">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2 border-b border-gray-800 pb-2">
            <Building className="w-4 h-4 text-emerald-500" />
            ডেলিভারি ঠিকানা
          </h3>

          <div className="space-y-3 text-sm">
            <div>
              <span className="text-xs text-gray-400 block">বিস্তারিত ঠিকানা:</span>
              <p className="font-medium text-gray-200 leading-relaxed pt-0.5">
                {customer.fullAddress}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <div>
                <span className="text-xs text-gray-400 block">শহর/জেলা:</span>
                <p className="font-medium text-gray-200">{customer.city}</p>
              </div>
              <div>
                <span className="text-xs text-gray-400 block">পোস্ট কোড:</span>
                <p className="font-medium text-gray-200">{customer.postalCode}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Special Delivery Note (If available) */}
      {customer.deliveryNote && (
        <div className="p-4 rounded-2xl bg-[#151921] border border-emerald-900/40 text-xs sm:text-sm">
          <span className="font-semibold text-emerald-400 flex items-center gap-1.5 mb-1">
            <Truck className="w-4 h-4" />
            ডেলিভারি নোট / নির্দেশনা:
          </span>
          <p className="text-gray-300 leading-relaxed pl-5">
            {customer.deliveryNote}
          </p>
        </div>
      )}
    </div>
  );
}
