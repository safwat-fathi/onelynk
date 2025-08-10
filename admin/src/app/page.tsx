import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function Home() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (accessToken) {
    redirect("/dashboard");
  } else {
    redirect("/login");
  }
}
