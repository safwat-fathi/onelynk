"use client";

import DataTable from "@/components/ui/DataTable";
import { Product } from "@/shared/types/product";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useRouter, useSearchParams } from "next/navigation";
import { PaginatedResponse } from "@/shared/types/api";
import { useEffect, useState } from "react";

interface ProductsDataTableProps {
  productsData: PaginatedResponse<Product>;
  searchParams?: {
    search?: string;
    status?: string;
    page?: string;
  };
}

const ProductsDataTable = ({ productsData: initialProductsData, searchParams }: ProductsDataTableProps) => {
  const router = useRouter();
  const urlSearchParams = useSearchParams();
  const [productsData, setProductsData] = useState(initialProductsData);
  const [loading, setLoading] = useState(false);

  // Listen for search events
  useEffect(() => {
    const handleSearch = async (event: CustomEvent) => {
      const { query } = event.detail;
      await fetchProducts(query, searchParams?.status);
    };

    window.addEventListener('productSearch', handleSearch as EventListener);
    return () => {
      window.removeEventListener('productSearch', handleSearch as EventListener);
    };
  }, [searchParams?.status]);

  // Fetch products with search query
  const fetchProducts = async (searchQuery?: string, status?: string) => {
    setLoading(true);
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001/api';
      const page = parseInt(searchParams?.page || '1', 10);
      const limit = 10;
      
      // Build query string
      const queryParams = new URLSearchParams();
      queryParams.set('page', page.toString());
      queryParams.set('limit', limit.toString());
      
      if (searchQuery) {
        queryParams.set('search', searchQuery);
      }
      
      if (status) {
        queryParams.set('status', status);
      }
      
      const url = `${baseUrl}/products?${queryParams.toString()}`;
      
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setProductsData(data);
      }
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product: Product) => {
    console.log("Edit product", product);
    // Implement edit functionality
  };

  const handleDelete = (productId: number) => {
    console.log("Delete product", productId);
    // Implement delete functionality
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  // Format stock status (based on status field now)
  const renderStockStatus = (status: string) => {
    let badgeClass = "badge-success";
    let text = "Available";

    if (status === "out_of_stock") {
      badgeClass = "badge-error";
      text = "Out of Stock";
    }

    return <span className={`badge ${badgeClass}`}>{text}</span>;
  };

  // Format product status
  const renderProductStatus = (status: string) => {
    const statusClasses: Record<string, string> = {
      available: "badge-success",
      out_of_stock: "badge-error"
    };
    
    const badgeClass = statusClasses[status] || "badge-neutral";
    const displayText = status === "out_of_stock" ? "Out of Stock" : "Available";
    return <span className={`badge ${badgeClass}`}>{displayText}</span>;
  };

  // Render product name with image
  const renderProductName = (product: Product) => {
    return (
      <div className="flex items-center gap-3">
        <div className="avatar">
          <div className="mask mask-squircle w-12 h-12">
            <div className="bg-base-200 w-12 h-12 flex items-center justify-center">
              <span className="text-xs">
                {product.image_url ? "IMG" : "NO IMG"}
              </span>
            </div>
          </div>
        </div>
        <div>
          <div className="font-bold">{product.name}</div>
          <div className="text-sm opacity-50">ID: #{product.id}</div>
        </div>
      </div>
    );
  };

  // Render action buttons
  const renderActions = (product: Product) => (
    <div className="flex gap-2">
      <button
        className="btn btn-ghost btn-xs"
        onClick={() => handleEdit(product)}
      >
        <PencilIcon className="h-4 w-4" />
      </button>
      <button
        className="btn btn-ghost btn-xs text-error"
        onClick={() => handleDelete(product.id)}
      >
        <TrashIcon className="h-4 w-4" />
      </button>
    </div>
  );

  const columns = [
    {
      header: "Product",
      accessor: renderProductName,
    },
    {
      header: "Price",
      accessor: (product: Product) => formatCurrency(product.price),
    },
    {
      header: "Stock",
      accessor: (product: Product) => renderStockStatus(product.status),
    },
    {
      header: "Status",
      accessor: (product: Product) => renderProductStatus(product.status),
    },
  ];

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(urlSearchParams);
    params.set("page", page.toString());
    router.push(`?${params.toString()}`);
  };

  return (
    <div>
      {loading && <div className="mb-4">Searching...</div>}
      <DataTable<Product>
        data={productsData.data}
        columns={columns}
        renderActions={renderActions}
        pagination={{
          currentPage: productsData.page,
          totalPages: productsData.totalPages,
          totalItems: productsData.total,
          onPageChange: handlePageChange,
        }}
      />
    </div>
  );
};

export default ProductsDataTable;
