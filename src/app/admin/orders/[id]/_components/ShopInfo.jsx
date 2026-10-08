import {
  Store,
  MapPin,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ShopInfo({ shop }) {
  return (
    <Card className="rounded-3xl border-slate-200 shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Store className="h-5 w-5" />
          Seller / Shop
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="flex items-center gap-3">
          {shop?.logo ? (
            <img
              src={shop.logo}
              alt={shop?.name || "Shop"}
              className="h-12 w-12 rounded-xl object-cover"
            />
          ) : (
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100">
              <Store className="h-5 w-5 text-slate-400" />
            </div>
          )}

          <div className="min-w-0">
            <p className="truncate font-bold text-slate-900">
              {shop?.name || "Unknown Shop"}
            </p>

            {shop?.location && (
              <div className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                <MapPin className="h-3.5 w-3.5" />
                <span className="truncate">
                  {shop.location}
                </span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}