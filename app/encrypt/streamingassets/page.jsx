import StreamingAssetsPageContent from "./StreamingAssetsPageContent";
import { PAGE_TITLES, PAGE_DESCRIPTIONS } from "@/lib/constants";

export const metadata = {
  title: PAGE_TITLES.encrypt,
  description: PAGE_DESCRIPTIONS.encrypt,
};

export default function StreamingAssetsPage() {
  return <StreamingAssetsPageContent />;
}
