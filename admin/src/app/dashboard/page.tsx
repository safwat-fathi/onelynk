import { getMe } from "@/domains/auth/auth.service";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    redirect("/login");
  }

  try {
    const user = await getMe(accessToken);

    const handleLogout = async () => {
      'use server';
      cookieStore.delete("accessToken");
      redirect("/login");
    };

    return (
      <div className="p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Welcome, {user.name}!</h1>
          <form action={handleLogout}>
            <button type="submit" className="btn btn-primary">Logout</button>
          </form>
        </div>
        <p>This is the main dashboard content.</p>
      </div>
    );
  } catch (error) {
    redirect("/login");
  }
}
