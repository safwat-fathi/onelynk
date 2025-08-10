import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { DollarSign, ShoppingBag, MessageSquare, Calendar } from 'lucide-react';

const metricCards = [
  {
    title: 'Total Sales Today',
    value: '$1,250',
    icon: DollarSign,
    iconBgColor: 'bg-green-500',
  },
  {
    title: 'Orders Pending',
    value: '12',
    icon: ShoppingBag,
    iconBgColor: 'bg-yellow-500',
  },
  {
    title: 'Messages Unread',
    value: '5',
    icon: MessageSquare,
    iconBgColor: 'bg-blue-500',
  },
  {
    title: 'Scheduled Posts',
    value: '8',
    icon: Calendar,
    iconBgColor: 'bg-purple-500',
  },
];

export default function DashboardPage() {
  return (
    <div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {metricCards.map((card) => (
          <Card key={card.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
              <div className={`p-2 rounded-full ${card.iconBgColor}`}>
                <card.icon className="w-5 h-5 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
      {/* Add other dashboard components here, like Sales Graph, Recent Orders, etc. */}
    </div>
  );
}
