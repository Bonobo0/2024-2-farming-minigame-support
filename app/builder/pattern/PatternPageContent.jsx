"use client";

import PatternBuilder from "@/components/pattern/PatternBuilder";
import Hero from "@/components/hero/Hero";

export default function PatternPageContent({ initialMonsterData }) {
  return (
    <div className="min-h-screen bg-base-200">
      <Hero
        title="Spawn Pattern Builder"
        description={
          <>
            몬스터 스폰 패턴을 쉽게 생성하고 JSON 형식으로 내보낼 수 있습니다.
            <br />
            입력한 데이터는 자동으로 저장됩니다.
          </>
        }
      />
      <div className="container mx-auto px-4">
        <PatternBuilder monster_data={initialMonsterData} />
      </div>
    </div>
  );
}
