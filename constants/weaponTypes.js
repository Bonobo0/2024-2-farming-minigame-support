"use client";

import { useGoogleSheet } from "@/hooks/useGoogleSheet";
import { SHEETS } from "@/config/sheets";

export function useWeaponTypes() {
  const {
    data: weaponTypes,
    loading,
    error,
  } = useGoogleSheet(SHEETS.WEAPON_TYPES.id, SHEETS.WEAPON_TYPES.range);

  const { data: attackTypes } = useGoogleSheet(
    SHEETS.ATTACK_TYPES.id,
    SHEETS.ATTACK_TYPES.range
  );

  return {
    SUB_WEAPON_TYPES: weaponTypes || [],
    ATTACK_DIRECTION_TYPES: attackTypes || [],
    loading,
    error,
  };
}
export const SUB_WEAPON_TYPES = [
  { id: 0, name: "종이 비행기" },
  { id: 1, name: "애착 인형" },
  { id: 2, name: "가족 사진" },
  { id: 3, name: "나이프" },
];
export const ATTACK_DIRECTION_TYPES = [
  { id: 0, name: "근접" },
  { id: 1, name: "조준" },
];
