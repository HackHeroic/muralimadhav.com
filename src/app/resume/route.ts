import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.redirect("https://dub.sh/aryans-resume", { status: 301 });
}
