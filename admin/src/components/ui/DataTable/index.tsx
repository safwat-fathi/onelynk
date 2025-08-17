"use client";

import { ReactNode } from "react";

interface Column<T> {
  header: string;
  accessor: keyof T | ((item: T) => ReactNode);
  className?: string;
}

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  onPageChange: (page: number) => void;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  renderActions?: (item: T) => ReactNode;
  pagination?: PaginationProps;
  className?: string;
}

const DataTable = <T extends { id: string | number }>({
  data,
  columns,
  renderActions,
  pagination,
  className = "",
}: DataTableProps<T>) => {
  const getCellValue = (item: T, column: Column<T>): ReactNode => {
    if (typeof column.accessor === "function") {
      return column.accessor(item);
    }
    return String(item[column.accessor]);
  };

  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="table">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index} className={column.className}>
                {column.header}
              </th>
            ))}
            {renderActions && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              {columns.map((column, index) => (
                <td key={index} className={column.className}>
                  {getCellValue(item, column)}
                </td>
              ))}
              {renderActions && <td>{renderActions(item)}</td>}
            </tr>
          ))}
        </tbody>
      </table>
      
      {pagination && (
        <div className="flex justify-between items-center mt-6">
          <div className="text-sm text-base-content/60">
            Showing {Math.min(pagination.totalItems, (pagination.currentPage - 1) * pagination.totalItems + data.length, pagination.totalItems)} of {pagination.totalItems} items
          </div>
          <div className="join">
            <button 
              className="join-item btn btn-sm"
              onClick={() => pagination.onPageChange(Math.max(1, pagination.currentPage - 1))}
              disabled={pagination.currentPage === 1}
            >
              «
            </button>
            {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                className={`join-item btn btn-sm ${pagination.currentPage === page ? "btn-active" : ""}`}
                onClick={() => pagination.onPageChange(page)}
              >
                {page}
              </button>
            ))}
            <button 
              className="join-item btn btn-sm"
              onClick={() => pagination.onPageChange(Math.min(pagination.totalPages, pagination.currentPage + 1))}
              disabled={pagination.currentPage === pagination.totalPages}
            >
              »
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;