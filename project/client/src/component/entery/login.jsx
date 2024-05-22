import { Divider } from 'primereact/divider';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import React from 'react';
import 'primeicons/primeicons.css';
import { PrimeReactProvider } from 'primereact/api';
import 'primeflex/primeflex.css';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import { setToken } from '../../features/auth/authSlice';
import { useDispatch } from 'react-redux';
import './index1.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react'
import { useLoginMutation, useRegisterMutation } from '../../features/auth/authApiSlice';
import { Dialog } from 'primereact/dialog';
import { useFormik } from 'formik';
import { Toast } from 'primereact/toast';
import { classNames } from 'primereact/utils';
import FromToken from '../../hooks/fromToken';

function Login(props) {
    const [loginFunc, { isError, error, isSuccess, data }] = useLoginMutation()
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [visible, setVisible] = useState(false);
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


    const toast = useRef(null);

    const show = () => {
        toast.current.show({ severity: 'success', summary: 'Form Submitted', detail: formik.values.value });
    };

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
            phone: '',
            email: '',
            name: ''
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


            return errors;
        },
        onSubmit: (data) => {
            data && show(data);
            formik.resetForm();
            registerFunc(data);
            setRegisterVisible(false);


        }
    });

    const isFormFieldInvalid = (name) => !!(formik.touched[name] && formik.errors[name]);

    const getFormErrorMessage = (name) => {
        return isFormFieldInvalid(name) ? <small className="p-error">{formik.errors[name]}</small> : <small className="p-error">&nbsp;</small>;
    };

    useEffect(() => {

        if (isError) {
            setVisible(true)
        }
        if (isSuccess) {
            dispatch(setToken(data))

            console.log(props.from);
            if (props.from === "entery") {
                if (FromToken().roles === "user")
                    navigate("/homePageUser")
                if (FromToken().roles === "manager")
                    navigate("/homePageManager")
            }
            if (props.from === "products") {
                if (FromToken().roles === "user") {
                    navigate("/productsUser")
                    window.location.reload(false);
                }
                if (FromToken().roles === "manager") {
                    navigate("/homePageManager")
                    window.location.reload(false);
                }
            }

        }
    }, [isSuccess, isError])
    const [registerFunc, { isError2, isSuccess2, isLoading2, data2,
        error2 }] = useRegisterMutation()

    return (
        <>
            <div className="card flex justify-content-center">
                <Dialog header="Unauthorized" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
                    <p className="m-0">
                        Try again!!
                    </p>
                </Dialog>
            </div>



            <div className="card">
                <div className="flex flex-column md:flex-row">
                    <div className="w-full md:w-5 flex flex-column align-items-center justify-content-center gap-3 py-5">
                        <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                            <label className="w-6rem">Username</label>
                            <InputText id="username" type="text" className="w-12rem" onChange={(e) => { setUsername(e.target.value) }} />
                        </div>
                        <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                            <label className="w-6rem">Password</label>
                            <InputText id="password" type="password" className="w-12rem" onChange={(e) => { setPassword(e.target.value) }} />
                        </div>
                        <Button label="Login" icon="pi pi-user" className="w-10rem mx-auto" onClick={() => loginFunc({ username: username, password: password })}> </Button>
                    </div>
                    <div className="w-full md:w-2">
                        <Divider layout="vertical" className="hidden md:flex">
                            <b>OR</b>
                        </Divider>
                        <Divider layout="horizontal" className="flex md:hidden" align="center">
                            <b>OR</b>
                        </Divider>
                    </div>
                    <div className="w-full md:w-5 flex align-items-center justify-content-center py-5">
                        <Button label="Sign Up" icon="pi pi-user-plus" severity="success" className="w-10rem" onClick={() => { setRegisterVisible(true) }}></Button>
                    </div>
                </div>
            </div>


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
            ></Dialog>
        </>
    )
}

export default Login;





