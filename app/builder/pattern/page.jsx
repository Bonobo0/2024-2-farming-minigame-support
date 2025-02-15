import { use } from "react";
import PatternBuilder from "@/components/PatternBuilder";
import { PAGE_TITLES } from "@/lib/constants";
import { getMonsterData } from "@/lib/github";

export const metadata = {
  title: PAGE_TITLES.pattern,
};

async function getData() {
  const monsterData = await getMonsterData();
  const monsterMap = {};
  monsterData.forEach((monster) => {
    monsterMap[monster.name] = monster.korName;
  });
  return monsterMap;
}

export default function SpawnPatternBuilder() {
  const monsterMap = use(getData());

  return (
    <div className="min-h-screen bg-base-200">
      <div className="hero bg-base-100 shadow-lg py-8 mb-8">
        <div className="hero-content text-center">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold">Spawn Pattern Builder</h1>
            <p className="py-4 text-base-content/70">
              몬스터 스폰 패턴을 쉽게 생성하고 JSON 형식으로 내보낼 수 있습니다.{" "}
              <br />
              입력한 데이터는 자동으로 저장됩니다.
            </p>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4">
        <PatternBuilder monster_data={monsterMap} />
      </div>
    </div>
  );
}
