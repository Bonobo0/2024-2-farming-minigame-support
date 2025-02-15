"use client";

import { useState } from "react";
import Hero from "@/components/hero/Hero";
import EquipItemBuilder from "@/components/item/EquipItemBuilder";
import DropItemBuilder from "@/components/item/DropItemBuilder";
import MainWeaponBuilder from "@/components/item/MainWeaponBuilder";
import SubWeaponBuilder from "@/components/item/SubWeaponBuilder";

export default function ItemPageContent() {
  const [activeTab, setActiveTab] = useState("equip");

  const tabs = [
    { id: "equip", label: "장착 아이템", component: EquipItemBuilder },
    { id: "drop", label: "드롭 아이템", component: DropItemBuilder },
    { id: "main", label: "메인 무기", component: MainWeaponBuilder },
    { id: "sub", label: "선택 무기", component: SubWeaponBuilder },
  ];

  const ActiveComponent =
    tabs.find((tab) => tab.id === activeTab)?.component || EquipItemBuilder;

  return (
    <div className="min-h-screen bg-base-200">
      <Hero
        title="Item Builder"
        description="게임에 사용될 다양한 아이템 데이터를 생성할 수 있습니다."
      />

      <div className="container mx-auto px-2 sm:px-4">
        <div className="tabs tabs-boxed mb-2 sm:mb-4 flex flex-wrap justify-center gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`tab tab-sm sm:tab-md ${
                activeTab === tab.id ? "tab-active" : ""
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div
          className="bg-base-100 rounded-box shadow-xl w-full min-h-screen mx-auto
                      max-w-[95%] sm:max-w-[90%] lg:max-w-[85%] xl:max-w-[75%]"
        >
          <ActiveComponent />
        </div>
      </div>
    </div>
  );
}
