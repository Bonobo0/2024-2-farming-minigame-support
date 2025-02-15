export const GITHUB_APP = {
  APP_ID: process.env.GITHUB_APP_ID,
  PRIVATE_KEY: process.env.GITHUB_PRIVATE_KEY,
  INSTALLATION_ID: process.env.GITHUB_INSTALLATION_ID,
  REPO_OWNER: "bonobo0",
  REPO_NAME: "forked-2024-2-farming-minigame",
  FILE_PATH: "Assets/Data/MonsterData.json",
};

export const PAGE_TITLES = {
  home: "Farming Game Tools",
  pattern: "스폰 패턴 생성기 | Farming Game Tools",
  monster: "몬스터 데이터 생성기 | Farming Game Tools",
  item: "아이템 데이터 생성기 | Farming Game Tools",
};

export const PAGE_DESCRIPTIONS = {
  pattern:
    "몬스터 스폰 패턴을 쉽게 생성하고 JSON 형식으로 관리할 수 있는 도구입니다.",
  monster:
    "몬스터 데이터를 쉽게 생성하고 JSON 형식으로 관리할 수 있는 도구입니다.",
  item: "아이템 데이터를 쉽게 생성하고 JSON 형식으로 관리할 수 있는 도구입니다.",
};

export const API_ENDPOINTS = {
  MONSTER_DATA: "/api/monster",
};
