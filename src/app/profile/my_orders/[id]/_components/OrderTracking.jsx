"use client"

import { CheckCircle2, Circle, Calendar } from "lucide-react"

const trackingSteps = [
  {
    title: "Order Placed",
    time: "20 May, 10:30 AM",
    completed: true,
  },
  {
    title: "Packed",
    time: "20 May, 02:45 PM",
    completed: true,
  },
  {
    title: "Shipped",
    time: "21 May, 09:15 AM",
    completed: true,
  },
  {
    title: "Out for Delivery",
    time: "22 May, 11:20 AM",
    completed: true,
  },
  {
    title: "Delivered",
    time: "22 May, 04:25 PM",
    completed: true,
  },
]

export default function OrderTracking() {
  return (
    <section className="rounded-3xl border bg-white p-5 shadow-sm mt-3">
      
     <div className="md:flex md:items-center md:justify-between pb-1 mb-5 border-b">
        <h2 className="text-xl font-bold">অর্ডার নম্বর #BD-9824051</h2>
        <p className="text-xs font-bold text-gray-500 flex items-center gap-1.5"> <Calendar size={14} /> ১২ সেপ্টেম্বর, ২০২৬ | ১০:৩০ AM</p>
     </div>
      
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-lg font-bold">Order Tracking</h2>

        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
          Delivered
        </span>
      </div>
      {/* Mobile */}
      <div className="space-y-5 md:hidden">
        {trackingSteps.map((step, index) => (
          <div key={step.title} className="flex gap-3">
            <div className="flex flex-col items-center">
              {step.completed ? (
                <CheckCircle2 className="h-6 w-6 text-green-500" />
              ) : (
                <Circle className="h-6 w-6 text-slate-300" />
              )}

              {index !== trackingSteps.length - 1 && (
                <div
                  className={`mt-1 h-10 w-[2px] ${
                    step.completed ? "bg-green-500" : "bg-slate-200"
                  }`}
                />
              )}
            </div>

            <div>
              <p className="font-semibold">{step.title}</p>
              <p className="text-sm text-slate-500">{step.time}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop */}
      <div className="hidden md:block">
        <div className="flex items-start justify-between">
          {trackingSteps.map((step, index) => (
            <div
              key={step.title}
              className="relative flex flex-1 flex-col items-center"
            >
              {index !== trackingSteps.length - 1 && (
                <div
                  className={`absolute top-3 left-1/2 h-[3px] w-full ${
                    step.completed ? "bg-green-500" : "bg-slate-200"
                  }`}
                />
              )}

              <div className="relative z-10 bg-white px-1">
                {step.completed ? (
                  <CheckCircle2 className="h-7 w-7 text-green-500" />
                ) : (
                  <Circle className="h-7 w-7 text-slate-300" />
                )}
              </div>

              <p className="mt-3 text-center text-sm font-semibold">
                {step.title}
              </p>

              <p className="mt-1 text-center text-xs text-slate-500">
                {step.time}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}