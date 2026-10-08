import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";

export default function ShopCard({ shop }) {
  return (
    <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white">
      <div className="p-5">
        <div className="flex items-center gap-4">
          <img
            src={shop.logo}
            alt={shop.name}
            className="h-16 w-16 rounded-full border-2 border-white object-cover"
          />

          <div className="flex-1">
            <h2 className="text-xl font-bold">{shop.name}</h2>

            <div className="mt-1 flex items-center gap-1 text-sm text-white/90">
              <MapPin className="h-4 w-4" />
              {shop.location}
            </div>

            <Badge className="mt-2 bg-white text-indigo-600">
              Seller Active
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
}