"use client";

import SearchInput from "@/components/ui/SearchInput";
import { FunnelIcon } from "@heroicons/react/24/outline";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { revalidateProducts } from "@/app/actions/products";

interface ProductsFilterProps {
  searchParams?: {
    search?: string;
    status?: string;
  };
}

const ProductsFilter = ({ searchParams }: ProductsFilterProps) => {
  const router = useRouter();
  const urlSearchParams = useSearchParams();
  
  const [searchQuery, setSearchQuery] = useState(searchParams?.search || "");
  const [selectedStatus, setSelectedStatus] = useState(searchParams?.status || "");

  // Update local state when searchParams change
  useEffect(() => {
    setSearchQuery(searchParams?.search || "");
    setSelectedStatus(searchParams?.status || "");
  }, [searchParams]);

  const handleSearch = (query: string) => {
		// Update local state but don't apply filters yet for real-time search
		setSearchQuery(query);
	};

  const applyFilters = (filters: { 
    search?: string; 
    status?: string;
  }) => {
    const params = new URLSearchParams(urlSearchParams);
    
    // Reset to page 1 when applying filters
    params.set("page", "1");
    
    if (filters.search !== undefined) {
      if (filters.search) {
        params.set("search", filters.search);
      } else {
        params.delete("search");
      }
    }
    
    if (filters.status !== undefined) {
      if (filters.status) {
        params.set("status", filters.status);
      } else {
        params.delete("status");
      }
    }
    
    router.push(`?${params.toString()}`);
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatus(e.target.value);
    // Apply status filter immediately when changed
    applyFilters({
      search: searchQuery,
      status: e.target.value,
    });
  };

  const handleFilterClick = () => {
    applyFilters({
      search: searchQuery,
      status: selectedStatus,
    });
    
    // Revalidate products cache
    revalidateProducts();
  };

  const handleResetFilters = () => {
		setSearchQuery("");
		setSelectedStatus("");
		const params = new URLSearchParams(urlSearchParams);
		params.delete("search");
		params.delete("status");
		params.set("page", "1");
		router.push(`?${params.toString()}`);

		// Revalidate products cache
		revalidateProducts();
		// Notify parent component about search changes for real-time filtering
		const event = new CustomEvent("productSearch", { detail: { query: "" } });
		window.dispatchEvent(event);
	};

	return (
		<div className="flex flex-col lg:flex-row gap-4 mb-6">
			<div className="form-control me-auto w-80">
				<SearchInput
					onSearch={handleSearch}
					placeholder="Search products, posts, customers..."
					localStorageKey="products-search"
					value={searchQuery}
					onChange={e => setSearchQuery(e.target.value)}
					enableUrlUpdate={false} // Disable URL updates for real-time search
				/>
			</div>
			<div className="flex gap-2">
				<select
					className="select select-bordered"
					value={selectedStatus}
					onChange={handleStatusChange}
				>
					<option value="">All Status</option>
					<option value="available">Available</option>
					<option value="out_of_stock">Out of Stock</option>
				</select>
				<button className="btn btn-outline" onClick={handleFilterClick}>
					<FunnelIcon className="h-5 w-5" />
					Filter
				</button>
				{(searchQuery || selectedStatus) && (
					<button className="btn btn-ghost" onClick={handleResetFilters}>
						Reset
					</button>
				)}
			</div>
		</div>
	);
};

export default ProductsFilter;
