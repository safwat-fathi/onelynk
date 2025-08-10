import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/Table";
import { Product } from "@/domains/products/products.types";
import Image from "next/image";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { MoreHorizontal } from "lucide-react";

interface ProductsTableProps {
	products: Product[];
}

export function ProductsTable({ products }: ProductsTableProps) {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead className="w-[80px]">Image</TableHead>
					<TableHead>Name</TableHead>
					<TableHead>Owner</TableHead>
					<TableHead>Price</TableHead>
					<TableHead>Status</TableHead>
					<TableHead className="w-[50px]">Actions</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{products.map(product => (
					<TableRow key={product.id}>
						<TableCell>
							<Image
								src={product.image_url || "/placeholder.png"}
								alt={product.name}
								width={48}
								height={48}
								className="rounded-md"
							/>
						</TableCell>
						<TableCell className="font-medium">{product.name}</TableCell>
						<TableCell>{product.user.name}</TableCell>
						<TableCell>${product.price.toFixed(2)}</TableCell>
						<TableCell>
							<Badge
								variant={
									product.status === "available" ? "default" : "secondary"
								}
							>
								{product.status}
							</Badge>
						</TableCell>
						<TableCell>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button variant="ghost" className="h-8 w-8 p-0">
										<span className="sr-only">Open menu</span>
										<MoreHorizontal className="h-4 w-4" />
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent align="end">
									<DropdownMenuItem>View Details</DropdownMenuItem>
									<DropdownMenuItem>Edit</DropdownMenuItem>
									<DropdownMenuItem className="text-red-500">
										Delete
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
