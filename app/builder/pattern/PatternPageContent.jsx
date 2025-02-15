"use client";

import PatternBuilder from "@/components/PatternBuilder";

export default function PatternPageContent({ initialMonsterData }) {
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
        <PatternBuilder monster_data={initialMonsterData} />
      </div>
    </div>
  );
}
