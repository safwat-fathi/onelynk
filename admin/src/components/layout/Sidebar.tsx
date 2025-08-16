'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  HomeIcon, 
  CubeIcon, 
  ChatBubbleLeftIcon, 
  ShoppingBagIcon, 
  ChartBarIcon, 
  CogIcon 
} from '@heroicons/react/24/outline'

const menuItems = [
  { href: '/', label: 'Dashboard', icon: HomeIcon },
  { href: '/products', label: 'Products', icon: CubeIcon },
  { href: '/messages', label: 'Messages', icon: ChatBubbleLeftIcon },
  { href: '/orders', label: 'Orders', icon: ShoppingBagIcon },
  { href: '/analytics', label: 'Analytics', icon: ChartBarIcon },
  { href: '/settings', label: 'Settings', icon: CogIcon },
]

const Sidebar = () => {
  const pathname = usePathname()

  return (
		<aside className="w-64 min-h-screen bg-base-200">
			<div className="p-4">
				<nav className="menu w-full">
					{menuItems.map(item => {
						const Icon = item.icon;
						const isActive = pathname === item.href;

						return (
							<li key={item.href} className="w-full">
								<Link
									href={item.href}
									className={`menu-item ${isActive ? "active" : ""}`}
								>
									<Icon className="h-5 w-5" />
									<span>{item.label}</span>
								</Link>
							</li>
						);
					})}
				</nav>
			</div>
		</aside>
	);
}

export default Sidebar