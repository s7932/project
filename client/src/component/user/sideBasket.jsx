import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { Carousel } from 'primereact/carousel';
import { Tag } from 'primereact/tag';
import { ProgressSpinner } from 'primereact/progressspinner';
import { useGetBasketQuery } from '../../features/user/userApiSlice'

const SideBasket = () => {

    const {
        data,
        isSuccess,
        isLoading,
        isError,
        error
    } = useGetBasketQuery()
    useEffect(() => {

        if (isSuccess)
            console.log(data);
    }, [isSuccess])
    if (isLoading) return
        <div className="card flex justify-content-center">
            <ProgressSpinner />
        </div>
    if (isError) return <h2>{error.message}</h2>

    const productTemplate = (product) => {
        return (
            <div className="border-1 surface-border border-round m-2 text-center py-5 px-3" style={{ height: "170px", width: "170px" }}>
                <div className="mb-3">
                    <img src={`http://localhost:7777/uploads/${product.image.split("\\")[2]}`} alt={product.name} className="w-6 shadow-2" />
                </div>
                <div>
                    <h4 className="mb-1">{product.name}</h4>
                    <h6 className="mt-0 mb-3">${product.price}</h6>

                </div>
            </div>
        );
    };

    const header = "what fun! You have the following types of cards in your basket"

    return (

        <div className="card" style={{ height: "170px", padding: 0 }}>
            <Carousel value={data} numVisible={7} numScroll={7} responsiveOptions={responsiveOptions} itemTemplate={productTemplate} header={header} />
        </div>

    )

}
export default SideBasket



const responsiveOptions = [
    {
        breakpoint: '1400px',
        numVisible: 2,
        numScroll: 1
    },
    {
        breakpoint: '1199px',
        numVisible: 3,
        numScroll: 1
    },
    {
        breakpoint: '767px',
        numVisible: 2,
        numScroll: 1
    },
    {
        breakpoint: '575px',
        numVisible: 1,
        numScroll: 1
    }
];






