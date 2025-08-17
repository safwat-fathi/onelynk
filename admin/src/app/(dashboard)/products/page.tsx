import { PlusIcon } from "@heroicons/react/24/outline";
import ProductsFilter from "./components/Filter";
import ProductsDataTable from "./components/ProductsDataTable";
import { Suspense } from "react";
import { getProductsUseCase } from "@/use-cases/products/get-products.use-case";
import { PaginatedResponse } from "@/shared/types/api";
import { Product } from "@/shared/types/product";

export const metadata = {
	title: "Products",
};

interface ProductsPageProps {
	searchParams: Promise<{
		page?: string;
		search?: string;
		status?: string;
	}>;
}

export default async function ProductsPage({
	searchParams,
}: ProductsPageProps) {
	// Await the searchParams promise to get the actual values
	const { search, status, page } = await searchParams;

	const currentPage = parseInt(page || "1", 10);
	const limit = 10;

	const productsData: PaginatedResponse<Product> =
		await getProductsUseCase.execute({
			page: currentPage,
			limit,
			search: search,
			status: status,
		});

	// Create a key for the Suspense component that changes when filters or pagination change
	const suspenseKey = `${page || "1"}-${search || ""}-${status || ""}`;

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-bold">Products</h1>
					<p className="text-base-content/60 mt-1">
						Manage your product inventory
					</p>
				</div>
				<button className="btn btn-primary">
					<PlusIcon className="h-5 w-5" />
					Add Product
				</button>
			</div>

			<div className="card bg-base-100 shadow-sm">
				<div className="card-body">
					<ProductsFilter searchParams={{ search, status }} />

					<Suspense key={suspenseKey} fallback={<div>Loading...</div>}>
						<ProductsDataTable productsData={productsData} />
					</Suspense>
				</div>
			</div>
		</div>
	);
}
