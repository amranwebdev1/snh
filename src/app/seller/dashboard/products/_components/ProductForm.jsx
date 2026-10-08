"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { slugify } from "transliteration";

import { uploadProductImages } from "@/lib/supabase/uploadProductImages";
import { deleteProductImage } from "@/lib/supabase/deleteProductImage";

import {
  Camera,
  Package,
  Trash2,
  FileText,
  Tag,
  Layers3,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
} from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ProductForm({
  currentUser,
  initialProduct = null,
}) {
  const router = useRouter();
  const supabase = createClient();

  /*
   * Categories
   */
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  const [categoriesLoading, setCategoriesLoading] =
    useState(true);

  const [subcategoriesLoading, setSubcategoriesLoading] =
    useState(false);

  /*
   * Form
   */
  const [form, setForm] = useState({
    name: initialProduct?.name || "",
    slug: initialProduct?.slug || "",

    price: initialProduct?.price || "",
    discount_price:
      initialProduct?.discount_price || "",

    stock: initialProduct?.stock || "",

    category: initialProduct?.category || "",
    category_id: initialProduct?.category_id || "",
    subcategory_id:
      initialProduct?.subcategory_id || "",

    description:
      initialProduct?.description || "",
  });

  /*
   * Images
   */
  const [images, setImages] = useState([]);

  const [existingImages, setExistingImages] =
    useState(initialProduct?.images || []);

  /*
   * UI
   */
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  /*
   * Load categories
   */
  useEffect(() => {
    let mounted = true;

    const loadCategories = async () => {
      try {
        setCategoriesLoading(true);
        setError("");

        const { data, error } = await supabase
          .from("categories")
          .select("id, name, slug")
          .eq("is_active", true)
          .order("sort_order", {
            ascending: true,
          });

        if (error) {
          throw error;
        }

        if (mounted) {
          setCategories(data || []);
        }
      } catch (err) {
        console.error(
          "Category Load Error:",
          err
        );

        if (mounted) {
          setError(
            "Category load করা যায়নি।"
          );
        }
      } finally {
        if (mounted) {
          setCategoriesLoading(false);
        }
      }
    };

    loadCategories();

    return () => {
      mounted = false;
    };
  }, []);

  /*
   * Load subcategories
   */
  useEffect(() => {
    let mounted = true;

    if (!form.category_id) {
      setSubcategories([]);
      setSubcategoriesLoading(false);

      return;
    }

    const loadSubcategories = async () => {
      try {
        setSubcategoriesLoading(true);

        const { data, error } = await supabase
          .from("subcategories")
          .select(
            "id, category_id, name, slug"
          )
          .eq(
            "category_id",
            form.category_id
          )
          .eq("is_active", true)
          .order("sort_order", {
            ascending: true,
          });

        if (error) {
          throw error;
        }

        if (mounted) {
          setSubcategories(data || []);
        }
      } catch (err) {
        console.error(
          "Subcategory Load Error:",
          err
        );

        if (mounted) {
          setSubcategories([]);
          setError(
            "Subcategory load করা যায়নি।"
          );
        }
      } finally {
        if (mounted) {
          setSubcategoriesLoading(false);
        }
      }
    };

    loadSubcategories();

    return () => {
      mounted = false;
    };
  }, [form.category_id]);

  /*
   * Discount percentage
   */
  const discountPercentage = useMemo(() => {
    const price = Number(form.price);

    const discountPrice = Number(
      form.discount_price
    );

    if (
      !price ||
      !discountPrice ||
      discountPrice >= price ||
      discountPrice <= 0
    ) {
      return 0;
    }

    return Math.round(
      ((price - discountPrice) / price) *
        100
    );
  }, [
    form.price,
    form.discount_price,
  ]);

  /*
   * Generate Banglish slug
   *
   * Example:
   *
   * লাল আপেল
   * ↓
   * lal-apel
   *
   * Chicken Burger
   * ↓
   * chicken-burger
   */
  const generateSlug = (value) => {
    const generatedSlug = slugify(value, {
      lowercase: true,
      separator: "-",
    });

    setForm((prev) => ({
      ...prev,
      name: value,
      slug: generatedSlug,
    }));
  };

  /*
   * Image selection
   */
  const handleImages = (e) => {
    const files = Array.from(
      e.target.files || []
    );

    if (!files.length) {
      return;
    }

    const totalImages =
      files.length +
      images.length +
      existingImages.length;

    if (totalImages > 5) {
      setError(
        "সর্বোচ্চ ৫টি ছবি রাখা যাবে।"
      );

      e.target.value = "";

      return;
    }

    setError("");

    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setImages((prev) => [
      ...prev,
      ...newImages,
    ]);

    /*
     * Same file আবার select করার
     * সুযোগ দেওয়ার জন্য input reset
     */
    e.target.value = "";
  };

  /*
   * Remove newly selected image
   */
  const removeNewImage = (index) => {
    const image = images[index];

    if (image?.preview) {
      URL.revokeObjectURL(
        image.preview
      );
    }

    setImages((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  /*
   * Remove existing image
   */
  const removeExistingImage = async (
    index
  ) => {
    const url = existingImages[index];

    if (!url) {
      return;
    }

    try {
      setError("");

      await deleteProductImage(url);

      setExistingImages((prev) =>
        prev.filter((_, i) => i !== index)
      );
    } catch (err) {
      console.error(
        "Image Delete Error:",
        err
      );

      setError(
        "ছবিটি delete করা যায়নি।"
      );
    }
  };

  /*
   * Category change
   */
  const handleCategoryChange = (
    categoryId
  ) => {
    const selectedCategory =
      categories.find(
        (category) =>
          category.id === categoryId
      );

    setForm((prev) => ({
      ...prev,

      category_id: categoryId,

      category:
        selectedCategory?.name || "",

      /*
       * Category change হলে
       * আগের subcategory reset
       */
      subcategory_id: "",
    }));

    /*
     * UI immediately clear
     */
    setSubcategories([]);
  };

  /*
   * Subcategory change
   */
  const handleSubcategoryChange = (
    subcategoryId
  ) => {
    setForm((prev) => ({
      ...prev,
      subcategory_id:
        subcategoryId,
    }));
  };

  /*
   * Submit
   */
  const handleSubmit = async () => {
    setError("");

    /*
     * Product name
     */
    if (!form.name.trim()) {
      return setError(
        "Product Name দিন।"
      );
    }

    /*
     * Price
     */
    const price = Number(form.price);

    if (!price || price <= 0) {
      return setError(
        "সঠিক Price দিন।"
      );
    }

    /*
     * Discount price
     */
    const discountPrice =
      form.discount_price !== ""
        ? Number(form.discount_price)
        : null;

    if (discountPrice !== null) {
      if (
        !discountPrice ||
        discountPrice <= 0
      ) {
        return setError(
          "Discount Price সঠিকভাবে দিন।"
        );
      }

      if (
        discountPrice >= price
      ) {
        return setError(
          "Discount Price মূল Price-এর চেয়ে কম হতে হবে।"
        );
      }
    }

    /*
     * Stock
     */
    if (
      form.stock === "" ||
      Number(form.stock) < 0
    ) {
      return setError(
        "সঠিক Stock দিন।"
      );
    }

    /*
     * Category
     */
    if (!form.category_id) {
      return setError(
        "Category নির্বাচন করুন।"
      );
    }

    /*
     * Shop
     */
    if (!currentUser?.shop?.id) {
      return setError(
        "আপনার Shop পাওয়া যায়নি।"
      );
    }

    /*
     * Images
     */
    if (
      existingImages.length +
        images.length ===
      0
    ) {
      return setError(
        "অন্তত ১টি ছবি দিন।"
      );
    }

    try {
      setLoading(true);

      /*
       * Upload new images
       */
      let uploadedImages = [];

      if (images.length > 0) {
        uploadedImages =
          await uploadProductImages(
            images.map(
              (item) => item.file
            )
          );
      }

      /*
       * Combine old + new images
       */
      const allImages = [
        ...existingImages,
        ...uploadedImages,
      ];

      /*
       * Safety check
       */
      if (allImages.length > 5) {
        throw new Error(
          "সর্বোচ্চ ৫টি ছবি রাখা যাবে।"
        );
      }

      /*
       * Payload
       */
      const payload = {
        name: form.name.trim(),

        slug: form.slug,

        price,

        discount_price:
          discountPrice,

        stock: Number(form.stock),

        category: form.category,

        category_id:
          form.category_id,

        subcategory_id:
          form.subcategory_id || null,

        description:
          form.description.trim(),

        thumbnail:
          allImages[0] || null,

        images: allImages,

        /*
         * Seller নিজের product
         * approve করতে পারবে না।
         *
         * Admin approval লাগবে।
         */
        approval_status: "pending",
      };

      /*
       * EDIT PRODUCT
       */
      if (initialProduct) {
        const { error } =
          await supabase
            .from("products")
            .update(payload)
            .eq(
              "id",
              initialProduct.id
            )
            .eq(
              "shop_id",
              currentUser.shop.id
            );

        if (error) {
          throw error;
        }
      }

      /*
       * NEW PRODUCT
       */
      else {
        const { error } =
          await supabase
            .from("products")
            .insert({
              ...payload,

              shop_id:
                currentUser.shop.id,

              /*
               * Existing status system
               */
              status: "active",
            });

        if (error) {
          throw error;
        }
      }

      /*
       * Success
       */
      router.push(
        "/seller/dashboard/products"
      );

      router.refresh();
    } catch (err) {
      console.error(
        "Product Save Error:",
        err
      );

      setError(
        err?.message ||
          "Product Save করা যায়নি।"
      );
    } finally {
      setLoading(false);
    }
  };

  /*
   * Cleanup preview URLs
   */
  useEffect(() => {
    return () => {
      images.forEach((item) => {
        if (item.preview) {
          URL.revokeObjectURL(
            item.preview
          );
        }
      });
    };
  }, [images]);

  return (
    <Card className="rounded-3xl">
      <CardContent className="space-y-6 p-5">
        {/* ================= HEADER ================= */}

        <div>
          <h2 className="text-2xl font-bold">
            {initialProduct
              ? "Edit Product"
              : "Add New Product"}
          </h2>

          <p className="text-sm text-slate-500">
            {initialProduct
              ? "Update your product."
              : "Add a new product to your shop."}
          </p>

          <div className="mt-3 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm leading-6 text-amber-700">
            নতুন Product প্রথমে Admin
            Review-এর জন্য যাবে। Admin
            অনুমোদন করার পর Product
            Customer-এর কাছে দেখা যাবে।
          </div>
        </div>

        {/* ================= IMAGES ================= */}

        <div className="space-y-2">
          <label className="text-sm font-medium">
            Product Images{" "}
            <span className="text-red-500">
              *
            </span>
          </label>

          <label className="flex h-36 cursor-pointer items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 transition hover:border-slate-400">
            <div className="text-center">
              <Camera className="mx-auto mb-2 h-8 w-8 text-slate-400" />

              <p className="text-sm text-slate-500">
                Upload Images
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Maximum 5 images
              </p>
            </div>

            <input
              hidden
              multiple
              type="file"
              accept="image/*"
              onChange={handleImages}
            />
          </label>

          {/* Existing Images */}

          {existingImages.length >
            0 && (
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
              {existingImages.map(
                (url, index) => (
                  <div
                    key={`old-${index}`}
                    className="relative overflow-hidden rounded-xl border bg-slate-50"
                  >
                    <img
                      src={url}
                      alt={`Product ${index + 1}`}
                      className="h-24 w-full object-cover"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        removeExistingImage(
                          index
                        )
                      }
                      className="absolute right-1 top-1 rounded-full bg-black/60 p-1.5 text-white transition hover:bg-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                )
              )}
            </div>
          )}

          {/* New Images */}

          {images.length > 0 && (
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
              {images.map(
                (item, index) => (
                  <div
                    key={`new-${index}`}
                    className="relative overflow-hidden rounded-xl border bg-slate-50"
                  >
                    <img
                      src={item.preview}
                      alt={`Preview ${index + 1}`}
                      className="h-24 w-full object-cover"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        removeNewImage(
                          index
                        )
                      }
                      className="absolute right-1 top-1 rounded-full bg-black/60 p-1.5 text-white transition hover:bg-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                )
              )}
            </div>
          )}
        </div>

        {/* ================= NAME ================= */}

        <div className="space-y-1">
          <label className="text-sm font-medium">
            Product Name{" "}
            <span className="text-red-500">
              *
            </span>
          </label>

          <div className="relative">
            <Package className="absolute left-3 top-3 h-5 w-5 text-slate-400" />

            <Input
              className="h-12 rounded-xl pl-10"
              placeholder="যেমন: লাল আপেল"
              value={form.name}
              onChange={(e) =>
                generateSlug(
                  e.target.value
                )
              }
            />
          </div>
        </div>

        {/* ================= SLUG ================= */}

        <div className="space-y-1">
          <label className="text-sm font-medium">
            Product URL
          </label>

          <Input
            value={form.slug}
            readOnly
            className="h-12 rounded-xl bg-slate-50"
          />

          <p className="text-xs text-slate-400">
            sunamhat.com/product/
            {form.slug ||
              "your-product"}
          </p>
        </div>

        {/* ================= PRICE ================= */}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Regular Price */}

          <div className="space-y-1">
            <label className="text-sm font-medium">
              Regular Price (৳)
            </label>

            <Input
              type="number"
              min="0"
              step="0.01"
              value={form.price}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  price: e.target.value,
                }))
              }
              placeholder="1000"
              className="h-12 rounded-xl"
            />
          </div>

          {/* Discount Price */}

          <div className="space-y-1">
            <label className="flex items-center gap-2 text-sm font-medium">
              <Tag className="h-4 w-4" />

              Discount Price (৳)
            </label>

            <Input
              type="number"
              min="0"
              step="0.01"
              value={
                form.discount_price
              }
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  discount_price:
                    e.target.value,
                }))
              }
              placeholder="850"
              className="h-12 rounded-xl"
            />

            {discountPercentage >
              0 && (
              <p className="text-xs font-medium text-emerald-600">
                {discountPercentage}%
                discount
              </p>
            )}
          </div>
        </div>

        {/* ================= PRICE PREVIEW ================= */}

        {form.price &&
          form.discount_price &&
          discountPercentage > 0 && (
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">
                Customer দেখবে
              </p>

              <div className="mt-1 flex flex-wrap items-center gap-3">
                <span className="text-xl font-bold text-emerald-600">
                  ৳
                  {Number(
                    form.discount_price
                  ).toLocaleString()}
                </span>

                <span className="text-sm text-slate-400 line-through">
                  ৳
                  {Number(
                    form.price
                  ).toLocaleString()}
                </span>

                <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-semibold text-red-600">
                  -{discountPercentage}%
                </span>
              </div>
            </div>
          )}

        {/* ================= STOCK ================= */}

        <div className="space-y-1">
          <label className="text-sm font-medium">
            Stock
          </label>

          <Input
            type="number"
            min="0"
            step="1"
            value={form.stock}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                stock: e.target.value,
              }))
            }
            placeholder="50"
            className="h-12 rounded-xl"
          />
        </div>

        {/* ================= CATEGORY ================= */}

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium">
            <Layers3 className="h-4 w-4" />

            Category{" "}
            <span className="text-red-500">
              *
            </span>
          </label>

          <Select
            value={form.category_id}
            onValueChange={
              handleCategoryChange
            }
            disabled={
              categoriesLoading
            }
          >
            <SelectTrigger className="h-12 rounded-xl">
              <SelectValue
                placeholder={
                  categoriesLoading
                    ? "Category load হচ্ছে..."
                    : "Category নির্বাচন করুন"
                }
              />
            </SelectTrigger>

            <SelectContent>
              {categories.map(
                (category) => (
                  <SelectItem
                    key={category.id}
                    value={category.id}
                  >
                    {category.name}
                  </SelectItem>
                )
              )}
            </SelectContent>
          </Select>
        </div>

        {/* ================= SUBCATEGORY ================= */}

        {form.category_id && (
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Subcategory
            </label>

            <Select
              value={
                form.subcategory_id
              }
              onValueChange={
                handleSubcategoryChange
              }
              disabled={
                subcategoriesLoading ||
                subcategories.length === 0
              }
            >
              <SelectTrigger className="h-12 rounded-xl">
                <SelectValue
                  placeholder={
                    subcategoriesLoading
                      ? "Subcategory load হচ্ছে..."
                      : subcategories.length
                      ? "Subcategory নির্বাচন করুন"
                      : "কোনো Subcategory নেই"
                  }
                />
              </SelectTrigger>

              <SelectContent>
                {subcategories.map(
                  (subcategory) => (
                    <SelectItem
                      key={
                        subcategory.id
                      }
                      value={
                        subcategory.id
                      }
                    >
                      {
                        subcategory.name
                      }
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* ================= DESCRIPTION ================= */}

        <div className="space-y-1">
          <label className="text-sm font-medium">
            Description
          </label>

          <div className="relative">
            <FileText className="absolute left-3 top-3 h-5 w-5 text-slate-400" />

            <Textarea
              className="min-h-28 rounded-xl pl-10"
              maxLength={500}
              placeholder="Product সম্পর্কে বিস্তারিত লিখুন..."
              value={form.description}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  description:
                    e.target.value,
                }))
              }
            />
          </div>

          <p className="text-right text-xs text-slate-400">
            {form.description.length}
            /500
          </p>
        </div>

        {/* ================= ERROR ================= */}

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm leading-6 text-red-600">
            {error}
          </div>
        )}

        {/* ================= SUBMIT ================= */}

        <Button
          type="button"
          onClick={handleSubmit}
          disabled={
            loading ||
            categoriesLoading
          }
          className="h-12 w-full rounded-xl"
        >
          {loading
            ? "Saving..."
            : initialProduct
            ? "Submit for Review"
            : "Submit Product for Review"}
        </Button>
      </CardContent>
    </Card>
  );
}