import { NextResponse } from "next/server";
import { getMonsterData } from "@/lib/github";

export async function GET() {
  try {
    const data = await getMonsterData();
    return NextResponse.json({ data });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch monster data" },
      { status: 500 }
    );
  }
}
