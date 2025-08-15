import { 
  PlusIcon, 
  PencilIcon, 
  TrashIcon,
  MagnifyingGlassIcon,
  FunnelIcon
} from '@heroicons/react/24/outline'

const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 99.99,
    stock: 45,
    status: "active",
    image: "/api/placeholder/60/60"
  },
  {
    id: 2,
    name: "Smartphone Case",
    price: 24.99,
    stock: 120,
    status: "active",
    image: "/api/placeholder/60/60"
  },
  {
    id: 3,
    name: "USB Cable",
    price: 12.99,
    stock: 0,
    status: "draft",
    image: "/api/placeholder/60/60"
  },
  {
    id: 4,
    name: "Bluetooth Speaker",
    price: 79.99,
    stock: 15,
    status: "active",
    image: "/api/placeholder/60/60"
  }
]

export default function ProductsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Products</h1>
          <p className="text-base-content/60 mt-1">Manage your product inventory</p>
        </div>
        <button className="btn btn-primary">
          <PlusIcon className="h-5 w-5" />
          Add Product
        </button>
      </div>

      <div className="card bg-base-100 shadow-sm">
        <div className="card-body">
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="form-control flex-1">
              <div className="input-group">
                <input 
                  type="text" 
                  placeholder="Search products..." 
                  className="input input-bordered flex-1" 
                />
                <button className="btn btn-square">
                  <MagnifyingGlassIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
            <div className="flex gap-2">
              <select className="select select-bordered">
                <option>All Categories</option>
                <option>Electronics</option>
                <option>Accessories</option>
              </select>
              <select className="select select-bordered">
                <option>All Status</option>
                <option>Active</option>
                <option>Draft</option>
              </select>
              <button className="btn btn-outline">
                <FunnelIcon className="h-5 w-5" />
                Filter
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <div className="bg-base-200 w-12 h-12 flex items-center justify-center">
                              <span className="text-xs">IMG</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{product.name}</div>
                          <div className="text-sm opacity-50">ID: #{product.id}</div>
                        </div>
                      </div>
                    </td>
                    <td>${product.price}</td>
                    <td>
                      <span className={`badge ${product.stock === 0 ? 'badge-error' : product.stock < 20 ? 'badge-warning' : 'badge-success'}`}>
                        {product.stock === 0 ? 'Out of Stock' : `${product.stock} in stock`}
                      </span>
                    </td>
                    <td>
                      <span className={`badge ${product.status === 'active' ? 'badge-success' : 'badge-neutral'}`}>
                        {product.status}
                      </span>
                    </td>
                    <td>
                      <div className="flex gap-2">
                        <button className="btn btn-ghost btn-xs">
                          <PencilIcon className="h-4 w-4" />
                        </button>
                        <button className="btn btn-ghost btn-xs text-error">
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-center mt-6">
            <div className="text-sm text-base-content/60">
              Showing 4 of 4 products
            </div>
            <div className="join">
              <button className="join-item btn btn-sm">«</button>
              <button className="join-item btn btn-sm btn-active">1</button>
              <button className="join-item btn btn-sm">2</button>
              <button className="join-item btn btn-sm">»</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}