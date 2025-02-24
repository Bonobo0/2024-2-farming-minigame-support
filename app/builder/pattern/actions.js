"use server";

import { getMonsterData } from "@/lib/github";

export async function getMonsterMap() {
  const monsterData = await getMonsterData();
  const monsterMap = {};
  monsterData?.forEach((monster) => {
    monsterMap[monster.name] = monster.korName;
  });
  return monsterMap;
}
