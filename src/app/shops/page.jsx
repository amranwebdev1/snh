import { getApprovedShops } from "@/lib/shop/getApprovedShops";
import Main from "./_components/Main";

export default async function AllStoresPage() {
  const shops = await getApprovedShops();

  return <Main shops={shops} />;
}