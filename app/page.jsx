"use client";
import Image from "next/image";
import Link from "next/link";
import { useLoading } from "@/components/LoadingProvider";
import FeatureCard from "@/components/navigation/FeatureCard";
import {
  PatternIcon,
  MonsterIcon,
  ItemIcon,
} from "@/components/navigation/NavigationIcons";

export default function Home() {
  const { setLoading } = useLoading();

  const features = [
    {
      href: "/builder/pattern",
      icon: <PatternIcon />,
      title: "스폰 패턴",
      description: "몬스터 스폰 패턴을 생성하고 관리합니다",
      isComingSoon: false,
    },
    {
      href: "/builder/monster",
      icon: <MonsterIcon />,
      title: "몬스터",
      description: "몬스터의 기본 데이터를 설정합니다",
      isComingSoon: true,
    },
    {
      href: "/builder/item",
      icon: <ItemIcon />,
      title: "아이템",
      description: "게임 내 아이템 데이터를 관리합니다",
      isComingSoon: true,
    },
  ];

  const handleClick = (path) => () => {
    setLoading(path);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">FARMING</h1>
          <p className="text-lg text-slate-600">미니게임 데이터 제작 도구</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature) => (
            <FeatureCard key={feature.href} {...feature} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-slate-500">
            파밍 동아리 2024-2 미니게임 1팀의 게임 개발을 위한 데이터 관리
            도구입니다.
          </p>
        </div>
      </main>
    </div>
  );
}
