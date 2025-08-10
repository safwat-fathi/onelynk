import React from "react";
import { getMe } from "@/domains/auth/auth.service";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";

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
		<div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
			<Sidebar />
			<div className="flex flex-col">
				<Header />
				<main className="flex-1 bg-muted/40 p-4 md:p-6">{children}</main>
			</div>
		</div>
	);
}
