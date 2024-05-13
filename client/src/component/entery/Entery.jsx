import './Entery.css';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import 'primeicons/primeicons.css';
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Login from './login';
import { useDispatch } from 'react-redux';
import {  removeToken } from '../../features/auth/authSlice';
import apiSlice from '../../app/apiSlice';

function Entery() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [visible, setVisible] = useState(false);


  return (
    <>
      <body>

        <div class="container">
          <h1>Welcome to the Chinese Aucton!</h1>
          <Button label="Get Start!!" icon="pi-arrow-right" onClick={() => { dispatch(removeToken()); dispatch(apiSlice.util.resetApiState()); navigate('/homePageUser') }} />
          <br></br>
          <Button label="Login" icon="pi-gift" onClick={() => setVisible(true)} />
          <Dialog header="Welcome:)" visible={visible} onHide={() => setVisible(false)}
            style={{ width: '50vw' }} breakpoints={{ '960px': '75vw', '641px': '100vw' }}>
            <Login from={"entery"} />
          </Dialog>
        </div>
{/* 
        <script>{
          setInterval(function () {
            const col = ["", "#ff1a1a", "#13f01e", "#FFD700", "#a10ff5", "#0fc7f5"]
            const confetti = document.createElement("div");
            confetti.className = "confetti";
            confetti.style.top = Math.random() * 100 + "vh";
            confetti.style.left = Math.random() * 100 + "vw";
            confetti.style.background = col[Math.ceil((Math.random() * col.length))]
            document.body.appendChild(confetti);
          }, 100) // Add a new confetti every second


        } </script> */}
      </body>

    </>
  )
}

export default Entery;