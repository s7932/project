import '../entery/index1.css'
import NavUser from './navUser'
import ProductList from './productList'
import { useGetProductsQuery } from '../../features/product/productApiSlice';
import { ProgressSpinner } from 'primereact/progressspinner';

const ProductsUser = () => {

    const {
        data,
        isLoading,
        isError,
        error
    } = useGetProductsQuery()
    if (isLoading)
        return <div className="card flex justify-content-center">
            <ProgressSpinner />
        </div>
    // if (isError) return <h2>{error}</h2>

    return (
        <>
            <NavUser />

            <ProductList data={data} />
        </>
    )

}
export default ProductsUser