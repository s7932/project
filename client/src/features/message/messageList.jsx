import React, { useState, useRef } from 'react';
import { DataScroller } from 'primereact/datascroller';
import 'primeicons/primeicons.css';
import { useGetGetQuery, useGetSendQuery } from './messageApiSlice';
import 'primeflex/primeflex.css';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import { ProgressSpinner } from 'primereact/progressspinner';
import {CardMessageGet,CardMessageSend} from './cardMessage'
import { Divider } from 'primereact/divider';

const MessageList = () => {

    const {
        data: dataGet,
        isLoading: isLoadingGet,
        isError: isErrorGet,
        error: errorGet, refetch: refetchGet
    } = useGetGetQuery()
    const {
        data: dataSend,
        isLoading: isLoadingSend,
        isError: isErrorSend,
        error: errorSend, refetch: refetchSend
    } = useGetSendQuery()


    if (isLoadingGet || isLoadingSend)
        return <div className="card flex justify-content-center">
            <ProgressSpinner />
        </div>

    const listTemplate = () => {
        return (
            <div className="flex flex-column md:flex-row">
                <div className="w-full md:w-5 flex flex-column align-items-center gap-3 py-5">
                    <h3>Messages received</h3>
                    <div className="flex flex-wrap justify-content-center justify-content-center align-items-center gap-2">
                        {dataGet.length>0?dataGet.map(msg => <CardMessageGet msg={msg} refetch={refetchGet}  />):<></>}
                    </div>
                </div>
                
                <div classNam="w-full md:w-2">
                    <Divider layout="vertical" className="hidden md:flex align-items-center" align='center'>
                    </Divider>
                    <Divider layout="horizontal" className="flex md:hidden" align="center">
                    </Divider>
                </div>

                <div className="w-full md:w-5 flex flex-column gap-3 py-5">
                    <h3>Messages sent </h3>
                    <div className="flex flex-wrap justify-content-center align-items-center gap-2">

                        {dataSend.length>0?dataSend.map(msg =><CardMessageSend msg={msg} refetch={refetchSend}  />):<></>}
                    </div>
                </div>
            </div>


        )
    };



    return (

        <>

            <DataScroller value={[dataSend, dataGet]} itemTemplate={listTemplate} rows={1} inline scrollHeight="60rem" />



        </>
    )
}
export default MessageList