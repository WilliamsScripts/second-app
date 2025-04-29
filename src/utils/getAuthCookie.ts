import { cookies } from "next/headers";

export async function getAuthCookie() {
  const cookieStore = await cookies();
  console.log("Getting auth cookie:", cookieStore.get("access_token"));
  return cookieStore.get("access_token")?.value;
}
