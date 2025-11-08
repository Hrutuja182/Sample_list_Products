<script setup lang="ts">
import { onMounted, ref ,computed } from 'vue'
import { downloadProductList } from './download-product-list'
import type { Product } from './types'
import { filterProducts } from './filter-products'

const data = ref<Product[]>([])
const sortAsc= ref(true)   //toggle sorting value 
const currentPage = ref(1)
const itemsPerpage = 10  // show 10 items per page 
const loading = ref(true) //spinner state
//const selectedCategory=ref('all')

onMounted(async () => {
  loading.value=true
	const alldata = await downloadProductList()
  console.log(alldata)
  data.value = filterProducts(alldata, 100) //filter only products of price <=100
  loading.value= false
})

const sortByPrice=()=>{
  data.value.sort((a,b)=>(sortAsc.value ? a.price-b.price : b.price-a.price))
  sortAsc.value = !sortAsc.value
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

// pagination
const totalPages= computed(()=> Math.ceil(data.value.length / itemsPerpage))
const paginatedData= computed(()=>{
  const start =(currentPage.value-1)* itemsPerpage
  return data.value.slice(start, start + itemsPerpage)
})

const nextPage=()=>{
  if(currentPage.value < totalPages.value) 
    currentPage.value++
}

const prevPage=()=>{
  if(currentPage.value > 1)
  currentPage.value--
}
// Helper to render star icons based on rating
const getStars = (rating: number) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return {
    full: Array(fullStars).fill('★'),
    half: hasHalfStar ? ['⯨'] : [], // or use '☆' or SVG if you want fancier
    empty: Array(emptyStars).fill('☆')
  };
};
//filter by Category
//const categories = computed(()=>{
 // const allcats = data.value.map((p)=> p.category)
//return['all',...new Set(allcats)]
//})
//const filteredData = computed(()=>{
 // if(selectedCategory.value=== 'all') return data.value
 // return data.value.filter((p)=>p.category === selectedCategory.value)
//})
 //<label for ="category" class="category-label">Filter by Category:</label> 
 //    <select id="category" v-model="selectedCategory" class="category-select">
  //    <option v-for="c in categories" :key="c" :value="c">
   //     {{ c.charAt(0).toUpperCase() +c.slice(1) }}
   //   </option>
   //  </select>
</script>

<template>
  <div class="page-container">
  
   <div class="controls"> 
     <button @click="sortByPrice">Sort By Price </button>
    </div>
 
    <div v-if="loading" class="spinner-container">
      <div class="spinner"></div>
      <p>Loading products...</p>
    </div>
 <div  v-else class="table-wrapper">
   <table class="product-table" role="table" aria-label="Product List Table">
     <thead>
      <tr>
         <th>ID</th>
         <th>Thumbnail</th>
         <th>Category</th>
         <th>Title</th>
         <th>Rating</th>
         <th>Price (in Euros)</th>
         <th>Action</th>
      </tr>
     </thead>
     <tbody>
     <tr v-for= "p in paginatedData" :key="p.id" :style={backgroundColor:categoryColor(p.category)}>
         <td>{{p.id}}</td>
         <td><img :src="p.thumbnail" alt="Product thumbnail" width="60" height="60" loading="lazy"/></td>
         <td>{{p.category}}</td>
         <td>{{p.title}}</td>
        
       <td >
  <span v-for="(star, i) in getStars(p.rating).full" :key="'f'+i" class="star full">{{ star }}</span>
  <span v-for="(star, i) in getStars(p.rating).half" :key="'h'+i" class="star half">{{ star }}</span>
  <span v-for="(star, i) in getStars(p.rating).empty" :key="'e'+i" class="star empty">{{ star }}</span>
  <span class="rating-number">({{ p.rating.toFixed(1) }})</span>
</td>

         <td> €{{p.price}}</td>
         <td><button @click=deleteProducts(p.id)>Delete</button></td>
     </tr>
     </tbody>
   </table>
 </div>

   <div v-if="!loading && !data.length" class="empty">
      No products found!
   </div>

   <div v-if="!loading && data.length" class ="pagination">
    <button @click="prevPage" :disabled="currentPage=== 1 ">Previous</button>
    <span> Page {{ currentPage }} of {{ totalPages }}</span>
    <button @click="nextPage" :disabled="currentPage=== totalPages ">Next</button>
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
  position:sticky;

  padding: 0.5rem 0;
}

/* category select button Css */
.category-label{
  margin-right:0.5rem;
  font-weight: 500;
}

.category-select{
  padding:0.4rem 0.6rem;
  border-radius:6px;
  border: 1px solid #ccc;
  margin-right: 1rem;
  font-size: 0.95rem;
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

/* Center table and allow horizontal scroll */
.table-wrapper {
  display: flex;
  justify-content: center; /* centers table horizontally */
  align-items: center;      /* centers vertically if height allows */
  width: 100%;

  -webkit-overflow-scrolling: touch;
}
 .product-table{
  width:100%;
  border-collapse: collapse;
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
  border-left: 1px solid #949494;
 
 }

.product-table td {
  padding: 0.7rem;
  border: 1px solid #949494;
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

 /*Pagination Bar*/
 .pagination{
  margin-top : 1rem;
  text-align:center;
  display:flex;
  justify-content: center;
  gap : 1rem;
  align-items: center;
  position: sticky;
 }

 .pagination span{
  font-weight: 500;
  color: #333;
 }

 /* Spinner */
.spinner-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  color: #3949ab;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 5px solid #cfd8dc;
  border-top-color: #3949ab;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
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


.star {
  font-size: 1.1rem;
  line-height: 1;
}

.star.full {
  color: #FFD700; /* gold */
}

.star.half {
  color: #FFD700;
  opacity: 0.6; /* subtle difference for half star */
}

.star.empty {
  color: #ccc;
}

.rating-number {
  margin-left: 4px;
  font-size: 0.9rem;
  color: #555;
}

</style>
