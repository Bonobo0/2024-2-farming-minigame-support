import { PAGE_TITLES, PAGE_DESCRIPTIONS } from "@/lib/constants";
import PatternPageContent from "./PatternPageContent";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  title: PAGE_TITLES.pattern,
  description: PAGE_DESCRIPTIONS.pattern,
};

export default async function Page() {
  const monsterData = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL || ""}/api/monster`,
    {
      cache: "no-store",
    }
  )
    .then((res) => res.json())
    .then((data) => data.data);

  const monsterMap = {};
  monsterData?.forEach((monster) => {
    monsterMap[monster.name] = monster.korName;
  });

  return <PatternPageContent initialMonsterData={monsterMap} />;
}
