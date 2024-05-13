
import { useCancelProductMutation, useGetCountQuery, useBuyProductMutation, useDecreaseProductMutation } from '../../features/product/productApiSlice'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { DataScroller } from 'primereact/datascroller';
import React, { useState } from "react";
import { Dialog } from 'primereact/dialog';
import { useGetSumOfCardQuery ,useCompletionPurchaseMutation} from '../../features/user/userApiSlice';
import { ProgressSpinner } from 'primereact/progressspinner';
const BasketList = (props) => {
    const [buyProduct, { isError, isSuccess, error }] = useBuyProductMutation()
    const [cancelProduct, { isError: a, isSuccess: aa, error: aaa }] = useCancelProductMutation()
    const [decreaseProduct, { isError: b, isSuccess: bb, error: bbb }] = useDecreaseProductMutation()
    const [completionPurchase, { isError: c, isSuccess: cc, isLoading: ccc, data: cccc,
        error: ccccc }] = useCompletionPurchaseMutation()
    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    };
    const {
        data: total,
        isLoading: il,
        isError: ie,
        error: er
    } = useGetSumOfCardQuery()
    const [visible, setVisible] = useState(false);  
    
    const footerContent = (
        <div>
            <Button label="No" icon="pi pi-times" onClick={() => setVisible(false)} className="p-button-text" />
            <Button label="Yes" icon="pi pi-check" onClick={() => {completionPurchase();setVisible(false)}} autoFocus />
        </div>
    );
    const imageBodyTemplate = (product) => {
        return <img src={`http://localhost:7777/uploads/${product.image.split("\\")[2]}`} alt={product.image} className="w-6rem shadow-2 border-round" />;
    };

    const priceBodyTemplate = (product) => {
        return formatCurrency(product.price);
    };
    const ToDecreaselProduct = (product) => {
        const { data, isLoading, isError, error } = useGetCountQuery(product._id)
        
         if (isLoading ) return <div className="card flex justify-content-center">
         <ProgressSpinner />
     </div>
        return <div className="card flex flex-column align-items-center" style={{ width: "10px" }}>
            <span className="font-bold text-4xl mb-5">{data.count}</span>


            <div className="flex flex-wrap gap-3">
                <Button icon="pi pi-plus" className="p-button-outlined p-button-rounded p-button-success" onClick={() => { buyProduct({ "_idProduct": product._id }); }}></Button>
                <Button icon="pi pi-minus" className="p-button-outlined p-button-rounded" onClick={() => { decreaseProduct({ "_idProduct": product._id }); }}></Button>
            </div></div>;
    };


    const ToCancelProduct = (product) => {
        const { data, isLoading, isError, error } = useGetCountQuery(product._id)
        if (isLoading) return <div className="card flex justify-content-center">
            <ProgressSpinner />
        </div>
        return <Button icon="pi pi-times" rounded outlined severity="help" aria-label="Favorite" onClick={() => { cancelProduct({ "_idProduct": product._id }); }} />;
    };

    if ( il) return <div className="card flex justify-content-center">
            <ProgressSpinner />
        </div>
    const table = () => {
        return (
            <div className="card">
                <DataTable scrollable={true} value={props.basket} tableStyle={{ minWidth: '60rem' }} filter filterBy="name">
                    <Column field="name" header="Name"></Column>
                    <Column header="Image" body={imageBodyTemplate}></Column>
                    <Column field="price" header="Price" body={priceBodyTemplate}></Column>
                    <Column field="amount" header="Amount" body={ToDecreaselProduct} > </Column>
                    <Column field="cancel" header="Cancel" body={ToCancelProduct}></Column>
                </DataTable>

            </div>)
    }
    const header  =<>
         <div className="card flex justify-content-center">
         <Button label="Completion of purchase" icon="pi pi-credit-card" onClick={() =>{setVisible(true);}} />
     </div></>
    

    const footer = `In total there are ${total.counter} products, total payment ${total.sum}$`;

    return (
        <>
        <DataScroller value={props.basket} itemTemplate={table} rows={1} inline scrollHeight="740px" header={header} footer={footer} />

        <Dialog visible={visible} style={{ width: '30vw' }} onHide={() => setVisible(false)} footer={footerContent}>
                <p className="m-0">
                Are you sure you want to purchase {total.counter} cards in the amount of {total.sum} dollars?
                </p>
            </Dialog>
        </>
    );



}
export default BasketList