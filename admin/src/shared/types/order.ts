export type OrderItem = {
  id: string
  productId: string
  productName: string
  quantity: number
  price: number
  total: number
}

export type Order = {
  id: string
  customerName: string
  customerEmail: string
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  items: OrderItem[]
  total: number
  createdAt: string
  updatedAt: string
}

export type OrderStatusUpdateData = {
  status: Order['status']
  notes?: string
}