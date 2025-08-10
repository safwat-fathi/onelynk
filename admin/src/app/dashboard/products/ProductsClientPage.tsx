"use client";

import { useState } from "react";
import { Product } from "@/domains/products/products.types";
import { Input } from "@/components/ui/Input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/Select";
import { ProductsTable } from "./ProductsTable";
import { Button } from "@/components/ui/Button";

interface ProductsClientPageProps {
	products: Product[];
}

export function ProductsClientPage({ products }: ProductsClientPageProps) {
	const [search, setSearch] = useState("");
	const [status, setStatus] = useState("all");

	const filteredProducts = products.filter(product => {
		const searchLower = search.toLowerCase();
		const matchesSearch =
			product.name.toLowerCase().includes(searchLower) ||
			product.user.name.toLowerCase().includes(searchLower);

		const matchesStatus =
			status === "all" || product.status.toLowerCase() === status;

		return matchesSearch && matchesStatus;
	});

	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center">
				<h1 className="text-3xl font-bold">Products</h1>
				<Button>Add Product</Button>
			</div>

			<div className="flex items-center space-x-4">
				<Input
					placeholder="Search by product or owner..."
					value={search}
					onChange={e => setSearch(e.target.value)}
					className="max-w-sm"
				/>
				<Select value={status} onValueChange={setStatus}>
					<SelectTrigger className="w-[180px]">
						<SelectValue placeholder="Filter by status" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">All Statuses</SelectItem>
						<SelectItem value="available">Available</SelectItem>
						<SelectItem value="sold">Sold</SelectItem>
					</SelectContent>
				</Select>
			</div>

			<ProductsTable products={filteredProducts} />
		</div>
	);
}
