import {
	ChartBarIcon,
	ArrowTrendingUpIcon,
	ArrowTrendingDownIcon,
	ClockIcon,
	HeartIcon,
} from "@heroicons/react/24/outline";
import MetricCard from "@/components/ui/MetricCard";

const topProducts = [
	{ name: "Wireless Headphones", sales: 245, revenue: 24500 },
	{ name: "Smartphone Case", sales: 189, revenue: 4725 },
	{ name: "Bluetooth Speaker", sales: 156, revenue: 12480 },
	{ name: "USB Cable", sales: 134, revenue: 1742 },
	{ name: "Phone Charger", sales: 98, revenue: 2940 },
];

const engagementData = [
	{ metric: "Post Reach", value: "45.2K", change: "+12.5%", trend: "up" },
	{ metric: "Engagement Rate", value: "4.8%", change: "+0.3%", trend: "up" },
	{ metric: "Comments", value: "1.2K", change: "-2.1%", trend: "down" },
	{ metric: "Shares", value: "856", change: "+18.7%", trend: "up" },
];

export default function AnalyticsPage() {
	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-bold">Analytics</h1>
					<p className="text-base-content/60 mt-1">
						Track your performance and insights
					</p>
				</div>
				<div className="flex gap-2">
					<select className="select select-bordered">
						<option>Last 30 days</option>
						<option>Last 7 days</option>
						<option>Last 3 months</option>
						<option>Last year</option>
					</select>
					<button className="btn btn-primary">Export Report</button>
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				<MetricCard
					title="Total Revenue"
					value="$45,678"
					change="+18.2% from last month"
					changeType="positive"
					icon={<ChartBarIcon className="h-8 w-8" />}
				/>
				<MetricCard
					title="Conversion Rate"
					value="3.2%"
					change="+0.5% from last month"
					changeType="positive"
					icon={<ArrowTrendingUpIcon className="h-8 w-8" />}
				/>
				<MetricCard
					title="Avg Response Time"
					value="2.4 hrs"
					change="-0.8 hrs from last month"
					changeType="positive"
					icon={<ClockIcon className="h-8 w-8" />}
				/>
				<MetricCard
					title="Customer Satisfaction"
					value="4.8/5"
					change="+0.2 from last month"
					changeType="positive"
					icon={<HeartIcon className="h-8 w-8" />}
				/>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				<div className="card bg-base-100 shadow-sm">
					<div className="card-body">
						<h3 className="card-title">Sales by Day</h3>
						<div className="h-64 flex items-center justify-center bg-base-200 rounded">
							<div className="text-center">
								<ChartBarIcon className="h-12 w-12 text-base-content/40 mx-auto mb-2" />
								<span className="text-base-content/60">
									Sales chart - Last 30 days
								</span>
							</div>
						</div>
					</div>
				</div>

				<div className="card bg-base-100 shadow-sm">
					<div className="card-body">
						<h3 className="card-title">Top Products</h3>
						<div className="space-y-3">
							{topProducts.map((product, index) => (
								<div
									key={product.name}
									className="flex items-center justify-between p-3 bg-base-200 rounded"
								>
									<div className="flex items-center gap-3">
										<span className="badge badge-neutral">{index + 1}</span>
										<div>
											<p className="font-medium">{product.name}</p>
											<p className="text-sm text-base-content/60">
												{product.sales} sales
											</p>
										</div>
									</div>
									<div className="text-right">
										<p className="font-bold">
											${product.revenue.toLocaleString()}
										</p>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>

			<div className="card bg-base-100 shadow-sm">
				<div className="card-body">
					<h3 className="card-title mb-6">Engagement Analytics</h3>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
						{engagementData.map(item => (
							<div key={item.metric} className="text-center">
								<div className="stat">
									<div className="stat-title">{item.metric}</div>
									<div className="stat-value text-2xl">{item.value}</div>
									<div
										className={`stat-desc flex items-center justify-center gap-1 ${
											item.trend === "up" ? "text-success" : "text-error"
										}`}
									>
										{item.trend === "up" ? (
											<ArrowTrendingUpIcon className="h-4 w-4" />
										) : (
											<ArrowTrendingDownIcon className="h-4 w-4" />
										)}
										{item.change}
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				<div className="card bg-base-100 shadow-sm">
					<div className="card-body">
						<h3 className="card-title">Best Posting Times</h3>
						<div className="space-y-4">
							<div className="flex justify-between items-center">
								<span>Monday 2:00 PM</span>
								<div className="flex items-center gap-2">
									<progress
										className="progress progress-primary w-20"
										value="85"
										max="100"
									></progress>
									<span className="text-sm">85%</span>
								</div>
							</div>
							<div className="flex justify-between items-center">
								<span>Wednesday 10:00 AM</span>
								<div className="flex items-center gap-2">
									<progress
										className="progress progress-primary w-20"
										value="78"
										max="100"
									></progress>
									<span className="text-sm">78%</span>
								</div>
							</div>
							<div className="flex justify-between items-center">
								<span>Friday 4:00 PM</span>
								<div className="flex items-center gap-2">
									<progress
										className="progress progress-primary w-20"
										value="72"
										max="100"
									></progress>
									<span className="text-sm">72%</span>
								</div>
							</div>
							<div className="flex justify-between items-center">
								<span>Saturday 11:00 AM</span>
								<div className="flex items-center gap-2">
									<progress
										className="progress progress-primary w-20"
										value="68"
										max="100"
									></progress>
									<span className="text-sm">68%</span>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="card bg-base-100 shadow-sm">
					<div className="card-body">
						<h3 className="card-title">Key Performance Indicators</h3>
						<div className="space-y-4">
							<div className="flex justify-between items-center p-3 bg-base-200 rounded">
								<span>Monthly Recurring Revenue</span>
								<span className="font-bold text-success">$12,450</span>
							</div>
							<div className="flex justify-between items-center p-3 bg-base-200 rounded">
								<span>Customer Lifetime Value</span>
								<span className="font-bold">$245</span>
							</div>
							<div className="flex justify-between items-center p-3 bg-base-200 rounded">
								<span>Churn Rate</span>
								<span className="font-bold text-error">2.1%</span>
							</div>
							<div className="flex justify-between items-center p-3 bg-base-200 rounded">
								<span>Average Order Value</span>
								<span className="font-bold">$87.50</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
