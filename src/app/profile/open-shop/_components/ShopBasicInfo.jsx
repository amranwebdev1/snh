"use client";

import { useState } from "react";

import { slugify } from "transliteration";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { uploadShopImage } from "@/lib/supabase/uploadShopImage";
import { deleteShopImage } from "@/lib/supabase/deleteShopImage";

import {
  Store,
  MapPin,
  Phone,
  FileText,
  Camera,
  Image as ImageIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

export default function ShopBasicInfo({ currentUser }) {
  const router = useRouter();
  const supabase = createClient();

  /*
   * Current user
   */
  const user = currentUser?.user || null;
  const username = currentUser?.profile?.username || "";

  /*
   * Existing shop
   */
  const initialShop = currentUser?.shop || null;

  const [form, setForm] = useState({
    name: initialShop?.name || "",
    slug: initialShop?.slug || "",
    phone: initialShop?.phone || "",
    location: initialShop?.location || "",
    description: initialShop?.description || "",
  });

  const [existingShop, setExistingShop] = useState(initialShop);

  const [logoFile, setLogoFile] = useState(null);
  const [coverFile, setCoverFile] = useState(null);

  const [logoPreview, setLogoPreview] = useState(
    initialShop?.logo || ""
  );

  const [coverPreview, setCoverPreview] = useState(
    initialShop?.cover || ""
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /*
   * Handle form changes
   */
  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  /*
   * Generate Bangla/Banglish slug
   */
  const generateSlug = (value) => {
    const slug = slugify(value, {
      lowercase: true,
      separator: "-",
    });

    setForm((prev) => ({
      ...prev,
      name: value,
      slug,
    }));
  };

  /*
   * Logo
   */
  const handleLogo = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setLogoFile(file);
    setLogoPreview(URL.createObjectURL(file));
  };

  /*
   * Cover
   */
  const handleCover = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setCoverFile(file);
    setCoverPreview(URL.createObjectURL(file));
  };

  /*
   * Submit
   */
  const handleSubmit = async () => {
    setError("");

    /*
     * Authentication
     */
    if (!user) {
      router.push("/auth/login");
      return;
    }

    /*
     * Username
     */
    if (!username) {
      setError("আপনার username পাওয়া যায়নি।");
      return;
    }

    /*
     * Validation
     */
    if (!form.name.trim()) {
      setError("Shop Name দিন।");
      return;
    }

    if (!form.slug.trim()) {
      setError("Shop URL তৈরি করা যায়নি।");
      return;
    }

    if (!form.phone.trim()) {
      setError("Phone Number দিন।");
      return;
    }

    if (!/^01[3-9]\d{8}$/.test(form.phone.trim())) {
      setError("সঠিক ১১ সংখ্যার মোবাইল নাম্বার দিন।");
      return;
    }

    if (!form.location.trim()) {
      setError("Location দিন।");
      return;
    }

    if (!logoFile && !logoPreview) {
      setError("Shop Logo আপলোড করুন।");
      return;
    }

    try {
      setLoading(true);

      let logoUrl = existingShop?.logo || null;
      let coverUrl = existingShop?.cover || null;

      /*
       * Upload new logo
       */
      if (logoFile) {
        if (existingShop?.logo) {
          await deleteShopImage(existingShop.logo);
        }

        logoUrl = await uploadShopImage(logoFile, "logo");
      }

      /*
       * Upload new cover
       */
      if (coverFile) {
        if (existingShop?.cover) {
          await deleteShopImage(existingShop.cover);
        }

        coverUrl = await uploadShopImage(coverFile, "cover");
      }

      /*
       * Update existing shop
       */
      if (existingShop) {
        const { data, error } = await supabase
          .from("shops")
          .update({
            name: form.name.trim(),
            slug: form.slug,
            phone: form.phone.trim(),
            location: form.location.trim(),
            description: form.description.trim(),
            logo: logoUrl,
            cover: coverUrl,
            verification_status: "pending_review",
            rejection_reason: null,
          })
          .eq("owner_id", user.id)
          .select()
          .single();

        if (error) throw error;

        setExistingShop(data);
      }

      /*
       * Create new shop
       */
      else {
        const { data, error } = await supabase
          .from("shops")
          .insert({
            owner_id: user.id,
            name: form.name.trim(),
            slug: form.slug,
            phone: form.phone.trim(),
            location: form.location.trim(),
            description: form.description.trim(),
            logo: logoUrl,
            cover: coverUrl,
            status: "active",
            verification_status: "pending_review",
          })
          .select()
          .single();

        if (error) throw error;

        setExistingShop(data);
      }

      /*
       * Shop pending page
       */
      router.push("/profile/shop-pending");
      router.refresh();
    } catch (err) {
      console.error("Shop Submit Error:", err);

      /*
       * Duplicate slug / database unique error
       */
      if (err?.code === "23505") {
        setError(
          "এই Shop URL ইতিমধ্যে ব্যবহৃত হয়েছে। অন্য Shop Name ব্যবহার করুন।"
        );
        return;
      }

      setError(err?.message || "কিছু সমস্যা হয়েছে।");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="rounded-3xl">
      <CardContent className="space-y-6 p-5">

        {/* Header */}

        <div>
          <h2 className="text-2xl font-bold">
            {existingShop ? "Edit Your Shop" : "Create Your Shop"}
          </h2>

          <p className="text-sm text-slate-500">
            {existingShop
              ? "Update your shop and submit again for review."
              : "Submit your shop for review."}
          </p>
        </div>

        {/* Rejection */}

        {existingShop?.verification_status === "rejected" &&
          existingShop?.rejection_reason && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              <p className="font-semibold">
                Application Rejected
              </p>

              <p>{existingShop.rejection_reason}</p>
            </div>
          )}

        {/* Cover */}

        <div className="space-y-2">
          <label className="text-sm font-medium">
            Shop Cover{" "}
            <span className="text-slate-400">
              (Optional)
            </span>
          </label>

          <label className="flex h-40 cursor-pointer items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-slate-300">

            {coverPreview ? (
              <img
                src={coverPreview}
                alt="Cover"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="text-center">
                <ImageIcon className="mx-auto mb-2 h-8 w-8 text-slate-400" />

                <p className="text-sm text-slate-500">
                  Upload Cover Photo
                </p>
              </div>
            )}

            <input
              hidden
              type="file"
              accept="image/*"
              onChange={handleCover}
            />
          </label>
        </div>

        {/* Logo */}

        <div className="space-y-2">
          <label className="text-sm font-medium">
            Shop Logo{" "}
            <span className="text-red-500">*</span>
          </label>

          <label className="flex h-24 w-24 cursor-pointer items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-slate-300">

            {logoPreview ? (
              <img
                src={logoPreview}
                alt="Logo"
                className="h-full w-full object-cover"
              />
            ) : (
              <Camera className="h-8 w-8 text-slate-400" />
            )}

            <input
              hidden
              type="file"
              accept="image/*"
              onChange={handleLogo}
            />
          </label>
        </div>

        {/* Shop Name */}

        <div className="space-y-1">
          <label className="text-sm font-medium">
            Shop Name{" "}
            <span className="text-red-500">*</span>
          </label>

          <div className="relative">
            <Store className="absolute left-3 top-3 h-5 w-5 text-slate-400" />

            <Input
              className="pl-10"
              value={form.name}
              placeholder="Mojadar Restaurant"
              onChange={(e) =>
                generateSlug(e.target.value)
              }
            />
          </div>
        </div>

        {/* Shop URL */}

        <div className="space-y-1">
          <label className="text-sm font-medium">
            Shop URL
          </label>

          <Input
            value={form.slug}
            readOnly
          />

          <p className="break-all text-xs text-slate-400">
            sunamhat.com/shop/
            {username || "username"}/
            {form.slug || "your-shop"}
          </p>
        </div>

        {/* Phone */}

        <div className="space-y-1">
          <label className="text-sm font-medium">
            Phone Number{" "}
            <span className="text-red-500">*</span>
          </label>

          <div className="relative">
            <Phone className="absolute left-3 top-3 h-5 w-5 text-slate-400" />

            <Input
              className="pl-10"
              value={form.phone}
              placeholder="01712345678"
              onChange={(e) =>
                handleChange("phone", e.target.value)
              }
            />
          </div>
        </div>

        {/* Location */}

        <div className="space-y-1">
          <label className="text-sm font-medium">
            Location{" "}
            <span className="text-red-500">*</span>
          </label>

          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-5 w-5 text-slate-400" />

            <Input
              className="pl-10"
              value={form.location}
              placeholder="Sunamganj, Bangladesh"
              onChange={(e) =>
                handleChange(
                  "location",
                  e.target.value
                )
              }
            />
          </div>
        </div>

        {/* Description */}

        <div className="space-y-1">
          <label className="text-sm font-medium">
            Description{" "}
            <span className="text-slate-400">
              (Optional)
            </span>
          </label>

          <div className="relative">
            <FileText className="absolute left-3 top-3 h-5 w-5 text-slate-400" />

            <Textarea
              className="min-h-28 pl-10"
              maxLength={300}
              value={form.description}
              placeholder="Tell customers about your shop..."
              onChange={(e) =>
                handleChange(
                  "description",
                  e.target.value
                )
              }
            />
          </div>

          <p className="text-right text-xs text-slate-400">
            {form.description.length}/300
          </p>
        </div>

        {/* Error */}

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Review Notice */}

        <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs text-amber-700">
          Your shop will be reviewed before it becomes public.
        </div>

        {/* Submit */}

        <Button
          onClick={handleSubmit}
          disabled={loading}
          className="h-12 w-full rounded-xl"
        >
          {loading
            ? "Uploading & Submitting..."
            : existingShop
              ? "Update & Resubmit"
              : "Submit for Review"}
        </Button>
      </CardContent>
    </Card>
  );
}