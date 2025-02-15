import { App } from "octokit";
import { GITHUB_APP } from "./constants";

export async function getMonsterData() {
  try {
    const app = new App({
      appId: GITHUB_APP.APP_ID,
      privateKey: GITHUB_APP.PRIVATE_KEY,
    });

    const octokit = await app.getInstallationOctokit(
      GITHUB_APP.INSTALLATION_ID
    );

    const { data } = await octokit.rest.repos.getContent({
      owner: GITHUB_APP.REPO_OWNER,
      repo: GITHUB_APP.REPO_NAME,
      path: GITHUB_APP.FILE_PATH,
      ref: "main", // 명시적으로 브랜치 지정
    });

    if (!data || !data.content) {
      throw new Error("No content found");
    }

    const content = Buffer.from(data.content, "base64").toString();
    return JSON.parse(content);
  } catch (error) {
    console.error("Error fetching monster data:", error);
    return [];
  }
}
