import { 
  EyeIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  ArrowDownTrayIcon
} from '@heroicons/react/24/outline'

const orders = [
  {
    id: "ORD-1001",
    customer: "John Doe",
    email: "john@example.com",
    date: "2024-01-15",
    status: "delivered",
    total: 127.99,
    items: 2
  },
  {
    id: "ORD-1002",
    customer: "Jane Smith",
    email: "jane@example.com",
    date: "2024-01-14",
    status: "pending",
    total: 89.50,
    items: 1
  },
  {
    id: "ORD-1003",
    customer: "Mike Wilson",
    email: "mike@example.com",
    date: "2024-01-14",
    status: "shipped",
    total: 245.00,
    items: 3
  },
  {
    id: "ORD-1004",
    customer: "Sarah Davis",
    email: "sarah@example.com",
    date: "2024-01-13",
    status: "cancelled",
    total: 156.75,
    items: 2
  },
  {
    id: "ORD-1005",
    customer: "Alex Johnson",
    email: "alex@example.com",
    date: "2024-01-13",
    status: "processing",
    total: 312.45,
    items: 4
  }
]

const getStatusBadge = (status: string) => {
  const statusConfig = {
    pending: { class: "badge-warning", text: "Pending" },
    processing: { class: "badge-info", text: "Processing" },
    shipped: { class: "badge-primary", text: "Shipped" },
    delivered: { class: "badge-success", text: "Delivered" },
    cancelled: { class: "badge-error", text: "Cancelled" }
  }
  const config = statusConfig[status as keyof typeof statusConfig]
  return <span className={`badge ${config.class}`}>{config.text}</span>
}

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Orders</h1>
          <p className="text-base-content/60 mt-1">Track and manage customer orders</p>
        </div>
        <button className="btn btn-primary">
          <ArrowDownTrayIcon className="h-5 w-5" />
          Export Orders
        </button>
      </div>

      <div className="card bg-base-100 shadow-sm">
        <div className="card-body">
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="form-control flex-1">
              <div className="input-group">
                <input 
                  type="text" 
                  placeholder="Search orders, customers..." 
                  className="input input-bordered flex-1" 
                />
                <button className="btn btn-square">
                  <MagnifyingGlassIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
            <div className="flex gap-2">
              <select className="select select-bordered">
                <option>All Status</option>
                <option>Pending</option>
                <option>Processing</option>
                <option>Shipped</option>
                <option>Delivered</option>
                <option>Cancelled</option>
              </select>
              <input type="date" className="input input-bordered" />
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
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td>
                      <div className="font-mono font-bold text-primary">{order.id}</div>
                    </td>
                    <td>
                      <div>
                        <div className="font-bold">{order.customer}</div>
                        <div className="text-sm opacity-50">{order.email}</div>
                      </div>
                    </td>
                    <td>{order.date}</td>
                    <td>{getStatusBadge(order.status)}</td>
                    <td>{order.items} items</td>
                    <td className="font-bold">${order.total}</td>
                    <td>
                      <button className="btn btn-ghost btn-sm">
                        <EyeIcon className="h-4 w-4" />
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-center mt-6">
            <div className="text-sm text-base-content/60">
              Showing 5 of 25 orders
            </div>
            <div className="join">
              <button className="join-item btn btn-sm">«</button>
              <button className="join-item btn btn-sm btn-active">1</button>
              <button className="join-item btn btn-sm">2</button>
              <button className="join-item btn btn-sm">3</button>
              <button className="join-item btn btn-sm">»</button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="card bg-base-100 shadow-sm">
          <div className="card-body text-center">
            <div className="text-2xl font-bold text-warning">12</div>
            <div className="text-sm text-base-content/60">Pending Orders</div>
          </div>
        </div>
        <div className="card bg-base-100 shadow-sm">
          <div className="card-body text-center">
            <div className="text-2xl font-bold text-info">8</div>
            <div className="text-sm text-base-content/60">Processing</div>
          </div>
        </div>
        <div className="card bg-base-100 shadow-sm">
          <div className="card-body text-center">
            <div className="text-2xl font-bold text-primary">15</div>
            <div className="text-sm text-base-content/60">Shipped</div>
          </div>
        </div>
        <div className="card bg-base-100 shadow-sm">
          <div className="card-body text-center">
            <div className="text-2xl font-bold text-success">142</div>
            <div className="text-sm text-base-content/60">Delivered</div>
          </div>
        </div>
      </div>
    </div>
  )
}