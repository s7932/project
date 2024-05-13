import React, { useState, useRef } from 'react';
import { Button } from 'primereact/button';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Dialog } from 'primereact/dialog';
import { classNames } from 'primereact/utils';
import Login from '../entery/login';
import { useBuyProductMutation } from '../../features/product/productApiSlice'
import { InputText } from 'primereact/inputtext';
import './gridlist.css'
import { Sidebar } from 'primereact/sidebar';
import { Toast } from 'primereact/toast';

import { DataScroller } from 'primereact/datascroller';
import SideBasket from './sideBasket'

const ProductList = (props) => {
    const toast = useRef(null);
    const [buyProduct, { isError, isSuccess, error }] = useBuyProductMutation()
    const [products, setProducts] = useState(props.data);
    const [visibleSideBar, setVisibleSideBar] = useState(false);
    const [layout, setLayout] = useState('grid');
    const [visible, setVisible] = useState(false);


    const listItem = (product, index) => {
        return (

            <div className="col-12" key={product._id}>
                <div className={classNames('flex flex-column xl:flex-row xl:align-items-start p-4 gap-4', { 'border-top-1 surface-border': index !== 0 })}>

                    <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={`http://localhost:7777/uploads/${product.image.split("\\")[2]}`} alt={product.name} />
                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                            <div className="text-2xl font-bold text-900">{product.name}</div>
                            <div className="text-xl font-bold">{product.description}</div>
                            <div className="flex align-items-center gap-3">
                                <span className="flex align-items-center gap-2">
                                    <i className="pi pi-tag"></i>
                                    <span className="font-semibold">{product.category}</span>
                                </span>

                            </div>
                        </div>
                        <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                            <span className="text-2xl font-semibold">${product.price}</span>
                            <Button icon="pi pi-shopping-bag" className="p-button-rounded" on onClick={() => {
                                if (!localStorage.getItem('token')) {
                                    setVisible(true)
                                }
                                else {
                                    buyProduct({ "_idProduct": product._id })

                                    toast.current.show({ severity: 'success', summary: 'Great!!', detail: `you added the '${product.name}' to your basket!!` });

                                }

                            }}></Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
    const gridItem = (product) => {
        return (

            <div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2" key={product._id}>
                <div className="p-4 border-1 surface-border surface-card border-round">
                    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
                        <div className="flex align-items-center gap-2">
                            <i className="pi pi-tag"></i>
                            <span className="font-semibold">{product.code}</span>
                        </div>
                    </div>
                    <div className="flex flex-column align-items-center gap-3 py-5">
                        <img className="w-9 shadow-2 border-round" src={`http://localhost:7777/uploads/${product.image.split("\\")[2]}`} alt={product.name} />
                        <div className="text-2xl font-bold text-900">{product.name}</div>
                        <div className="text-xl font-bold ">{product.description}</div>
                    </div>
                    <div className="flex align-items-center justify-content-between">
                        <span className="text-2xl font-semibold">${product.price}</span>
                        <Button icon="pi pi-shopping-bag" className="p-button-rounded" on onClick={() => {
                            if (!localStorage.getItem('token')) {
                                setVisible(true)
                            }
                            else {
                                buyProduct({ "_idProduct": product._id })

                                toast.current.show({ severity: 'success', summary: 'Great!!', detail: `you added the '${product.name}' to your basket!!` });
                            }

                        }}></Button>
                    </div>
                </div>




                <Dialog header="Welcome:)" visible={visible} onHide={() => setVisible(false)}
                    style={{ width: '50vw' }} breakpoints={{ '960px': '75vw', '641px': '100vw' }}>
                    <Login from={"products"} />
                </Dialog>
            </div>

        );
    };


    const itemTemplate = (product, layout, index) => {
        if (!product) {
            return;
        }

        if (layout === 'list') return listItem(product, index);
        else if (layout === 'grid') return gridItem(product);
    };

    const listTemplate = () => {
        if (layout === 'grid')
            return <div className="grid-nogutter grid "  >{products.map((product, index) => itemTemplate(product, layout, index))}</div>;
        else
            return <div className="grid-nogutter "  >{products.map((product, index) => itemTemplate(product, layout, index))}</div>;
    };



    const header = () => {

        return (
            <>
                <div className="flex justify-content-end ">
                
                    <InputText placeholder="Search" type="text" className="w-8rem sm:w-auto" onChange={(e) => { const find = props.data.filter((prod) => prod.name.toLowerCase().includes(e.target.value)); setProducts(find) }} />
                    &nbsp; &nbsp;&nbsp;&nbsp;
                    {localStorage.getItem("token") ? <Button onClick={() => { setVisibleSideBar(true) }} icon="pi pi-shopping-bag" rounded text raised severity="secondary" aria-label="Bookmark" style={{ position: "absolute", left: '40px' }} /> : <></>}
                    <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
                </div>
                <div className="flex justify-content-end" style={{color:"#6366F1"}}>
                 basic:5$  gold:10$  premium:15$
            </div>
                <Sidebar visible={visibleSideBar} position="bottom" onHide={() => setVisibleSideBar(false)} className="w-full md:h-20rem lg:h-25rem">
                    <div className="card flex justify-content-center" >
                        <SideBasket />
                    </div>
                </Sidebar>
             

            </>
        );
    };

    return (
        <div className="card">
            {/* <DataView  value={products} listTemplate={listTemplate} layout={layout} header={header()} /> */}
            <DataScroller value={products} itemTemplate={listTemplate} rows={1} inline scrollHeight="60rem" layout={layout} header={header()}  />
            <Toast ref={toast} />
        </div>
    )
}


export default ProductList  