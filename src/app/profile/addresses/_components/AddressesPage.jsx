"use client";

import { useState } from "react";
import {
  ArrowLeft,
  Plus,
  MapPin,
  Home,
  Briefcase,
  Building,
  Phone,
  Pencil,
  Trash2,
  Check,
  Loader2,
} from "lucide-react";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";

import AddressSheet from "@/components/common/AddressSheet";

import { updateDefaultAddress } from "@/lib/address/updateDefaultAddress";
import { deleteAddress } from "@/lib/address/deleteAddress";

const TYPE_ICONS = {
  Home,
  Office: Briefcase,
  Other: Building,
};

export default function AddressesPage({
  initialAddresses = [],
}) {
  const router = useRouter();

  const [addresses, setAddresses] = useState(
    initialAddresses
  );

  const [openSheet, setOpenSheet] = useState(false);

  const [editingAddress, setEditingAddress] =
    useState(null);

  const [settingDefaultId, setSettingDefaultId] =
    useState(null);

  const [deletingId, setDeletingId] =
    useState(null);

  const openAddSheet = () => {
    setEditingAddress(null);
    setOpenSheet(true);
  };

  const openEditSheet = (address) => {
    setEditingAddress(address);
    setOpenSheet(true);
  };

  const handleSave = (address) => {
    setAddresses((prev) => {
      const exists = prev.some(
        (item) => item.id === address.id
      );

      if (exists) {
        return prev.map((item) =>
          item.id === address.id
            ? address
            : item
        );
      }

      return [address, ...prev];
    });

    setEditingAddress(null);
    setOpenSheet(false);

    toast.success(
      address?.created_at
        ? "ঠিকানা সফলভাবে সংরক্ষণ হয়েছে।"
        : "ঠিকানা আপডেট হয়েছে।"
    );
  };

  const handleSetDefault = async (addressId) => {
    if (!addressId) return;

    try {
      setSettingDefaultId(addressId);

      const updatedAddress =
        await updateDefaultAddress(addressId);

      setAddresses((prev) =>
        prev.map((address) => ({
          ...address,
          is_default:
            address.id === updatedAddress.id,
        }))
      );

      toast.success(
        "Default address পরিবর্তন হয়েছে।"
      );
    } catch (error) {
      console.error(
        "Set Default Address Error:",
        error
      );

      toast.error(
        error?.message ||
          "Default address পরিবর্তন করা যায়নি।"
      );
    } finally {
      setSettingDefaultId(null);
    }
  };

  const handleDelete = async (address) => {
    if (!address?.id) return;

    const confirmed = window.confirm(
      `“${address.full_name}” এর এই ঠিকানাটি মুছে ফেলতে চান?`
    );

    if (!confirmed) return;

    try {
      setDeletingId(address.id);

      await deleteAddress(address.id);

      setAddresses((prev) =>
        prev.filter(
          (item) => item.id !== address.id
        )
      );

      toast.success(
        "ঠিকানা সফলভাবে মুছে ফেলা হয়েছে।"
      );
    } catch (error) {
      console.error(
        "Delete Address Error:",
        error
      );

      toast.error(
        error?.message ||
          "ঠিকানা মুছে ফেলা যায়নি।"
      );
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-20 border-b bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-4xl items-center gap-3 px-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-slate-100"
            aria-label="Back"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>

          <div className="min-w-0 flex-1">
            <h1 className="truncate text-lg font-bold text-slate-900">
              আমার ঠিকানা
            </h1>

            <p className="text-xs text-slate-500">
              আপনার সংরক্ষিত ডেলিভারি ঠিকানা
            </p>
          </div>

          <Button
            onClick={openAddSheet}
            size="sm"
            className="gap-1.5 rounded-xl"
          >
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">
              নতুন ঠিকানা
            </span>
            <span className="sm:hidden">
              যোগ করুন
            </span>
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-5 pb-10">
        {/* Page intro */}
        <div className="mb-5">
          <h2 className="text-xl font-bold text-slate-900">
            Delivery Addresses
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            অর্ডার করার সময় দ্রুত ব্যবহার করার জন্য
            আপনার ঠিকানাগুলো সংরক্ষণ করুন।
          </p>
        </div>

        {/* Empty state */}
        {addresses.length === 0 && (
          <div className="rounded-3xl border border-dashed bg-white px-5 py-12 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
              <MapPin className="h-8 w-8" />
            </div>

            <h3 className="mt-4 text-lg font-bold text-slate-900">
              কোনো ঠিকানা সংরক্ষিত নেই
            </h3>

            <p className="mx-auto mt-1 max-w-sm text-sm text-slate-500">
              আপনার প্রথম delivery address যোগ করুন।
              Checkout করার সময় এই ঠিকানাটি ব্যবহার করতে
              পারবেন।
            </p>

            <Button
              onClick={openAddSheet}
              className="mt-5 gap-2 rounded-xl"
            >
              <Plus className="h-4 w-4" />
              নতুন ঠিকানা যোগ করুন
            </Button>
          </div>
        )}

        {/* Address list */}
        {addresses.length > 0 && (
          <div className="space-y-4">
            {addresses.map((address) => {
              const Icon =
                TYPE_ICONS[address.label] ||
                Home;

              const isSettingDefault =
                settingDefaultId === address.id;

              const isDeleting =
                deletingId === address.id;

              return (
                <article
                  key={address.id}
                  className={`rounded-2xl border bg-white p-4 shadow-sm transition ${
                    address.is_default
                      ? "border-emerald-300 ring-1 ring-emerald-100"
                      : "border-slate-200"
                  }`}
                >
                  {/* Top */}
                  <div className="flex items-start gap-3">
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                        address.is_default
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-bold text-slate-900">
                          {address.full_name}
                        </h3>

                        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600">
                          {address.label}
                        </span>

                        {address.is_default && (
                          <span className="flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
                            <Check className="h-3 w-3" />
                            Default
                          </span>
                        )}
                      </div>

                      <div className="mt-2 flex items-center gap-1.5 text-sm text-slate-600">
                        <Phone className="h-3.5 w-3.5 shrink-0" />
                        <span>{address.phone}</span>
                      </div>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="mt-4 rounded-xl bg-slate-50 p-3">
                    <div className="flex items-start gap-2">
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" />

                      <div className="text-sm leading-6 text-slate-600">
                        <p>
                          {address.address_line},{" "}
                          {address.post_office},{" "}
                          {address.upazila},{" "}
                          {address.district},{" "}
                          {address.division}
                        </p>

                        {address.landmark && (
                          <p className="mt-1 text-xs text-slate-500">
                            পরিচিত স্থান:{" "}
                            {address.landmark}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-4 flex flex-wrap items-center gap-2 border-t pt-3">
                    {!address.is_default && (
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={
                          isSettingDefault ||
                          isDeleting
                        }
                        onClick={() =>
                          handleSetDefault(
                            address.id
                          )
                        }
                        className="rounded-xl"
                      >
                        {isSettingDefault ? (
                          <>
                            <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />
                            সেট হচ্ছে...
                          </>
                        ) : (
                          "Default করুন"
                        )}
                      </Button>
                    )}

                    <Button
                      variant="outline"
                      size="sm"
                      disabled={isDeleting}
                      onClick={() =>
                        openEditSheet(address)
                      }
                      className="gap-1.5 rounded-xl"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                      Edit
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      disabled={
                        isDeleting ||
                        isSettingDefault
                      }
                      onClick={() =>
                        handleDelete(address)
                      }
                      className="gap-1.5 rounded-xl text-red-600 hover:bg-red-50 hover:text-red-700"
                    >
                      {isDeleting ? (
                        <>
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          মুছে যাচ্ছে...
                        </>
                      ) : (
                        <>
                          <Trash2 className="h-3.5 w-3.5" />
                          Delete
                        </>
                      )}
                    </Button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </main>

      {/* Add / Edit Sheet */}
      <AddressSheet
        open={openSheet}
        onOpenChange={(value) => {
          setOpenSheet(value);

          if (!value) {
            setEditingAddress(null);
          }
        }}
        initialData={editingAddress}
        onSave={handleSave}
      />
    </div>
  );
}