import { getProducts } from "@/domains/products/products.service";
import { Product } from "@/domains/products/products.types";

// The component is now async to allow for server-side data fetching.
export default async function ProductsPage() {
	let products: Product[] = [];
	let error: string | null = null;

	// Fetch data directly on the server.
	try {
		products = await getProducts();
	} catch (err) {
		// If fetching fails, we'll render an error message.
		console.error("Failed to fetch products:", err);
		error = "Failed to load products. Please try again later.";
	}

	// Handle the error case by rendering an error message.
	if (error) {
		return <div className="text-red-500 p-4">{error}</div>;
	}

	// Render the page content with the fetched data.
	return (
		<div>
			<h1 className="text-2xl font-bold mb-4">Manage Products</h1>
			<div className="overflow-x-auto">
				<table className="table w-full">
					<thead>
						<tr>
							<th>Name</th>
							<th>Price</th>
							<th>Status</th>
							<th>Owner</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{products.map(product => (
							<tr key={product.id}>
								<td>
									<div className="flex items-center space-x-3">
										<div className="avatar">
											<div className="mask mask-squircle w-12 h-12">
												{/* It's good practice to ensure image URLs are valid */}
												<img
													src={product.image_url || "/placeholder.png"} // Added a fallback image
													alt={product.name}
												/>
											</div>
										</div>
										<div>
											<div className="font-bold">{product.name}</div>
										</div>
									</div>
								</td>
								<td>${product.price.toFixed(2)}</td>
								<td>
									<span
										className={`badge ${
											product.status === "available"
												? "badge-success"
												: "badge-warning"
										}`}
									>
										{product.status}
									</span>
								</td>
								<td>{product.user.name}</td>
								<th>
									{/* Note: Interactive elements might need to be client components */}
									<button className="btn btn-ghost btn-xs">details</button>
								</th>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
