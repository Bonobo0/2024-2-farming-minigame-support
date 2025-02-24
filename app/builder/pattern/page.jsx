import { PAGE_TITLES, PAGE_DESCRIPTIONS } from "@/lib/constants";
import PatternPageContent from "./PatternPageContent";
import { getMonsterMap } from "./actions";

export const metadata = {
  title: PAGE_TITLES.pattern,
  description: PAGE_DESCRIPTIONS.pattern,
};

export default async function Page() {
  const monsterMap = await getMonsterMap();
  return <PatternPageContent initialMonsterData={monsterMap} />;
}
