import '../entery/index1.css'
import NavManeger from './navManager'
import ProductList from './productList'
import { useGetProductsQuery } from '../../features/product/productApiSlice';
import { useEffect } from 'react';
import { ProgressSpinner } from 'primereact/progressspinner';

const ProductsManeger = () => {
    const {
        data,
        isLoading,
        isError,
        error,
        refetch
    } = useGetProductsQuery()

    useEffect(() => {
if(data)
{

}
    }, [data])

    if (isLoading) return
    <div className="card flex justify-content-center">
        <ProgressSpinner />
    </div>
   
 

    return (
        <>
            <NavManeger />
            
          
            <ProductList data={data} refetch={refetch} />
        </>
    )

}
export default ProductsManeger