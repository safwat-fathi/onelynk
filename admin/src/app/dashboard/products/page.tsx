import { getProducts } from "@/domains/products/products.service";
import { ProductsClientPage } from "./ProductsClientPage";

export default async function ProductsPage() {
	const products = await getProducts();

	return <ProductsClientPage products={products} />;
}
