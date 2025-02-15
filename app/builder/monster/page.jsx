import { PAGE_TITLES, PAGE_DESCRIPTIONS } from "@/lib/constants";
import MonsterPageContent from "./MonsterPageContent";

export const metadata = {
  title: PAGE_TITLES.monster,
  description: PAGE_DESCRIPTIONS.monster,
};

export default function Page() {
  return <MonsterPageContent />;
}
