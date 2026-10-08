export function getSellingPrice(product) {
  const price = Number(product?.price || 0);

  const discountPrice = Number(
    product?.discount_price || 0
  );

  if (
    discountPrice > 0 &&
    discountPrice < price
  ) {
    return discountPrice;
  }

  return price;
}

export function getApprovalLabel(status) {
  switch (status) {
    case "approved":
      return "Approved";

    case "rejected":
      return "Rejected";

    case "pending":
      return "Pending";

    default:
      return status || "Unknown";
  }
}

export function getApprovalClass(status) {
  switch (status) {
    case "approved":
      return "bg-emerald-100 text-emerald-700";

    case "rejected":
      return "bg-red-100 text-red-700";

    case "pending":
      return "bg-amber-100 text-amber-700";

    default:
      return "bg-slate-100 text-slate-700";
  }
}

export function getProductStatusClass(status) {
  if (status === "active") {
    return "bg-emerald-100 text-emerald-700";
  }

  return "bg-slate-100 text-slate-700";
}