import { Card, CardContent } from "@/components/ui/card";
import { User, Phone } from "lucide-react";

export default function CustomerInfo({ order }) {
  return (
    <Card className="rounded-3xl">
      <CardContent className="space-y-3 p-5">
        <h3 className="font-bold">Customer</h3>

        <div className="flex items-center gap-2">
          <User className="h-4 w-4 text-slate-500" />
          {order.addresses?.full_name}
        </div>

        <div className="flex items-center gap-2">
          <Phone className="h-4 w-4 text-slate-500" />
          {order.addresses?.phone}
        </div>
      </CardContent>
    </Card>
  );
}