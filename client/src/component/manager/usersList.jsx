import React, { useState, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { DataScroller } from 'primereact/datascroller';
import { useDeleteUserMutation, useGetUsersQuery } from '../../features/user/userApiSlice';
import { useFormik } from 'formik';
import { Toast } from 'primereact/toast';
import { useCreateUserMutation } from '../../features/user/userApiSlice';
import { Divider } from 'primereact/divider';
import { InputText } from 'primereact/inputtext';
import { AutoComplete } from "primereact/autocomplete";
import 'primeicons/primeicons.css';

import 'primeflex/primeflex.css';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';

import { Dialog } from 'primereact/dialog';
import { classNames } from 'primereact/utils';



export default function UserList() {

    // const [users, setUsers] = useState(props.users);
    const [deleteUser, { isError: ie1, isSuccess, error: e1 }] = useDeleteUserMutation()
    const {
        data: users,
        isLoading,
        isError,
        error,
    } = useGetUsersQuery()
    const [registerVisible, setRegisterVisible] = useState(false);
    function isOnlyDigits(string) {
        for (let i = 0; i < string.length; i++) {
            const ascii = string.charCodeAt(i);
            if (ascii < 48 || ascii > 57) {
                return false;
            }
        }

        return true;
    }
    const deleteButton = (e) => {
        return <Button icon="pi pi-trash" rounded text raised severity="help" onClick={() => deleted(e)} />

    }
    const deleted = (e) => {
        deleteUser({ _id: e._id })
    }


    const rowClass = (data) => {
        return {
            'bg-primary': data.roles === 'manager'
        };
    };




    const table = () => {
        return (
            <div className="card">
                <DataTable value={users} tableStyle={{ minWidth: '50rem' }} dataKey="_id" rowClassName={rowClass}>
                    <Column field="username" header="Username" sortable style={{ width: '17%' }}></Column>
                    <Column field="name" header="Name" sortable style={{ width: '17%' }}></Column>
                    <Column field="phone" header="Phone" sortable style={{ width: '17%' }}></Column>
                    <Column field="email" header="Email" sortable style={{ width: '17%' }}></Column>
                    <Column field="roles" header="Role" sortable style={{ width: '17%' }}></Column>
                    <Column field="_id" header="Delete" style={{ width: '10%' }} body={(e) => deleteButton(e)}></Column>
                </DataTable>
            </div>
        );
    }
    const header =
        <div className="flex flex-wrap align-items-center justify-content-between gap-2">
            <span className="text-xl text-900 font-bold">Users List:</span>

            <Button label="Add User" severity="add" rounded icon="pi pi-user-plus" onClick={() => { setRegisterVisible(true) }} />


        </div>
    const footer = `In total there are ${users.length} users.`;
    const toast = useRef(null);
    const [items, setItems] = useState(["user", "manager"]);
    const search = (event) => {
        let _items = ["user", "manager"];
        setItems(_items);
    }
    
    const [createUser, { isError: a, isSuccess: aa, isLoading: aaa, data: aaaa,
        error: aaaaa }] = useCreateUserMutation()
    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
            phone: '',
            email: '',
            name: '',
            roles: 'user'
        },
        validate: (data) => {
            let errors = {};

            if (!data.username) {
                errors.username = 'username is required.';
            }
            if (data.username.toLowerCase() != data.username) {
                errors.username = 'username must be in lowerCase';
            }


            if (!data.password)
                errors.password = ' password is required.';

            if (!data.phone) {
                errors.phone = 'phone is required.';
            }
            if (!isOnlyDigits(data.phone)) {
                errors.phone = 'phone must contain only numbers.';
            }

            if (!data.name)
                errors.name = ' name is required.';

            if (data.email && data.email.toLowerCase() != data.email) {
                errors.email = 'email must be in lowerCase';
            }

            if (data.roles != 'user' && data.roles != 'manager') {
                errors.roles = 'select only from the given options';
            }
            return errors;
        },
        onSubmit: (data) => {
            data && show(data);
            console.log(data);
            formik.resetForm();
            createUser(data);
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

    if (isLoading) return <h1>Loading</h1>
    if (isError) return <h2>{error}</h2>

    return (
        <>
            <DataScroller value={users} itemTemplate={table} rows={1} inline scrollHeight="820px" header={header} footer={footer} />




            <Dialog
                visible={registerVisible}
                modal
                onHide={() => setRegisterVisible(false)}
                content={({ hide }) => (
                    <form onSubmit={formik.handleSubmit} className="flex flex-column gap-2">
                        <div className="flex flex-column px-8 py-5 gap-4" style={{ borderRadius: '12px', backgroundColor: 'white', color: 'black' }}>
                            <label htmlFor="title" className="flex flex-wrap justify-content-center align-items-center gap-2" style={{ fontSize: "20px" }}>
                                Enter Your Details
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
                                    id="username"
                                    name="username"
                                    value={formik.values.username}
                                    onChange={(e) => {
                                        formik.setFieldValue('username', e.target.value);
                                    }}
                                    className={classNames({ 'p-invalid': isFormFieldInvalid('username') })}
                                />
                                <label htmlFor="input_value">username</label>
                            </span>
                            {getFormErrorMessage('username')}

                            <span className="p-float-label">
                                <Toast ref={toast} />
                                <InputText
                                    id="password"
                                    type='password'
                                    name="password"
                                    value={formik.values.password}
                                    onChange={(e) => {
                                        formik.setFieldValue('password', e.target.value);
                                    }}
                                    className={classNames({ 'p-invalid': isFormFieldInvalid('password') })}
                                />
                                <label htmlFor="input_value">password</label>
                            </span>
                            {getFormErrorMessage('password')}

                            <span className="p-float-label">
                                <Toast ref={toast} />
                                <AutoComplete id="roles"
                                    style={{ width: "220px" }}
                                    name="roles"
                                    suggestions={items}
                                    completeMethod={search}
                                    value={formik.values.roles}
                                    onChange={(e) => {

                                        formik.setFieldValue('roles', e.target.value);
                                    }} dropdown
                                    className={classNames({ 'p-invalid': isFormFieldInvalid('roles') })}
                                />
                                <label htmlFor="input_value">role</label>
                            </span>
                            {getFormErrorMessage('roles')}

                            <span className="p-float-label">
                                <Toast ref={toast} />
                                <InputText
                                    id="phone"
                                    name="phone"
                                    value={formik.values.phone}
                                    onChange={(e) => {
                                        formik.setFieldValue('phone', e.target.value);
                                    }}
                                    className={classNames({ 'p-invalid': isFormFieldInvalid('phone') })}
                                />
                                <label htmlFor="input_value">phone</label>
                            </span>
                            {getFormErrorMessage('phone')}
                            <span className="p-float-label">
                                <Toast ref={toast} />
                                <InputText
                                    id="email"
                                    name="email"
                                    value={formik.values.email}
                                    onChange={(e) => {
                                        formik.setFieldValue('email', e.target.value);
                                    }}
                                    className={classNames({ 'p-invalid': isFormFieldInvalid('email') })}
                                />
                                <label htmlFor="input_value">email</label>
                            </span>
                            {getFormErrorMessage('email')}
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
                                    <Button style={{ backgroundColor: "#22C55E" }} label="Cancel" onClick={() => setRegisterVisible(false)} /></div>
                            </div>
                        </div>
                    </form>

                )}
            ></Dialog></>
    );
}
