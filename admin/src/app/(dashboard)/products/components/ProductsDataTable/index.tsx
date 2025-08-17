"use client";

import DataTable from "@/components/ui/DataTable";
import { Product } from "@/shared/types/product";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useRouter, useSearchParams } from "next/navigation";
import { PaginatedResponse } from "@/shared/types/api";

interface ProductsDataTableProps {
  productsData: PaginatedResponse<Product>;
}

const ProductsDataTable = ({ productsData }: ProductsDataTableProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

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
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push(`?${params.toString()}`);
  };

  return (
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
  );
};

export default ProductsDataTable;
