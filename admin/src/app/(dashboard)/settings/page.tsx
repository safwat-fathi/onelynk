'use client'

import { useState } from 'react'
import { 
  UserIcon,
  LinkIcon,
  CreditCardIcon,
  BellIcon,
  ShieldCheckIcon,
  PlusIcon,
  TrashIcon
} from '@heroicons/react/24/outline'

const connectedPages = [
  { id: 1, platform: "Facebook", pageName: "ZeeLink Store", followers: "12.5K", connected: true },
  { id: 2, platform: "Instagram", pageName: "zeelink_official", followers: "8.2K", connected: true },
  { id: 3, platform: "Twitter", pageName: "@ZeeLinkStore", followers: "5.1K", connected: false },
  { id: 4, platform: "TikTok", pageName: "zeelinkstore", followers: "3.8K", connected: false }
]

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('account')

  const tabs = [
    { id: 'account', label: 'Account Settings', icon: UserIcon },
    { id: 'pages', label: 'Connected Pages', icon: LinkIcon },
    { id: 'billing', label: 'Billing & Subscription', icon: CreditCardIcon },
    { id: 'notifications', label: 'Notifications', icon: BellIcon }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-base-content/60 mt-1">Manage your account and application preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="card bg-base-100 shadow-sm">
          <div className="card-body p-0">
            <nav className="menu">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <li key={tab.id}>
                    <a 
                      className={`menu-item ${activeTab === tab.id ? 'active' : ''}`}
                      onClick={() => setActiveTab(tab.id)}
                    >
                      <Icon className="h-5 w-5" />
                      {tab.label}
                    </a>
                  </li>
                )
              })}
            </nav>
          </div>
        </div>

        <div className="lg:col-span-3 card bg-base-100 shadow-sm">
          <div className="card-body">
            {activeTab === 'account' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold">Account Settings</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">First Name</span>
                    </label>
                    <input type="text" className="input input-bordered" defaultValue="John" />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Last Name</span>
                    </label>
                    <input type="text" className="input input-bordered" defaultValue="Doe" />
                  </div>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email Address</span>
                  </label>
                  <input type="email" className="input input-bordered" defaultValue="john@example.com" />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Company/Store Name</span>
                  </label>
                  <input type="text" className="input input-bordered" defaultValue="ZeeLink Store" />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Time Zone</span>
                  </label>
                  <select className="select select-bordered">
                    <option>UTC-5 (Eastern Time)</option>
                    <option>UTC-6 (Central Time)</option>
                    <option>UTC-7 (Mountain Time)</option>
                    <option>UTC-8 (Pacific Time)</option>
                  </select>
                </div>

                <div className="card-actions">
                  <button className="btn btn-primary">Save Changes</button>
                  <button className="btn btn-ghost">Cancel</button>
                </div>
              </div>
            )}

            {activeTab === 'pages' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold">Connected Pages</h2>
                  <button className="btn btn-primary btn-sm">
                    <PlusIcon className="h-4 w-4" />
                    Connect New Page
                  </button>
                </div>

                <div className="space-y-4">
                  {connectedPages.map((page) => (
                    <div key={page.id} className="flex items-center justify-between p-4 border border-base-300 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="avatar placeholder">
                          <div className="bg-neutral text-neutral-content rounded-full w-12">
                            <span className="text-xs">{page.platform.charAt(0)}</span>
                          </div>
                        </div>
                        <div>
                          <h3 className="font-medium">{page.pageName}</h3>
                          <p className="text-sm text-base-content/60">{page.platform} • {page.followers} followers</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`badge ${page.connected ? 'badge-success' : 'badge-neutral'}`}>
                          {page.connected ? 'Connected' : 'Not Connected'}
                        </span>
                        {page.connected ? (
                          <button className="btn btn-ghost btn-sm text-error">
                            Disconnect
                          </button>
                        ) : (
                          <button className="btn btn-primary btn-sm">
                            Connect
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'billing' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold">Billing & Subscription</h2>
                
                <div className="card bg-primary text-primary-content">
                  <div className="card-body">
                    <h3 className="card-title">Pro Plan</h3>
                    <p>$29/month • Unlimited products, posts, and analytics</p>
                    <div className="card-actions justify-end">
                      <button className="btn btn-sm">Manage Subscription</button>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Payment Method</h3>
                  <div className="flex items-center justify-between p-4 border border-base-300 rounded-lg">
                    <div className="flex items-center gap-3">
                      <CreditCardIcon className="h-8 w-8 text-base-content/60" />
                      <div>
                        <p className="font-medium">•••• •••• •••• 4242</p>
                        <p className="text-sm text-base-content/60">Expires 12/25</p>
                      </div>
                    </div>
                    <button className="btn btn-ghost btn-sm">Update</button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Billing History</h3>
                  <div className="overflow-x-auto">
                    <table className="table table-sm">
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Description</th>
                          <th>Amount</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Jan 1, 2024</td>
                          <td>Pro Plan - Monthly</td>
                          <td>$29.00</td>
                          <td><span className="badge badge-success badge-xs">Paid</span></td>
                        </tr>
                        <tr>
                          <td>Dec 1, 2023</td>
                          <td>Pro Plan - Monthly</td>
                          <td>$29.00</td>
                          <td><span className="badge badge-success badge-xs">Paid</span></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold">Notification Preferences</h2>
                
                <div className="space-y-4">
                  <div className="form-control">
                    <label className="cursor-pointer label">
                      <span className="label-text">
                        <div>
                          <div className="font-medium">New Orders</div>
                          <div className="text-sm text-base-content/60">Get notified when you receive new orders</div>
                        </div>
                      </span>
                      <input type="checkbox" className="toggle toggle-primary" defaultChecked />
                    </label>
                  </div>

                  <div className="form-control">
                    <label className="cursor-pointer label">
                      <span className="label-text">
                        <div>
                          <div className="font-medium">New Messages</div>
                          <div className="text-sm text-base-content/60">Get notified when customers send messages</div>
                        </div>
                      </span>
                      <input type="checkbox" className="toggle toggle-primary" defaultChecked />
                    </label>
                  </div>

                  <div className="form-control">
                    <label className="cursor-pointer label">
                      <span className="label-text">
                        <div>
                          <div className="font-medium">Post Scheduling</div>
                          <div className="text-sm text-base-content/60">Reminders about scheduled posts</div>
                        </div>
                      </span>
                      <input type="checkbox" className="toggle toggle-primary" />
                    </label>
                  </div>

                  <div className="form-control">
                    <label className="cursor-pointer label">
                      <span className="label-text">
                        <div>
                          <div className="font-medium">Weekly Reports</div>
                          <div className="text-sm text-base-content/60">Receive weekly analytics reports</div>
                        </div>
                      </span>
                      <input type="checkbox" className="toggle toggle-primary" defaultChecked />
                    </label>
                  </div>

                  <div className="form-control">
                    <label className="cursor-pointer label">
                      <span className="label-text">
                        <div>
                          <div className="font-medium">Marketing Updates</div>
                          <div className="text-sm text-base-content/60">Updates about new features and tips</div>
                        </div>
                      </span>
                      <input type="checkbox" className="toggle toggle-primary" />
                    </label>
                  </div>
                </div>

                <div className="card-actions">
                  <button className="btn btn-primary">Save Preferences</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}