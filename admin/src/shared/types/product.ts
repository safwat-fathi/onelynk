export type Product = {
  id: number
  name: string
  description: string
  price: number
  image_url?: string
  status: 'available' | 'out_of_stock'
  created_at: string
  updated_at: string
}

export type ProductCreateData = {
  name: string
  description: string
  price: number
  image_url?: string
}

export type ProductUpdateData = Partial<ProductCreateData> & {
  status?: 'available' | 'out_of_stock'
}