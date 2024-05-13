import '../entery/index1.css' 
import NavManager from './navManager'
import ProductList from './productList'
import { useGetProductsQuery} from '../../features/product/productApiSlice';
import { useEffect, useState } from 'react';

const HomePageManager=()=>{
 
    
    return(
       <>
       
        <NavManager/>
     
      
    </>
    )

}
export default HomePageManager