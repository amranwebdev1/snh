"use client";

export default function PaymentSelection({
  paymentMethod,
  setPaymentMethod,
}) {
  const paymentOptions = [
    {
      id: "cod",
      title: "১. ক্যাশ অন ডেলিভারি (Cash On Delivery)",
      description:
        "পণ্য হাতে পাওয়ার পর সম্পূর্ণ টাকা রাইডারকে পরিশোধ করবেন। কোনো অগ্রিম পেমেন্ট লাগবে না।",
      badge: "বর্তমানে চালু",
      badgeColor:
        "bg-emerald-100 text-emerald-700 border-emerald-200",
      enabled: true,
    },
    {
      id: "partial",
      title: "২. শুধুমাত্র ডেলিভারি চার্জ অগ্রিম (Partial Advance)",
      description:
        "শুধুমাত্র ডেলিভারি চার্জ অগ্রিম বিকাশ/নগদে পরিশোধ করার সুবিধা।",
      badge: "শীঘ্রই আসছে",
      badgeColor:
        "bg-slate-100 text-slate-500 border-slate-200",
      enabled: false,
    },
    {
      id: "full_online",
      title: "৩. সম্পূর্ণ অনলাইন পেমেন্ট (Full Online Payment)",
      description:
        "পণ্যের মূল্য ও ডেলিভারি চার্জ অনলাইনে বিকাশ/নগদ/কার্ডের মাধ্যমে পরিশোধ করার সুবিধা।",
      badge: "শীঘ্রই আসছে",
      badgeColor:
        "bg-slate-100 text-slate-500 border-slate-200",
      enabled: false,
    },
  ];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 font-sans text-slate-900">
      {/* Header */}
      <div className="mb-4 flex items-center gap-3 border-b border-slate-200 pb-3">
        <div className="flex h-6 w-6 items-center justify-center rounded-full border border-emerald-200 bg-emerald-100 text-xs font-bold text-emerald-700">
          ২
        </div>

        <h2 className="text-lg font-bold tracking-wide text-slate-900">
          পেমেন্ট পদ্ধতি নির্বাচন করুন
        </h2>
      </div>

      {/* Payment Options */}
      <div className="space-y-3">
        {paymentOptions.map((option) => {
          const isSelected =
            paymentMethod === option.id;

          const isDisabled =
            !option.enabled;

          return (
            <label
              key={option.id}
              onClick={() => {
                if (isDisabled) {
                  return;
                }

                setPaymentMethod(option.id);
              }}
              aria-disabled={isDisabled}
              className={`relative block rounded-xl border p-4 transition-all ${
                isDisabled
                  ? "cursor-not-allowed border-slate-200 bg-slate-50 opacity-65"
                  : isSelected
                  ? "cursor-pointer border-emerald-500 bg-emerald-50 shadow-sm"
                  : "cursor-pointer border-slate-200 bg-white hover:border-slate-300"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                {/* Radio + Title */}
                <div className="flex flex-1 items-start gap-3">
                  <div className="mt-1 shrink-0">
                    <div
                      className={`flex h-5 w-5 items-center justify-center rounded-full border transition-all ${
                        isDisabled
                          ? "border-slate-300 bg-slate-100"
                          : isSelected
                          ? "border-emerald-500 bg-emerald-500 text-white"
                          : "border-slate-300 bg-transparent"
                      }`}
                    >
                      {isSelected &&
                        !isDisabled && (
                          <div className="h-2 w-2 rounded-full bg-white" />
                        )}
                    </div>
                  </div>

                  <div>
                    <h3
                      className={`text-sm font-semibold leading-snug ${
                        isDisabled
                          ? "text-slate-500"
                          : "text-slate-900"
                      }`}
                    >
                      {option.title}
                    </h3>
                  </div>
                </div>

                {/* Badge */}
                <span
                  className={`shrink-0 rounded-md border px-2.5 py-1 text-center text-xs font-medium ${option.badgeColor}`}
                >
                  {option.badge}
                </span>
              </div>

              {/* Description */}
              <p
                className={`mt-2 pl-8 text-xs leading-relaxed ${
                  isDisabled
                    ? "text-slate-400"
                    : "text-slate-500"
                }`}
              >
                {option.description}
              </p>

              {/* Coming Soon */}
              {isDisabled && (
                <div className="mt-3 ml-8 inline-flex rounded-md bg-slate-100 px-2 py-1 text-[11px] font-medium text-slate-500">
                  এই পেমেন্ট পদ্ধতি বর্তমানে চালু নেই
                </div>
              )}
            </label>
          );
        })}
      </div>
    </div>
  );
}