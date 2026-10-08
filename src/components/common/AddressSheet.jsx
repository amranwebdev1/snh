"use client";

import { useEffect, useMemo, useState } from "react";
import { updateAddress } from "@/lib/address/updateAddress";
import { Home, Briefcase, Building } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { LOCATION_DATA } from "@/lib/address/locationData";
import { addAddress } from "@/lib/address/addAddress";

const ADDRESS_TYPES = [
  { name: "Home", label: "বাসা", icon: Home },
  { name: "Office", label: "অফিস", icon: Briefcase },
  { name: "Other", label: "অন্যান্য", icon: Building },
];

const createEmptyForm = () => ({
  fullName: "",
  phone: "",
  division: "",
  district: "",
  upazila: "",
  postOffice: "",
  addressLine: "",
  landmark: "",
  type: "Home",
});

export default function AddressSheet({
  open,
  onOpenChange,
  onSave,
  initialData = null,
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState(createEmptyForm);

  const isEditing = !!initialData;

  useEffect(() => {
    if (!open) return;

    setError("");

    if (initialData) {
      setForm({
        fullName: initialData.full_name || "",
        phone: initialData.phone || "",
        division: initialData.division || "",
        district: initialData.district || "",
        upazila: initialData.upazila || "",
        postOffice: initialData.post_office || "",
        addressLine: initialData.address_line || "",
        landmark: initialData.landmark || "",
        type: initialData.label || "Home",
      });
    } else {
      setForm(createEmptyForm());
    }
  }, [open, initialData]);

  const divisions = useMemo(
    () => Object.keys(LOCATION_DATA),
    []
  );

  const districts = useMemo(() => {
    if (!form.division) return [];

    return Object.keys(
      LOCATION_DATA[form.division] || {}
    );
  }, [form.division]);

  const upazilas = useMemo(() => {
    if (!form.division || !form.district) {
      return [];
    }

    return (
      LOCATION_DATA[form.division]?.[form.district] || []
    );
  }, [form.division, form.district]);

  const updateField = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));

    if (error) {
      setError("");
    }
  };

  const saveAddress = async () => {
    const requiredFields = [
      form.fullName,
      form.phone,
      form.division,
      form.district,
      form.upazila,
      form.postOffice,
      form.addressLine,
    ];

    if (requiredFields.some((value) => !value?.trim())) {
      setError("দয়া করে সকল প্রয়োজনীয় তথ্য পূরণ করুন।");
      return;
    }

    try {
      setLoading(true);
      setError("");

      let address;

      if (isEditing) {
        address = await updateAddress(
          initialData.id,
          form
        );
      } else {
        address = await addAddress(form);
      }

      onSave?.(address);

      setForm(createEmptyForm());
      onOpenChange(false);
    } catch (err) {
      console.error("Save Address Error:", err);

      setError(
        err?.message ||
          "ঠিকানা সংরক্ষণ করা যায়নি। আবার চেষ্টা করুন।"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Sheet
      open={open}
      onOpenChange={onOpenChange}
    >
      <SheetContent
        side="bottom"
        className="flex h-[90vh] max-h-[90vh] flex-col rounded-t-3xl p-0 sm:mx-auto sm:max-w-lg"
      >
        {/* Header */}
        <SheetHeader className="border-b px-5 py-4 text-left">
          <SheetTitle>
            {isEditing
              ? "ঠিকানা সম্পাদনা করুন"
              : "নতুন ঠিকানা যোগ করুন"}
          </SheetTitle>
        </SheetHeader>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto px-5 py-5">
          <div className="space-y-4">

            {/* Full Name */}
            <div>
              <Label className="mb-1.5 block">
                পূর্ণ নাম *
              </Label>

              <Input
                placeholder="আপনার পূর্ণ নাম"
                value={form.fullName}
                onChange={(e) =>
                  updateField(
                    "fullName",
                    e.target.value
                  )
                }
              />
            </div>

            {/* Phone */}
            <div>
              <Label className="mb-1.5 block">
                মোবাইল নম্বর *
              </Label>

              <Input
                type="tel"
                inputMode="tel"
                placeholder="017XXXXXXXX"
                value={form.phone}
                onChange={(e) =>
                  updateField(
                    "phone",
                    e.target.value
                  )
                }
              />
            </div>

            {/* Division */}
            <div>
              <Label className="mb-1.5 block">
                বিভাগ *
              </Label>

              <Select
                value={form.division}
                onValueChange={(value) =>
                  setForm((prev) => ({
                    ...prev,
                    division: value,
                    district: "",
                    upazila: "",
                    postOffice: "",
                  }))
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="বিভাগ নির্বাচন করুন" />
                </SelectTrigger>

                <SelectContent>
                  {divisions.map((item) => (
                    <SelectItem
                      key={item}
                      value={item}
                    >
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* District */}
            <div>
              <Label className="mb-1.5 block">
                জেলা *
              </Label>

              <Select
                value={form.district}
                onValueChange={(value) =>
                  setForm((prev) => ({
                    ...prev,
                    district: value,
                    upazila: "",
                    postOffice: "",
                  }))
                }
                disabled={!form.division}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="জেলা নির্বাচন করুন" />
                </SelectTrigger>

                <SelectContent>
                  {districts.map((item) => (
                    <SelectItem
                      key={item}
                      value={item}
                    >
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Upazila */}
            <div>
              <Label className="mb-1.5 block">
                থানা / উপজেলা *
              </Label>

              <Select
                value={form.upazila}
                onValueChange={(value) =>
                  setForm((prev) => ({
                    ...prev,
                    upazila: value,
                    postOffice: "",
                  }))
                }
                disabled={!form.district}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="উপজেলা নির্বাচন করুন" />
                </SelectTrigger>

                <SelectContent>
                  {upazilas.map((item) => (
                    <SelectItem
                      key={item}
                      value={item}
                    >
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Post Office */}
            <div>
              <Label className="mb-1.5 block">
                পোস্ট অফিস *
              </Label>

              <Input
                placeholder="যেমন: ছাতক পোস্ট অফিস"
                value={form.postOffice}
                onChange={(e) =>
                  updateField(
                    "postOffice",
                    e.target.value
                  )
                }
                disabled={!form.upazila}
              />

              <p className="mt-1.5 text-xs text-slate-500">
                আপনার এলাকার পোস্ট অফিসের নাম লিখুন।
              </p>
            </div>

            {/* Detailed Address */}
            <div>
              <Label className="mb-1.5 block">
                বিস্তারিত ঠিকানা *
              </Label>

              <Textarea
                rows={3}
                placeholder="যেমন: গ্রাম/মহল্লা, রোড, বাড়ি/ফ্ল্যাট নম্বর"
                value={form.addressLine}
                onChange={(e) =>
                  updateField(
                    "addressLine",
                    e.target.value
                  )
                }
              />
            </div>

            {/* Landmark */}
            <div>
              <Label className="mb-1.5 block">
                পরিচিত স্থান / ল্যান্ডমার্ক
                <span className="ml-1 text-xs text-slate-500">
                  (ঐচ্ছিক)
                </span>
              </Label>

              <Input
                placeholder="যেমন: বড় মসজিদের পাশে"
                value={form.landmark}
                onChange={(e) =>
                  updateField(
                    "landmark",
                    e.target.value
                  )
                }
              />
            </div>

            {/* Address Type */}
            <div>
              <Label className="mb-2 block">
                ঠিকানার ধরন
              </Label>

              <div className="grid grid-cols-3 gap-3">
                {ADDRESS_TYPES.map(
                  ({ name, label, icon: Icon }) => (
                    <button
                      key={name}
                      type="button"
                      onClick={() =>
                        updateField(
                          "type",
                          name
                        )
                      }
                      className={`flex flex-col items-center justify-center rounded-xl border p-3 transition ${
                        form.type === name
                          ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                          : "border-slate-200 text-slate-600"
                      }`}
                    >
                      <Icon className="mb-1.5 h-5 w-5" />

                      <span className="text-xs font-medium">
                        {label}
                      </span>
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-600">
                {error}
              </div>
            )}
          </div>
        </div>

        {/* Bottom Button */}
        <div className="mt-auto border-t bg-white px-5 py-4">
          <Button
            onClick={saveAddress}
            disabled={loading}
            className="h-12 w-full rounded-xl text-base font-semibold"
          >
            {loading
              ? isEditing
                ? "আপডেট হচ্ছে..."
                : "সেভ হচ্ছে..."
              : isEditing
              ? "আপডেট করুন"
              : "ঠিকানা সেভ করুন"}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}