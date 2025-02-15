import { PAGE_TITLES, PAGE_DESCRIPTIONS } from "@/lib/constants";
import ItemPageContent from "./ItemPageContent";

export const metadata = {
  title: PAGE_TITLES.item,
  description: PAGE_DESCRIPTIONS.item,
};

export default function Page() {
  return <ItemPageContent />;
}
