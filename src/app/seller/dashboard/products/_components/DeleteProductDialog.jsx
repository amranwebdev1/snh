"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { deleteProduct } from "../lib/deleteProduct";

export default function DeleteProductDialog({
  open,
  onOpenChange,
  product,
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);

      await toast.promise(deleteProduct(product.id), {
        loading: "Product সরানো হচ্ছে...",
        success: "Product সফলভাবে সরানো হয়েছে",
        error: (err) => err.message || "Product সরানো যায়নি",
      });

      onOpenChange(false);
      router.refresh();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Product সরাতে চান?
          </AlertDialogTitle>

          <AlertDialogDescription>
            এই Product আপনার Shop থেকে লুকানো হবে। আগের Order History
            অক্ষত থাকবে এবং চাইলে ভবিষ্যতে Restore করা যাবে।
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={handleDelete}
            disabled={loading}
            className="bg-red-600 hover:bg-red-700"
          >
            {loading ? "Removing..." : "Remove"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}