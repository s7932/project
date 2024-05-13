import logo from './logo.svg';
import './App.css';
import Login from './component/entery/login'
import Entery from './component/entery/Entery'
import ProductsUser from './component/user/product';
import Basket from './component/user/basket';
import HomePageUser from './component/user/homePage/homePageUser';
import {Link, Route, Routes} from 'react-router-dom';
import ProductsManeger from './component/manager/product'
import Users from './component/manager/users'
import HomePageManager from './component/manager/homePageManeger'
import './flags.css';
import MessageUser from './component/user/messageUser';
import MessageManager from './component/manager/messageManager';
// import Home from './material-ui-master/Home'
function App() {
  return (
 <>
<Routes>
        <Route path='/' element={<Entery/>}/>
        {/* <Route path='/' element={<Home/>}/> */}

        <Route path='/homePageUser' element={  <HomePageUser/>} />
        <Route path='/homePageManager' element={  <HomePageManager/>} />
        <Route path='/login' element={  <Login/>} />
        <Route path='/productsUser' element={  <ProductsUser/>} />
        <Route path='/basket' element={  <Basket/>} />
        <Route path='/productsManager' element={  <ProductsManeger/>} />
        <Route path='/users' element={  <Users/>} />
        <Route path='/messageUser' element={  <MessageUser/>} />
        <Route path='/messageManager' element={  <MessageManager />} />
</Routes>

 </>
  );
}

export default App;