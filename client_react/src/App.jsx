import './App.css'
import { Routes, Route } from "react-router-dom"
import { Login } from "../src/components/Login"
import { Register } from "../src/components/Register"
import { AdminPage } from "./components/AdminPage"
import { CustomerPage } from "./components/CustomerPage"
import { Categories } from "./components/Categories" 
import { Products } from "./components/Products" 
import { Customers } from "./components/Customers" 
import { Statistics } from "./components/Statistics" 
import { Catalog } from "./components/Catalog" 
import { Orders } from "./components/Orders" 
import { Profile } from "./components/Profile" 
import { ErrorComp } from "../src/components/Error_Comps/ErrorComp"
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import AppContext from './components/appContext';

function App() {

AppContext.APP_PORT = 3300;
// AppContext.SERVER_IP = "http://192.168.1.94:";
// AppContext.SERVER_IP = "http://77.137.66.52:";
AppContext.SERVER_IP = "http://localhost:";
AppContext.AUTH_URL = AppContext.SERVER_IP+AppContext.APP_PORT+"/api/auth";
AppContext.MAIN_URL = AppContext.SERVER_IP+AppContext.APP_PORT+"/api";

return (
  <div className="appBody">
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path="/admin" element={<AdminPage />}>
        <Route path="categories" element={<Categories />} />
        <Route path="products" element={<Products />} />
        <Route path="customers" element={<Customers />} />
        <Route path="statistics" element={<Statistics />} />
      </Route>
      <Route path="/customer" element={<CustomerPage />}>
        <Route path="catalog" element={<Catalog />} />
        <Route path="orders" element={<Orders />} />
        <Route path="profile" element={<Profile />} />
        <Route path="logout" element={<Login />} />
      </Route>
      <Route
        path='/error/:title' element = {<ErrorComp/>}
      />    
    </Routes>
  </div>
)}

export default App


    
