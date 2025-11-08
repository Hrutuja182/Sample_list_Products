# Comments

_Here you can share any remarks, comments or assumptions with us that do not fit into the code._ 1. Install pnpm on my computer 
#npm install -g pnpm
2. Then check pnpm version 
#pnpm -v
3. Then run the`# pnpm install` in the terminal 
4 `# pnpm dev ` to check the application is running properly 
5.`# pnpm test `to check if all application is running properly or not
6. added Table title and gave the CSS to that 

Task::
1. Display all products in a list or table structure. For each product showed  the following properties:
         1.	thumbnail
         2.	id
         3.	title
         4.	category
         5.	average rating
         6.	price
   1.Data Loading & Error Handling
      •	If the API request fails, an empty list is displayed and an error is logged to the console.
      •	A message (“Loading or no products found”) appears when the list is empty.
   2.Performance Considerations
      •	The data set is limited to 100 items, so no pagination or virtualization is necessary.
      •	Reactive rendering is efficient for this scale.
   3.Styling is handled with plain scoped CSS (no external CSS libraries).

2. Set a background color for each listed product item. The color depends on the product category.
Color Category
   1.Each product’s background color depends on its category.
   2.Since the API returns many possible categories, only common ones have specific colors -all others use a neutral gray.
   3.Color mapping example:
   {
    beauty: '#FFF5E1',            
    laptops: '#E0F7FA',            
    fragrances: '#F3E5F5',         
    furniture: '#E8F5E9',          
    groceries: '#f0d6a8ff',          
    'home-decoration': '#E1BEE7', 
    'kitchen-accessories': '#F0F4C3', 
    'mens-shirts': '#C8E6C9',      
    'mens-shoes': '#FFE0B2',       
    'mens-watches': '#BBDEFB',     
    'mobile-accessories': '#F8BBD0',
     default: '#e0e0e0'
  }

3. Only display products with a price lower or equal to 100
  Product Filtering
  1.Only products with a price <= 100 are displayed.
  2.Filtering is applied immediately after downloading the products.

4. Add a button that sorts the products by price when clicked
   •The Sort by Price button toggles ascending/descending order each time it’s clicked.
   •Sorting is done locally on the already filtered product list.
5. Bonus: Add a possibility to delete products
   •No server side action is required
   •It's fine when the product reappears on page reload
       1.Deleting a product removes it only from the local reactive array (client-side only).
       2.Deleted items reappear upon page reload (as no backend persistence is required).
6. Bonus: Implement tests for filtering products
  Testing
       •filter-products.test.ts includes a Vitest unit test to ensure filtering logic correctly keeps only items priced ≤ 100.
       •Additional tests (e.g. sorting, deletion) could be added if desired.





