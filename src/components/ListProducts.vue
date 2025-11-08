<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { downloadProductList } from './download-product-list'
import type { Product } from './types'
import { filterProducts } from './filter-products'

const data = ref<Product[]>([])
const sortAsc= ref(true)   //toggle sorting value 

onMounted(async () => {
	const alldata = await downloadProductList()
  console.log(alldata)
  data.value = filterProducts(alldata, 100) //filter only products of price <=100

})

const sortByPrice=()=>{
  data.value.sort((a,b)=>(sortAsc.value ? a.price-b.price : b.price-a.price))
  sortAsc.value != sortAsc.value
}

const deleteProducts=(id: number)=>{
  data.value=data.value.filter(p=>p.id !== id)
  console.log(data.value)
}

/*Backgroundcolor by Category*/
const categoryColor=(category:string): string=>{
  const colors: Record<string,string>={
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
    'mobile-accessories': '#F8BBD0'
    
  }
  return colors[category] || '#e0e0e0'
}
</script>

<template>
  <div class="page-container">

   <div class="controls">   
     <button @click="sortByPrice">Sort By Price </button>
    </div>
 <div class="table-wrapper">
   <table class="product-table" role="table" aria-label="Product List Table">
     <thead>
      <tr>
         <th>Thumbnail</th>
         <th>ID</th>
         <th>Title</th>
         <th>Category</th>
         <th>Rating</th>
         <th>Price</th>
         <th>Action</th>
      </tr>
     </thead>
     <tbody>
     <tr v-for= "p in data" :key="p.id" :style={backgroundColor:categoryColor(p.category)}>
         <td><img :src="p.thumbnail" alt="Product thumbnail" width="60" height="60"/></td>
         <td>{{p.id}}</td>
         <td>{{p.title}}</td>
         <td>{{p.category}}</td>
         <td>{{p.rating.toFixed(1)}}</td>
         <td>{{p.price}}</td>
         <td><button @click=deleteProducts(p.id)>Delete</button></td>
     </tr>
     </tbody>
   </table>
 </div>
   <div v-if="!data.length" class="empty">
    Loading or no products found!
   </div>
  </div>
</template>

<style scoped>
.page-container{
  padding:2rem;
}

.controls{
  text-align:right;
  margin-bottom:1rem;
}

 button{
  background:#2196f3;
  color:white;
  border:none;
  padding:0.6rem 1.2rem;
  border-radius: 8px;
  cursor:pointer;
  font-weight:500;
  transition:all 0.3s ease;
 }

 button:hover{
  background:#1976d2;
  box-shadow: 0 2px 6px rgba(25, 118, 210, 0.3);
 }

 button:focus-visible {
  outline: 3px solid #90caf9;
  outline-offset: 2px;
}

 .product-table{
  width:100%;
  border-collapse:collapse;
  border-radius:12px;
  overflow:hidden;
  background: #fff;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);

 }

 .product-table th {
  background: #5c6bccff;
  color: white;
  text-align: center;
  padding: 0.75rem;
  font-weight: 600;
  border-bottom: 2px solid #5c6bccff;
}

.product-table td {
  padding: 0.7rem;
  border-bottom: 1px solid #ddd;
  text-align: center;
  vertical-align: middle;
}

.product-table tr:hover {
  background-color: rgba(33, 150, 243, 0.1);
  transition: background-color 0.3s ease;
}

.product-table img{
  border-radius: 8px;
  object-fit:cover;
 }

 .empty{
  text-align:center;
  color: #555;
  font-size : 1.1rem;
  margin-top:1.5rem;
 }

 /* Center table and allow horizontal scroll */
.table-wrapper {
  display: flex;
  justify-content: center; /* centers table horizontally */
  align-items: center;      /* centers vertically if height allows */
  width: 100%;

  -webkit-overflow-scrolling: touch;
}




@media (max-width: 768px) {
  .page-container {
    padding: 1rem;
  }

  button {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }

  .product-table th,
  .product-table td {
    padding: 0.5rem;
    font-size: 0.9rem;
  }

  .product-table img {
    width: 50px;
    height: 50px;
  }
}

@media (max-width: 480px) {
  .product-table {
    width: 95%;
    min-width: 600px;
  }

  .product-table th,
  .product-table td {
    padding: 0.4rem;
    font-size: 0.85rem;
  }

  .product-table img {
    width: 40px;
    height: 40px;
  }

  .controls {
    justify-content: flex-end;
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
}
</style>
