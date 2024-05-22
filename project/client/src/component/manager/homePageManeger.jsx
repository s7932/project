import '../entery/index1.css'
import NavManager from './navManager'
import ProductList from './productList'
import { useGetProductsQuery } from '../../features/product/productApiSlice';
import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import FromToken from '../../hooks/fromToken';
const HomePageManager = () => {
    const [name, setName] = useState(FromToken().name)
    const navigate = useNavigate();
    return (
        <>

            <NavManager />
            <div style={{ textAlign: 'center', paddingTop: '30vh' }}>
                <h1>Welcome Manager {name}</h1>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <button style={{ fontSize: '2rem', padding: '10px 20px', backgroundColor: '#ff69b4', color: '#fff', border: 'none', borderRadius: '5px', margin: '0 10px' }} onClick={()=>navigate("/users")}>Users</button>
                    <button style={{ fontSize: '2rem', padding: '10px 20px', backgroundColor: '#d23a7b', color: '#fff', border: 'none', borderRadius: '5px', margin: '0 10px' }} onClick={()=>navigate("/productsManager")}>Products</button>
                </div>
            </div>


        </>
    )

}
export default HomePageManager