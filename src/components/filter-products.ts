import type { Product } from './types'

export function filterProducts(products: Product[], maxPrice: number):Product[] {
	// TODO add filtering
	return products.filter(products=>products.price <=maxPrice) // Filtering with previous state not just with current state
}
