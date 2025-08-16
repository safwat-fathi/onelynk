export type Product = {
  id: string
  name: string
  description?: string
  price: number
  stock: number
  status: 'active' | 'draft' | 'inactive'
  image?: string
  category?: string
  createdAt: string
  updatedAt: string
}

export type ProductCreateData = {
  name: string
  description?: string
  price: number
  stock: number
  category?: string
  image?: string
}

export type ProductUpdateData = Partial<ProductCreateData> & {
  status?: 'active' | 'draft' | 'inactive'
}