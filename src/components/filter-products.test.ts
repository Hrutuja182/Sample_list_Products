import { describe, it, expect } from 'vitest'
import { filterProducts } from './filter-products'
import type { Product } from './types'

describe('filter-products', () => {
	it('returns only products below 100', () => {
		// TODO
		 const mockProducts: Product [] =[
		   {id:1, title:'Cheap', price:50} as Product,
		   {id:2, title:'Expensive', price:150} as Product,
		   {id:3, title:'Borderline', price:100} as Product,
		 ]
		 const filtered = filterProducts(mockProducts,100)
		 expect(filtered.map(p=>p.id)).toEqual([1,3])
	})
})
