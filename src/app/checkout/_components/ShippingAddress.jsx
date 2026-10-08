"use client";

import { useState,useEffect } from "react";
import {
  MapPin,
  Plus,
  Home,
  Briefcase,
  Building,
  Check,
  Phone,
  PenSquare,
  MessageSquareText,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import AddressSheet from "@/components/common/AddressSheet";

import { updateDefaultAddress } from "@/lib/address/updateDefaultAddress";


import {getDeliveryCharge} from "@/lib/actions/getDeliveryCharge"

export default function ShippingAddress({
  addresses,
  setAddresses,
  selectedAddressId,
  setSelectedAddressId,
  customerNote,
  setCustomerNote,
  onDeliveryFeeChange,
}) {
  const [openSheet, setOpenSheet] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

  const typeIcon = {
    Home,
    Office: Briefcase,
    Other: Building,
  };




useEffect(() => {
  if (!selectedAddressId) {
    onDeliveryFeeChange?.(0);
    return;
  }

  let cancelled = false;

  const loadDeliveryCharge = async () => {
    try {
      const delivery = await getDeliveryCharge(
        selectedAddressId
      );

      if (cancelled) {
        return;
      }

      const charge = Number(
        delivery?.deliveryCharge || 0
      );

      onDeliveryFeeChange?.(charge);
    } catch (error) {
      console.error(
        "Initial Delivery Charge Error:",
        error
      );

      if (!cancelled) {
        onDeliveryFeeChange?.(0);
      }
    }
  };

  loadDeliveryCharge();

  return () => {
    cancelled = true;
  };
}, [
  selectedAddressId,
  onDeliveryFeeChange,
]);




  const handleSelectAddress = async (addressId) => {
  try {
    setSelectedAddressId(addressId);

    setAddresses((prev) =>
      prev.map((item) => ({
        ...item,
        is_default: item.id === addressId,
      }))
    );

    const delivery =
      await getDeliveryCharge(addressId);

    const charge = Number(
      delivery?.deliveryCharge || 0
    );

    onDeliveryFeeChange?.(charge);

    await updateDefaultAddress(addressId);
  } catch (error) {
    console.error(
      "Select Address Error:",
      error
    );

    onDeliveryFeeChange?.(0);
  }
};

  const handleSave = (address) => {
    setAddresses((prev) => {
      const exists = prev.find((a) => a.id === address.id);

      if (exists) {
        return prev.map((a) =>
          a.id === address.id ? address : a
        );
      }

      return [address, ...prev];
    });

    setSelectedAddressId(address.id);
    setEditingAddress(null);
  };

  return (
    <section className="rounded-3xl border bg-white p-4 shadow-sm sm:p-5">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between border-b pb-3">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-700">
            1
          </div>

          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Shipping Address
            </h2>

            <p className="text-xs text-slate-500">
              ডেলিভারির জন্য একটি ঠিকানা নির্বাচন করুন।
            </p>
          </div>
        </div>

        <Button
          size="sm"
          className="gap-1"
          onClick={() => {
            setEditingAddress(null);
            setOpenSheet(true);
          }}
        >
          <Plus className="h-4 w-4" />
          Add New
        </Button>
      </div>

      {/* Empty State */}
      {addresses.length === 0 && (
        <div className="rounded-2xl border border-dashed p-8 text-center">
          <MapPin className="mx-auto mb-3 h-10 w-10 text-slate-300" />

          <h3 className="font-semibold text-slate-900">
            কোনো ঠিকানা নেই
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            আপনার প্রথম ডেলিভারি ঠিকানা যোগ করুন।
          </p>

          <Button
            className="mt-4"
            onClick={() => {
              setEditingAddress(null);
              setOpenSheet(true);
            }}
          >
            Add Address
          </Button>
        </div>
      )}

      {/* Address List */}
      <div className="space-y-3">
        {addresses.map((addr) => {
          const Icon = typeIcon[addr.label] || Home;
          const selected = selectedAddressId === addr.id;

          return (
            <div
              key={addr.id}
              role="button"
              tabIndex={0}
              onClick={() => handleSelectAddress(addr.id)}
              className={`cursor-pointer rounded-2xl border p-4 transition ${
                selected
                  ? "border-emerald-500 bg-emerald-50"
                  : "border-slate-200 hover:border-slate-300"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex flex-1 gap-3">
                  <div
                    className={`mt-1 flex h-5 w-5 items-center justify-center rounded-full border ${
                      selected
                        ? "border-emerald-500 bg-emerald-500 text-white"
                        : "border-slate-300"
                    }`}
                  >
                    {selected && (
                      <Check className="h-3 w-3" />
                    )}
                  </div>

                  <div className="flex-1 space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-semibold text-slate-900">
                        {addr.full_name}
                      </span>

                      <span className="flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-[11px] text-slate-600">
                        <Icon className="h-3 w-3" />
                        {addr.label}
                      </span>

                      {addr.is_default && (
                        <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] text-emerald-700">
                          Default
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditingAddress(addr);
                    setOpenSheet(true);
                  }}
                  className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                >
                  <PenSquare className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-2 space-y-1 pl-8">
                <div className="flex items-center gap-1 text-sm text-slate-500">
                  <Phone className="h-4 w-4" />
                  {addr.phone}
                </div>

                <div className="flex items-start gap-1 text-sm text-slate-500">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0" />

                  <p>
                    {addr.address_line}, {addr.upazila}, {addr.district},{" "}
                    {addr.division}
                    {addr.landmark && ` · ${addr.landmark}`}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Customer Note */}
      {addresses.length > 0 && (
        <div className="mt-5 border-t pt-4">
          <div className="mb-2 flex items-center gap-2">
            <MessageSquareText className="h-4 w-4 text-slate-500" />

            <h3 className="text-sm font-semibold text-slate-800">
              Delivery Note (Optional)
            </h3>
          </div>

          <textarea
            rows={3}
            value={customerNote}
            onChange={(e) => setCustomerNote(e.target.value)}
            placeholder="যেমন: গেটে কল করবেন, ৩য় তলা..."
            className="w-full rounded-xl border border-slate-200 p-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
          />
        </div>
      )}

      {/* Address Sheet */}
      <AddressSheet
        open={openSheet}
        onOpenChange={(value) => {
          setOpenSheet(value);

          if (!value) setEditingAddress(null);
        }}
        initialData={editingAddress}
        onSave={handleSave}
      />
    </section>
  );
}