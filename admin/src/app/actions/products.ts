'use server'

import { revalidateTag } from 'next/cache'

/**
 * Server action to revalidate products cache
 */
export async function revalidateProducts() {
  revalidateTag('products')
}