
import { Menubar } from 'primereact/menubar';
import React, { useEffect, useState } from 'react';
import { Badge } from 'primereact/badge';
import 'primeicons/primeicons.css';
import { useDispatch } from 'react-redux';
import { removeToken } from '../../features/auth/authSlice';
import apiSlice from '../../app/apiSlice';
import { useNavigate } from 'react-router-dom';
import Login from '../entery/login';
import { Dialog } from 'primereact/dialog';
import FromToken from '../../hooks/fromToken';
import { useGetCountNewMsgQuery } from '../../features/message/messageApiSlice';
import { ProgressSpinner } from 'primereact/progressspinner';
import img from "../../image/LOGO.png"
export default function NavUser() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {
        data,
        isLoading,
        isError,
        error
    } = useGetCountNewMsgQuery()

   

    const [visible, setVisible] = useState(false);
    const [name, setName] = useState(FromToken().name)
   
    
    if (isLoading)
    return <div className="card flex justify-content-center">
        <ProgressSpinner />
    </div>
    
    const click = () => {
        dispatch(removeToken())
        dispatch(apiSlice.util.resetApiState())
        navigate('/');
        
    }

    const itemRenderer = (item) => (

        <a className="flex align-items-center p-menuitem-link">
            <span className={item.icon} />
            <span className="mx-2">{item.label}</span>
            {item.badge && <Badge className="ml-auto" value={item.badge} />}
        </a>
    );
    const items = [
        {
            label: 'Home',
            icon: 'pi pi-home',
            url: "/homePageUser"

        },
        {
            label: 'Products',
            icon: 'pi pi-th-large',
            url: "/productsUser"
        },
        localStorage.getItem("token") ? {
            label: 'My Basket',
            icon: 'pi pi-shopping-bag',
            url: "/basket"
        } : {
            label: 'Login',
            icon: 'pi pi-user',
            command: () => {setVisible(true) }
        },
        localStorage.getItem("token") ? {
            label: 'Contact',
            icon: 'pi pi-envelope',
            badge: data.count,
            template: itemRenderer,
            command:()=>{navigate('/messageUser')}
        } : <></>,
        localStorage.getItem("token") ? {
            label: 'Logout',
            icon: 'pi pi-user',
            command: click
        } : <></>
    ];




      

    

    const start = <img alt="logo" src={img} height="40" className="mr-2"></img>;
    const end = <div>Hello {name}</div>


    return (

        <div>
            <Menubar model={items} start={start} end={end} style={{ backgroundColor: "black", color: "white", fontSize: "15px" }} />

            <Dialog header="Welcome:)" visible={visible} onHide={() => setVisible(false)}
                style={{ width: '50vw' }} breakpoints={{ '960px': '75vw', '641px': '100vw' }}>
                <Login from={"products"} />
            </Dialog></div>
    )
}
