
import React, { useEffect, useState } from 'react';
import { Card } from 'primereact/card';
import { useGetUserByIdQuery } from '../user/userApiSlice';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Accordion, AccordionTab } from 'primereact/accordion'
import { Button } from 'primereact/button';

import { useUpdateShowMutation,useDeleteMsgMutation } from './messageApiSlice';
const CardMessageGet = (props) => {
    const {
        data: user,
        isLoading,
        isError,
        error
    } = useGetUserByIdQuery(props.msg.from)
    const [deleteMsg, { isError: ie2, isSuccess: is2, error: er2 }] = useDeleteMsgMutation()
    const [updateShow, { isError: ie, isSuccess: is, error: er }] = useUpdateShowMutation()
const [activeIndex,setActiveIndex]=useState(1)

useEffect(()=>
{
    if(is)
    props.refetch()
},[is])
    if (isLoading)
        return <div className="card flex justify-content-center">
            <ProgressSpinner />
        </div>

    const title = `From ${user.username}`

    return (
        <>
            <Card title={title} style={{ border: "2px solid #6366F1" }}>
                <div>
                   {props.msg.wasShow==false? <h4 style={{color:"#6366F1"}}>You have not read this message yet</h4>:<></>}
                    <h4>Received at {props.msg.createdAt}</h4>
                    <div><br />

                        <Accordion activeIndex={activeIndex} onTabChange={() =>{ if(!props.msg.wasShow) updateShow(props.msg._id);if(activeIndex==1) setActiveIndex(0) ;else setActiveIndex(1);props.refetch();}}>
                            <AccordionTab header="Content" >
                                <p className="m-5">
                                    {props.msg.content}
                                </p>
                            </AccordionTab>
                        </Accordion>

                    </div>
                    <br></br>
                    <Button icon="pi pi-trash" rounded text raised severity="help" onClick={() => { deleteMsg(props.msg._id)}} />
                </div>

            </Card>

            <br />
        </>
    )
}


const CardMessageSend = (props) => {
    const {
        data: user,
        isLoading,
        isError,
        error
    } = useGetUserByIdQuery(props.msg.to)

    const [updateShow, { isError: ie, isSuccess: is, error: er }] = useUpdateShowMutation()
const [activeIndex,setActiveIndex]=useState(1)

    if (isLoading)
        return <div className="card flex justify-content-center">
            <ProgressSpinner />
        </div>

    const title = `Send to ${user.username}`

    return (
        <>
            <Card title={title} style={{ border: "2px solid #6366F1" }}>
                <div>
                   {props.msg.wasShow==false? <h4 style={{color:"#6366F1"}}>{user.username} have not read this message yet</h4>:<></>}
                    <h4>Received at {props.msg.createdAt}</h4>
                    <div><br />

                        <Accordion activeIndex={activeIndex} onTabChange={() =>{if(activeIndex==1) setActiveIndex(0) ;else setActiveIndex(1);}}>
                            <AccordionTab header="Content" >
                                <p className="m-5">
                                    {props.msg.content}
                                </p>
                            </AccordionTab>
                        </Accordion>

                    </div>
                  
                </div>

            </Card>

            <br />
        </>
    )
}
export  {CardMessageGet,CardMessageSend}