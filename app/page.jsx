"use client";
import Image from "next/image";
import Link from "next/link";
import { useLoading } from "@/components/LoadingProvider";

export default function Home() {
  const { setLoading } = useLoading();

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
          <Link
            href="/builder/pattern"
            className="group"
            onClick={handleClick("/builder/pattern")}
          >
            <div className="h-full p-6 bg-white rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-all hover:scale-[1.02]">
              <div className="flex items-center gap-3 mb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-blue-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                  />
                </svg>
                <h2 className="text-xl font-semibold text-slate-700">
                  스폰 패턴
                </h2>
              </div>
              <p className="text-slate-600 mb-4">
                몬스터 스폰 패턴을 생성하고 관리합니다
              </p>
              <span className="text-blue-500 group-hover:translate-x-1 transition-transform inline-flex items-center">
                시작하기
                <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M13.75 6.75L19.25 12L13.75 17.25"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M19 12H4.75"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>
          </Link>

          <Link
            href="/builder/monster"
            className="group"
            onClick={handleClick("/builder/monster")}
          >
            <div className="h-full p-6 bg-white rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-all hover:scale-[1.02]">
              <div className="flex items-center gap-3 mb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-purple-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
                  />
                </svg>
                <h2 className="text-xl font-semibold text-slate-700">몬스터</h2>
              </div>
              <p className="text-slate-600 mb-4">
                몬스터의 기본 데이터를 설정합니다
              </p>
              <div className="badge badge-neutral">Coming Soon</div>
            </div>
          </Link>

          <Link
            href="/builder/item"
            className="group"
            onClick={handleClick("/builder/item")}
          >
            <div className="h-full p-6 bg-white rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-all hover:scale-[1.02]">
              <div className="flex items-center gap-3 mb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-amber-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                  />
                </svg>
                <h2 className="text-xl font-semibold text-slate-700">아이템</h2>
              </div>
              <p className="text-slate-600 mb-4">
                게임 내 아이템 데이터를 관리합니다
              </p>
              <div className="badge badge-neutral">Coming Soon</div>
            </div>
          </Link>
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
