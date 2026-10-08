"use client"

import { ChevronRight, LoaderCircle } from "lucide-react"

const ProfileMenuItem = ({
  title,
  sub,
  icon: Icon,
  color = "text-slate-500",
  bg = "bg-slate-100",
  badge,
  loading = false,
  onClick,
  disabled,
}) => {
  const isInteractionDisabled = disabled || loading

  return (
    <button
      onClick={onClick}
      disabled={isInteractionDisabled}
      className={`flex w-full items-center justify-between rounded-2xl border ${disabled ? "cursor-not-allowed bg-slate-200 text-slate-400 shadow-none" : "bg-white transition-all hover:bg-slate-50 hover:shadow-sm active:scale-[0.98]"} p-3 disabled:opacity-70`}
    >
      <div className="flex items-center gap-3">
        <div className={`relative rounded-xl p-2 ${bg}`}>
          {loading ? (
            <LoaderCircle className={`h-5 w-5 ${color} animate-spin`} />
          ) : (
            <Icon className={`h-5 w-5 ${color}`} />
          )}

          {!!badge && badge > 0 && (
            <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold text-white">
              {badge}
            </span>
          )}
        </div>

        <div className="text-left">
          <p className={`text-sm font-semibold ${disabled ? "text-gray" : "text-slate-900"}`}>{title}</p>
          {sub && <p className="text-xs text-slate-500">{sub}</p>}
        </div>
      </div>

      {!loading && <ChevronRight className="h-5 w-5 text-slate-400" />}
    </button>
  )
}

export default ProfileMenuItem