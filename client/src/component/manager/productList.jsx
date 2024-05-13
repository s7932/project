import React, { useState, useRef, useEffect } from 'react';
import { Button } from 'primereact/button';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Dialog } from 'primereact/dialog';
import { classNames } from 'primereact/utils';
import Login from '../entery/login';
import { useDeleteProductMutation, useAddProductMutation, useUpdateProductMutation } from '../../features/product/productApiSlice'
import { InputText } from 'primereact/inputtext';
import '../user/gridlist.css'
import { Divider } from 'primereact/divider';
import { AutoComplete } from "primereact/autocomplete";
import { useFormik } from 'formik';
import { Toast } from 'primereact/toast';
import { FileUpload } from 'primereact/fileupload';
import { DataScroller } from 'primereact/datascroller';
import { useCreateNewMsgMutation } from '../../features/message/messageApiSlice'

const ProductList = (props) => {
    const [createNewMsg, { isError: ie3, isSuccess: is3, error: er3 }] = useCreateNewMsgMutation()
    const [deleteProduct, { isError: ie, isSuccess: is, error: er }] = useDeleteProductMutation()
    const [updateProduct, { isError: ie2, isSuccess: is2, error: er2 }] = useUpdateProductMutation()
    const [products, setProducts] = useState(props.data);
    const [layout, setLayout] = useState('grid'); 
    const [visible, setVisible] = useState(false);
    const [deleteVisible, setDeleteVisible] = useState(false);
    const [typeSubmit, setTypeSubmit] = useState("create")
    const _id = useRef(null);
    const [initialValues, setInitialValues] = useState({
        _id: "",
        image: {},
        description: '',
        name: '',
        price: 'basic'
    });
    const resetInitialValues = {
        _id: "",
        image: {},
        description: '',
        name: '',
        price: 'basic'
    }

    const handleDelete = (product) => {
        deleteProduct(product._id);
        props.refetch()
    }
    useEffect(() => {
     
    }, [products])
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
                            <Button icon="pi pi-trash" rounded text raised severity="help" onClick={() => { _id.current = product._id; setDeleteVisible(true) }} />
                            <Button icon="pi pi-pencil" rounded text raised severity="help" onClick={() => {
                                formik.setFieldValue('price', product.price);
                                formik.setFieldValue('_id', product._id);
                                formik.setFieldValue('image', product.image);
                                formik.setFieldValue('name', product.name);
                                formik.setFieldValue('description', product.description);

                                setTypeSubmit("update");
                                setRegisterVisible(true);
                                <Dialog visible={deleteVisible} style={{ width: '30vw' }} onHide={() => setDeleteVisible(false)} footer={footerContent}>
                                    <p className="m-0">
                                        Are you sure you want to delete this product?
                                    </p>
                                </Dialog>
                            }} />
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const footerContent = (
        <div>
            <Button label="No" icon="pi pi-times" onClick={() => setDeleteVisible(false)} className="p-button-text" />
            <Button label="Yes" icon="pi pi-check" onClick={() => { deleteProduct(_id.current); props.refetch() }} autoFocus />
        </div>
    );
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
                        <div>
                        <Button icon="pi pi-trash" rounded text raised severity="help" onClick={() => { _id.current = product._id; setDeleteVisible(true) }} />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Button icon="pi pi-pencil" rounded text raised severity="help" onClick={() => {
                                formik.setFieldValue('price', product.price);
                                formik.setFieldValue('_id', product._id);
                                formik.setFieldValue('image', product.image);
                                formik.setFieldValue('name', product.name);
                                formik.setFieldValue('description', product.description);
                                setTypeSubmit("update");
                                { console.log(initialValues); }
                                setRegisterVisible(true);

                                <Dialog visible={deleteVisible} style={{ width: '30vw' }} onHide={() => setDeleteVisible(false)} footer={footerContent}>
                                    <p className="m-0">
                                        Are you sure you want to delete this product?
                                    </p>
                                </Dialog>
                            }} />
                        </div>
                    </div>
                </div>



                <Dialog visible={deleteVisible} style={{ width: '30vw' }} onHide={() => setDeleteVisible(false)} footer={footerContent}>
                    <p className="m-0">
                        Are you sure you want to delete this product?
                    </p>
                </Dialog>
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
        if(!props.data){
        
            return <></>
        }
        if (layout === 'grid')
            return <div className="grid-nogutter grid "  >{props.data.map((product, index) => itemTemplate(product, layout, index))}</div>;
        else
            return <div className="grid-nogutter "  >{props.data.map((product, index) => itemTemplate(product, layout, index))}</div>;
    };


    const header = () => {

        return (
            <>
                <div className="flex flex-wrap align-items-center justify-content-between gap-2">
                    <div className="flex justify-content-start ">

                        <Button label="Add Product" severity="add" rounded icon="pi pi-plus" onClick={() => { setTypeSubmit("create"); setRegisterVisible(true) }} />
                    </div>
                    <div className="flex justify-content-end ">
                        <InputText placeholder="Search" type="text" className="w-8rem sm:w-auto" onChange={(e) => { const find = props.data.filter((prod) => prod.name.toLowerCase().includes(e.target.value)); setProducts(find)}} />
                        &nbsp; &nbsp;&nbsp;&nbsp;
                        <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
                    </div>

                </div>

            </>
        );
    };

    const toast = useRef(null);
    const [items, setItems] = useState(["user", "manager"]);
    const search = (event) => {
        let _items = ['basic', 'gold', 'premium'];
        setItems(_items);
    }
    const [registerVisible, setRegisterVisible] = useState(false);
    const [addProduct, { isError: a, isSuccess: aa, isLoading: aaa, data: aaaa, error: aaaaa }] = useAddProductMutation()
    useEffect(() => {
        if (aa) {
            props.refetch()
        }

    }, [aa])

    useEffect(() => {
        if (is2) {
            props.refetch()
        }

    }, [is2])
    const formik = useFormik({
        initialValues: initialValues,

        validate: (data) => {
            let errors = {};
            if (!data.name) {
                errors.name = 'name is required.';
            }
            if (!data.image) {
                errors.image = 'image is required.';
            }
            if (data.price != 'basic' && data.price != 'gold' && data.price != 'premium') {
                errors.price = 'select only from the given options';
            }
            return errors;
        },
        onSubmit: (data) => {
            const formaData = new FormData()
            formaData.append('image', data.image)
            formaData.append('description', data.description)
            formaData.append('name', data.name)
            formaData.append('price', data.price)
            formaData.append('_id', data._id)
            data && show(data);
            formik.setFieldValue(initialValues);

            // setInitialValues(resetInitialValues) ;
            if (typeSubmit === "create") {
                addProduct(formaData);
                createNewMsg({ to: "all", content: `Please note, a new product '${data.name}' was added!!` })
            }
            else
                updateProduct(formaData);
            formik.resetForm()
            setRegisterVisible(false);


        }
    });

    const isFormFieldInvalid = (name) => !!(formik.touched[name] && formik.errors[name]);

    const getFormErrorMessage = (name) => {
        return isFormFieldInvalid(name) ? <small className="p-error">{formik.errors[name]}</small> : <small className="p-error">&nbsp;</small>;
    };

    const show = () => {
        toast.current.show({ severity: 'success', summary: 'Form Submitted', detail: formik.values.value });
    };
    return (
        <>
            <div className="card">
                <DataScroller value={products} itemTemplate={listTemplate} rows={1} inline scrollHeight="800px" layout={layout} header={header()} />
                <Toast ref={toast} />
            </div>



            <Dialog
                visible={registerVisible}
                modal
                onHide={() => setRegisterVisible(false)}
                content={({ hide }) => (
                    <form onSubmit={formik.handleSubmit} className="flex flex-column gap-2">
                        <div className="flex flex-column px-8 py-5 gap-4" style={{ borderRadius: '12px', backgroundColor: 'white', color: 'black' }}>
                            <label htmlFor="title" className="flex flex-wrap justify-content-center align-items-center gap-2" style={{ fontSize: "20px" }}>
                                Enter the Product`s Details
                            </label>
                            <span className="p-float-label">
                                <Toast ref={toast} />
                                <InputText
                                    id="name"
                                    name="name"
                                    value={formik.values.name}
                                    onChange={(e) => {
                                        formik.setFieldValue('name', e.target.value);
                                    }}
                                    className={classNames({ 'p-invalid': isFormFieldInvalid('name') })}
                                />
                                <label htmlFor="input_value">name</label>
                            </span>
                            {getFormErrorMessage('name')}
                            <span className="p-float-label">
                                <Toast ref={toast} />
                                <InputText
                                    id="description"
                                    name="description"
                                    value={formik.values.description}
                                    onChange={(e) => {
                                        formik.setFieldValue('description', e.target.value);
                                    }}
                                    className={classNames({ 'p-invalid': isFormFieldInvalid('description') })}
                                />
                                <label htmlFor="input_value">description</label>
                            </span>
                            {getFormErrorMessage('description')}

                            <span className="p-float-label">
                                <Toast ref={toast} />
                                <AutoComplete id="price"
                                    style={{ width: "220px" }}
                                    name="price"
                                    suggestions={items}
                                    completeMethod={search}
                                    value={formik.values.price}
                                    onChange={(e) => {

                                        formik.setFieldValue('price', e.target.value);
                                    }} dropdown
                                    className={classNames({ 'p-invalid': isFormFieldInvalid('price') })}
                                />
                                <label htmlFor="input_value">price</label>
                            </span>
                            {getFormErrorMessage('price')}

                            <span className="p-float-label">
                                <Toast ref={toast} />
                                <InputText
                                    id="image"
                                    required={true}
                                    name="image"
                                    type="file"
                                    style={{ width: "220px" }}
                                    value={formik.values.email}
                                    onChange={(e) => {
                                        formik.setFieldValue('image', e.target.files[0]);
                                    }}
                                    className={classNames({ 'p-invalid': isFormFieldInvalid('image') })}
                                />

                                {/* <FileUpload mode="basic" name="demo[]" url="/api/upload" accept="image/*" maxFileSize={1000000} onUpload={onUpload} /> */}
                                <label htmlFor="input_value">image</label>
                            </span>
                            {getFormErrorMessage('image')}
                            <div className="flex flex-column md:flex-row">
                                <div className="w-full md:w-5 flex flex-column align-items-center justify-content-center gap-3 py-5">
                                    <Button type="submit" label="Submit" /></div>
                                <div className="w-full md:w-2">
                                    <Divider layout="vertical" className="hidden md:flex">

                                    </Divider>
                                    <Divider layout="horizontal" className="flex md:hidden" align="center">

                                    </Divider>
                                </div>
                                <div className="w-full md:w-5 flex align-items-center justify-content-center py-5">
                                    <Button style={{ backgroundColor: "#22C55E" }} label="Cancel" onClick={() => {
                                        formik.setFieldValue('name', "");
                                        formik.setFieldValue('image', {});
                                        formik.setFieldValue('price', "basic");
                                        formik.setFieldValue('description', '');
                                        setRegisterVisible(false)
                                    }} /></div>
                            </div>
                        </div>
                    </form>

                )}
            ></Dialog>
        </>
    )
}


export default ProductList  