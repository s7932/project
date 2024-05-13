import React, { useState, useEffect } from 'react';
import { useGetBasketQuery} from '../../features/user/userApiSlice'
import BasketList from './basketList'
import NavUser from './navUser'

const Basket = () => {


    const {
        data: data,
        isLoading,
        isError,
        error
    } = useGetBasketQuery()
    
    if (isLoading) return <h1>Loading</h1>
    if (isError) return <h2>{error}</h2>

    return (
        <>
            <NavUser />

            <BasketList basket={data}/>
        </>
    )



}
export default Basket