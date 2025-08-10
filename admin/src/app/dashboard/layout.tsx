import { getMe } from "@/domains/auth/auth.service";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import LogoutButton from "./LogoutButton";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    redirect("/login");
  }

  try {
    await getMe(accessToken);
  } catch (error) {
    redirect("/login");
  }

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-start p-4">
        <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden mb-4">
          Open Menu
        </label>
        {children}
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
          <li className="text-xl font-bold p-4">ZeeLink Admin</li>
          <li><Link href="/dashboard">Dashboard</Link></li>
          <li><Link href="/dashboard/products">Products</Link></li>
          <li><Link href="/dashboard/links">Links</Link></li>
          {/* Add other links here */}
          <li className="mt-auto">
            <LogoutButton />
          </li>
        </ul>
      </div>
    </div>
  );
}
