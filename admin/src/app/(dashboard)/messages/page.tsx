'use client'

import { useState } from 'react'
import { 
  MagnifyingGlassIcon,
  TagIcon,
  PaperAirplaneIcon,
  EllipsisVerticalIcon
} from '@heroicons/react/24/outline'

const conversations = [
  {
    id: 1,
    customer: "Alex Johnson",
    lastMessage: "Is this product still available?",
    timestamp: "2 min ago",
    unread: true,
    tags: ["Order Inquiry"],
    avatar: "AJ"
  },
  {
    id: 2,
    customer: "Sarah Davis",
    lastMessage: "When will my order ship?",
    timestamp: "15 min ago",
    unread: true,
    tags: ["VIP Customer", "Shipping"],
    avatar: "SD"
  },
  {
    id: 3,
    customer: "Mike Wilson",
    lastMessage: "Thank you for the quick response!",
    timestamp: "1 hour ago",
    unread: false,
    tags: ["Support"],
    avatar: "MW"
  },
  {
    id: 4,
    customer: "Emily Chen",
    lastMessage: "I'd like to return this item",
    timestamp: "2 hours ago",
    unread: false,
    tags: ["Return Request"],
    avatar: "EC"
  }
]

const messages = [
  {
    id: 1,
    sender: "customer",
    message: "Hi! Is the wireless headphones still in stock?",
    timestamp: "2:30 PM"
  },
  {
    id: 2,
    sender: "admin",
    message: "Hello Alex! Yes, we have them in stock. Would you like me to reserve one for you?",
    timestamp: "2:32 PM"
  },
  {
    id: 3,
    sender: "customer",
    message: "Yes please! How much would shipping cost?",
    timestamp: "2:35 PM"
  }
]

const tags = [
  { name: "Order Inquiry", color: "badge-primary" },
  { name: "VIP Customer", color: "badge-warning" },
  { name: "Shipping", color: "badge-info" },
  { name: "Support", color: "badge-success" },
  { name: "Return Request", color: "badge-error" }
]

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState(1)
  const [newMessage, setNewMessage] = useState("")

  const selectedConvo = conversations.find(c => c.id === selectedConversation)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Messages</h1>
          <p className="text-base-content/60 mt-1">Manage customer conversations and inquiries</p>
        </div>
        <div className="flex gap-2">
          <select className="select select-bordered select-sm">
            <option>All Tags</option>
            {tags.map(tag => (
              <option key={tag.name}>{tag.name}</option>
            ))}
          </select>
          <button className="btn btn-primary btn-sm">
            <TagIcon className="h-4 w-4" />
            Manage Tags
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
        <div className="card bg-base-100 shadow-sm">
          <div className="card-body p-0">
            <div className="p-4 border-b">
              <div className="form-control">
                <div className="input-group input-group-sm">
                  <input 
                    type="text" 
                    placeholder="Search conversations..." 
                    className="input input-bordered input-sm flex-1" 
                  />
                  <button className="btn btn-square btn-sm">
                    <MagnifyingGlassIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto">
              {conversations.map((conversation) => (
                <div 
                  key={conversation.id}
                  className={`p-4 border-b cursor-pointer hover:bg-base-200 ${selectedConversation === conversation.id ? 'bg-base-200' : ''}`}
                  onClick={() => setSelectedConversation(conversation.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className="avatar placeholder">
                      <div className={`bg-neutral text-neutral-content rounded-full w-10 ${conversation.unread ? 'ring-2 ring-primary' : ''}`}>
                        <span className="text-xs">{conversation.avatar}</span>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-medium truncate">{conversation.customer}</p>
                        <span className="text-xs text-base-content/60">{conversation.timestamp}</span>
                      </div>
                      <p className="text-sm text-base-content/70 truncate">{conversation.lastMessage}</p>
                      <div className="flex gap-1 mt-2">
                        {conversation.tags.map((tag) => {
                          const tagInfo = tags.find(t => t.name === tag)
                          return (
                            <span key={tag} className={`badge badge-xs ${tagInfo?.color}`}>
                              {tag}
                            </span>
                          )
                        })}
                      </div>
                    </div>
                    {conversation.unread && (
                      <div className="badge badge-primary badge-sm">•</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 card bg-base-100 shadow-sm">
          <div className="card-body p-0 flex flex-col h-full">
            {selectedConvo && (
              <>
                <div className="p-4 border-b">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="avatar placeholder">
                        <div className="bg-neutral text-neutral-content rounded-full w-10">
                          <span className="text-sm">{selectedConvo.avatar}</span>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-medium">{selectedConvo.customer}</h3>
                        <p className="text-sm text-base-content/60">Active now</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="btn btn-ghost btn-sm">
                        <TagIcon className="h-4 w-4" />
                      </button>
                      <button className="btn btn-ghost btn-sm">
                        <EllipsisVerticalIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex-1 p-4 overflow-y-auto space-y-4">
                  {messages.map((message) => (
                    <div 
                      key={message.id} 
                      className={`flex ${message.sender === 'admin' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.sender === 'admin' 
                          ? 'bg-primary text-primary-content' 
                          : 'bg-base-200'
                      }`}>
                        <p className="text-sm">{message.message}</p>
                        <p className={`text-xs mt-1 ${
                          message.sender === 'admin' 
                            ? 'text-primary-content/70' 
                            : 'text-base-content/60'
                        }`}>
                          {message.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 border-t">
                  <div className="form-control">
                    <div className="input-group">
                      <input 
                        type="text" 
                        placeholder="Type your message..." 
                        className="input input-bordered flex-1" 
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                      />
                      <button className="btn btn-primary">
                        <PaperAirplaneIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="card bg-base-100 shadow-sm">
        <div className="card-body">
          <h3 className="card-title mb-4">Auto-Reply Templates</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="border border-base-300 rounded-lg p-4">
              <h4 className="font-medium mb-2">Order Status Inquiry</h4>
              <p className="text-sm text-base-content/70 mb-3">Hi! Thanks for reaching out. Let me check your order status for you...</p>
              <button className="btn btn-outline btn-xs">Edit</button>
            </div>
            <div className="border border-base-300 rounded-lg p-4">
              <h4 className="font-medium mb-2">Product Information</h4>
              <p className="text-sm text-base-content/70 mb-3">Hello! I&apos;d be happy to provide more information about this product...</p>
              <button className="btn btn-outline btn-xs">Edit</button>
            </div>
            <div className="border border-base-300 rounded-lg p-4">
              <h4 className="font-medium mb-2">Shipping Information</h4>
              <p className="text-sm text-base-content/70 mb-3">Thanks for your order! Here are the shipping details...</p>
              <button className="btn btn-outline btn-xs">Edit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}