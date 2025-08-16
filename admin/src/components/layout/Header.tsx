'use client'

import { useState, useEffect } from 'react'
import { BellIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { logoutAction } from '@/app/actions/auth'
import { User } from '@/shared/types/auth'
import { getCookie } from '@/shared/utils/cookies'
import { COOKIE_NAMES } from '@/shared/utils/cookies'
import SearchInput from "@/components/ui/SearchInput";

const Header = () => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const loadUser = () => {
      try {
        const userCookie = getCookie(COOKIE_NAMES.USER)
        if (userCookie) {
          setUser(JSON.parse(userCookie))
        }
      } catch (error) {
        console.error('Failed to load user:', error)
      }
    }

    loadUser()
  }, [])

  const handleLogout = async () => {
    try {
      await logoutAction()
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  const handleSearch = (query: string) => {
		// In a real app, this would trigger an actual search
		console.log("Searching for:", query);
		// For now, we'll just log it to the console
	};

  const getUserInitials = () => {
    if (!user) return 'U'
    return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`
  }

  return (
		<header className="navbar bg-base-100 shadow-sm border-b">
			<div className="navbar-start">
				<div className="text-xl font-bold text-primary">ZeeLink</div>
			</div>

			<div className="navbar-center">
				<div className="form-control w-80">
					<SearchInput
						onSearch={handleSearch}
						placeholder="Search products, posts, customers..."
						localStorageKey="header-search"
					/>
				</div>
			</div>

			<div className="navbar-end">
				<button className="btn btn-ghost btn-circle">
					<div className="indicator">
						<BellIcon className="h-5 w-5" />
						<span className="badge badge-xs badge-primary indicator-item"></span>
					</div>
				</button>

				<div className="dropdown dropdown-end">
					<div tabIndex={0} role="button" className="btn btn-ghost">
						<div className="avatar">
							<div className="w-8 rounded-full">
								<div className="bg-primary text-primary-content w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium">
									{getUserInitials()}
								</div>
							</div>
						</div>
						<ChevronDownIcon className="h-4 w-4" />
					</div>
					<ul
						tabIndex={0}
						className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
					>
						<li>
							<div className="flex flex-col items-start px-4 py-2 border-b">
								<span className="font-medium">
									{user ? `${user.firstName} ${user.lastName}` : "Loading..."}
								</span>
								<span className="text-sm text-base-content/60">
									{user?.email}
								</span>
							</div>
						</li>
						<li>
							<a href="/settings">Profile & Settings</a>
						</li>
						<li>
							<a onClick={handleLogout} className="text-error">
								Logout
							</a>
						</li>
					</ul>
				</div>
			</div>
		</header>
	);
}

export default Header