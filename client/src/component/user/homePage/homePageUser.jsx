// import '../entery/index1.css' 
import NavUser from '../navUser'
import { useGetProductsQuery } from '../../../features/product/productApiSlice';
import { useEffect, useState } from 'react';
import * as React from 'react';
import ProductCategories from './ProductCategories';
import ProductHero from './ProductHero';
import ProductValues from './ProductValues';
import ProductHowItWorks from './ProductHowItWorks';
import { ScrollTop } from 'primereact/scrolltop';

const HomePageUser = () => {
  const [da, setDa] = useState(true)
  const d = async () => {
    console.log("im here")
    await setDa(false)
    console.log(da);
    await window.location.reload(false);
    return;
  }
  const {
    data,
    isLoading,
    isError,
    error
  } = useGetProductsQuery()
  if (isLoading) return <h1>Loading</h1>
  // if (isError) return <h2>{error}</h2>

  return (
    <>

<NavUser />

      <div className="card">
        <div style={{ width: '100%', height: '65rem', 'overflow': 'auto' }}>
          <React.Fragment>
         
            <ProductHero />
            <ProductHowItWorks />
            <ProductCategories />
            <ProductValues />
          </React.Fragment>
          <ScrollTop target="parent" threshold={100} className="w-2rem h-2rem border-round bg-primary" icon="pi pi-arrow-up text-base" />
        </div>
      </div>

    </>
  )

}
export default HomePageUser