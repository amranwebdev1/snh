"use server";

import { cookies } from "next/headers";

export async function setAppMode(mode) {
  if (mode !== "seller" && mode !== "user") {
    throw new Error("Invalid app mode");
  }

  const cookieStore = await cookies();

  cookieStore.set("app_mode", mode, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });

  return { success: true };
}