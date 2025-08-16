import { 
  CurrencyDollarIcon, 
  ShoppingBagIcon, 
  ChatBubbleLeftIcon, 
  UserGroupIcon,
  PlusIcon
} from '@heroicons/react/24/outline'
import MetricCard from "@/components/ui/MetricCard";

export default function Dashboard() {
	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-bold">Dashboard</h1>
					<p className="text-base-content/60 mt-1">
						Welcome back! Here&apos;s what&apos;s happening with your store.
					</p>
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				<MetricCard
					title="Total Sales Today"
					value="$2,847"
					change="+12.5% from yesterday"
					changeType="positive"
					icon={<CurrencyDollarIcon className="h-8 w-8" />}
				/>
				<MetricCard
					title="Orders Pending"
					value="23"
					change="5 new orders"
					changeType="neutral"
					icon={<ShoppingBagIcon className="h-8 w-8" />}
				/>
				<MetricCard
					title="Messages Unread"
					value="8"
					change="+3 from last hour"
					changeType="positive"
					icon={<ChatBubbleLeftIcon className="h-8 w-8" />}
				/>
				<MetricCard
					title="Total Customers"
					value="156"
					change="+8 this week"
					changeType="positive"
					icon={<UserGroupIcon className="h-8 w-8" />}
				/>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				<div className="card bg-base-100 shadow-sm">
					<div className="card-body">
						<h3 className="card-title">Sales Graph</h3>
						<div className="h-64 flex items-center justify-center bg-base-200 rounded">
							<span className="text-base-content/60">
								Chart placeholder - Last 7 days
							</span>
						</div>
					</div>
				</div>

				<div className="card bg-base-100 shadow-sm">
					<div className="card-body">
						<div className="flex items-center justify-between mb-4">
							<h3 className="card-title">Recent Orders</h3>
							<button className="btn btn-sm btn-ghost">View All</button>
						</div>
						<div className="overflow-x-auto">
							<table className="table table-sm">
								<thead>
									<tr>
										<th>Order ID</th>
										<th>Customer</th>
										<th>Status</th>
										<th>Amount</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>#1001</td>
										<td>John Doe</td>
										<td>
											<span className="badge badge-success badge-sm">
												Completed
											</span>
										</td>
										<td>$127.99</td>
									</tr>
									<tr>
										<td>#1002</td>
										<td>Jane Smith</td>
										<td>
											<span className="badge badge-warning badge-sm">
												Pending
											</span>
										</td>
										<td>$89.50</td>
									</tr>
									<tr>
										<td>#1003</td>
										<td>Mike Wilson</td>
										<td>
											<span className="badge badge-info badge-sm">Shipped</span>
										</td>
										<td>$245.00</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				<div className="card bg-base-100 shadow-sm">
					<div className="card-body">
						<h3 className="card-title mb-4">Recent Messages</h3>
						<div className="space-y-3">
							<div className="flex items-start gap-3">
								<div className="avatar placeholder">
									<div className="bg-neutral text-neutral-content rounded-full w-8">
										<span className="text-xs">A</span>
									</div>
								</div>
								<div className="flex-1">
									<p className="text-sm font-medium">Alex Johnson</p>
									<p className="text-xs text-base-content/60">
										Is this product still available?
									</p>
									<p className="text-xs text-base-content/40">2 min ago</p>
								</div>
							</div>
							<div className="flex items-start gap-3">
								<div className="avatar placeholder">
									<div className="bg-primary text-primary-content rounded-full w-8">
										<span className="text-xs">S</span>
									</div>
								</div>
								<div className="flex-1">
									<p className="text-sm font-medium">Sarah Davis</p>
									<p className="text-xs text-base-content/60">
										When will my order ship?
									</p>
									<p className="text-xs text-base-content/40">15 min ago</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="lg:col-span-2">
					<div className="card bg-base-100 shadow-sm">
						<div className="card-body">
							<h3 className="card-title mb-4">Quick Actions</h3>
							<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
								<button className="btn btn-outline btn-primary">
									<PlusIcon className="h-4 w-4" />
									Add Product
								</button>
								<button className="btn btn-outline btn-secondary">
									<UserGroupIcon className="h-4 w-4" />
									Manage Customers
								</button>
								<button className="btn btn-outline btn-accent">
									<ChatBubbleLeftIcon className="h-4 w-4" />
									Tag Messages
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
