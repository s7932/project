import NavManager from './navManager'
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import React, { useState, useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import { Toast } from 'primereact/toast';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { InputTextarea } from "primereact/inputtextarea";
import { useCreateNewMsgMutation } from '../../features/message/messageApiSlice'
import MessageList from '../../features/message/messageList';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Divider } from 'primereact/divider';
const MessageManager = () => {


    const [createNewMsg, {isError, isSuccess, error, isLoading }] = useCreateNewMsgMutation()


    useEffect(()=>
    {
       if(isError)
       {
        setVisibleError(true)
            // console.log(error.data.message);
            
       }
    },error)
    const [visible, setVisible] = useState(false);
    const [visibleError, setVisibleError] = useState(false);

    const toast = useRef(null);
    const formik = useFormik({
        initialValues: {
            to: '',
            content: ''
        },

        validate: (data) => {
            let errors = {};
            if (!data.to) {
                errors.to = 'this filed is required.';
            }
            if (!data.content) {
                errors.content = 'this filed is required.';
            }
            return errors;
        },
        onSubmit: (data) => {
            data && show(data);
            formik.resetForm();
            createNewMsg(data);
           
            if (isLoading) {
                return <div className="card flex justify-content-center">
                    <ProgressSpinner />
                </div>
              
            }
          

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
            <NavManager />
            <Toast ref={toast} />
            <div className="card flex justify-content-center">
                <Button label="new msg" icon="pi pi-comments" onClick={() => setVisible(true)} />
                <Dialog visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)} modal content={({ hide }) => (
                    <form onSubmit={formik.handleSubmit} className="flex flex-column gap-2">
                        <div className="flex flex-column px-8 py-5 gap-4" style={{ borderRadius: '12px', backgroundColor: 'white', color: 'black' }}>
                            <label htmlFor="title" className="flex flex-wrap justify-content-center align-items-center gap-2" style={{ fontSize: "20px" }}>
                                Enter the Message Details
                            </label>

                            <h6>Please note, To send a general message, enter the word "all" in the recipient field</h6>
                            <span className="p-float-label">
                               
                                <InputText
                                    id="to"
                                    name="to"
                                    value={formik.values.to}
                                    onChange={(e) => {
                                        formik.setFieldValue('to', e.target.value);
                                    }}
                                    className={classNames({ 'p-invalid': isFormFieldInvalid('to') })}
                                />
                                <label htmlFor="input_value">to (username)</label>
                            </span>
                            {getFormErrorMessage('to')}

                            <span className="p-float-label">
                                <Toast ref={toast} />
                                <InputTextarea id="content"
                                    value={formik.values.content}
                                    onChange={(e) => {
                                        formik.setFieldValue('content', e.target.value);
                                    }}
                                    rows={5}
                                    cols={30}
                                    className={classNames({ 'p-invalid': isFormFieldInvalid('content') })}
                                    name="content" />

                                <label htmlFor="input_value">content</label>
                            </span>
                            {getFormErrorMessage('content')}
                            <div className="flex flex-column md:flex-row">
                                <div className="w-full md:w-5 flex flex-column align-items-center justify-content-center gap-3 py-5">
                                    <Button type="submit" label="Submit" />
                                </div>
                                <div className="w-full md:w-2">

                                    <Divider layout="vertical" className="hidden md:flex">

                                    </Divider>
                                    <Divider layout="horizontal" className="flex md:hidden" align="center">

                                    </Divider>

                                </div>
                                <div className="w-full md:w-5 flex align-items-center justify-content-center py-5">
                                    <Button style={{ backgroundColor: "#22C55E" }} label="Cancel" onClick={() => setVisible(false)} />
                                </div>


                            </div >
                        </div >
                    </form >
                )}></Dialog>


            </div>
            <MessageList />

            <Dialog header="This username isn't define" visible={visibleError} onHide={() => setVisibleError(false)}
                style={{ width: '50vw' }} breakpoints={{ '960px': '75vw', '641px': '100vw' }}>

            </Dialog>
        </>
    )


}
export default MessageManager