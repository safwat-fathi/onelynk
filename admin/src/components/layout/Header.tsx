"use client";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { Input } from "@/components/ui/Input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/Sheet";
import { Menu, Package2, Search } from "lucide-react";
import { Button } from "../ui/Button";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import LogoutButton from "@/app/dashboard/LogoutButton";

const navLinks = [
	{ href: "/dashboard", label: "Dashboard" },
	{ href: "/dashboard/orders", label: "Orders" },
	{ href: "/dashboard/products", label: "Products" },
	{ href: "/dashboard/customers", label: "Customers" },
	{ href: "/dashboard/analytics", label: "Analytics" },
];

export function Header() {
	const pathname = usePathname();
	return (
		<header className="flex h-14 items-center gap-4 border-b bg-background px-4 md:px-6">
			<nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
				<Link
					href="#"
					className="flex items-center gap-2 text-lg font-semibold md:text-base"
				>
					<Package2 className="h-6 w-6" />
					<span className="sr-only">ZeeLink</span>
				</Link>
				{navLinks.map(link => (
					<Link
						key={link.href}
						href={link.href}
						className={cn(
							"transition-colors hover:text-foreground",
							pathname === link.href
								? "text-foreground"
								: "text-muted-foreground",
						)}
					>
						{link.label}
					</Link>
				))}
			</nav>
			<Sheet>
				<SheetTrigger asChild>
					<Button variant="outline" size="icon" className="shrink-0 md:hidden">
						<Menu className="h-5 w-5" />
						<span className="sr-only">Toggle navigation menu</span>
					</Button>
				</SheetTrigger>
				<SheetContent side="left">
					<nav className="grid gap-6 text-lg font-medium">
						<Link
							href="#"
							className="flex items-center gap-2 text-lg font-semibold"
						>
							<Package2 className="h-6 w-6" />
							<span className="sr-only">ZeeLink</span>
						</Link>
						{navLinks.map(link => (
							<Link
								key={link.href}
								href={link.href}
								className={cn(
									"transition-colors hover:text-foreground",
									pathname === link.href
										? "text-foreground"
										: "text-muted-foreground",
								)}
							>
								{link.label}
							</Link>
						))}
					</nav>
				</SheetContent>
			</Sheet>

			<div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
				<form className="ml-auto flex-1 sm:flex-initial">
					<div className="relative">
						<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
						<Input
							type="search"
							placeholder="Search products..."
							className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
						/>
					</div>
				</form>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="secondary" size="icon" className="rounded-full">
							<Image
								src="/placeholder.png"
								width="36"
								height="36"
								alt="Avatar"
								className="rounded-full"
							/>
							<span className="sr-only">Toggle user menu</span>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuLabel>My Account</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem>Settings</DropdownMenuItem>
						<DropdownMenuItem>Support</DropdownMenuItem>
						<DropdownMenuSeparator />
						<LogoutButton />
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</header>
	);
}
