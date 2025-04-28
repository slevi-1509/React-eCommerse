import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { Button } from "@mui/material"
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { CartItem } from "./CartItem" 
import Axios from './helpers'
import AppContext from './appContext';
import '../styles/cart.css';

export const Cart = () => {
    const token = useSelector(state => state.token);
    const currUser = useSelector(state => state.currUser);
    const cart = useSelector(state => state.cart);
    const cartTotal = useSelector(state => state.cartTotal);
    const orders = useSelector(state => state.orders);
    const sendOrder = useSelector(state => state.sendOrder);
    const [collapsed, setCollapsed] = useState(false);
    const dispatch = useDispatch();

    useEffect (() => {
        const myCart = () => {
            
        }
        myCart();
    }, [])

    const processOrder = async () => {
        if (cart.length == 0) {
            alert ("Your cart is empty, buy something !!!")
        } else {
            let tempArr = cart.map(item => ({ 
                title: item.title, 
                category: item.category,
                total: +item.price * +item.orderQty,
                quantity: item.orderQty,
                productId: item._id,
                customerId: currUser._id,
                customerName: `${currUser.fname} ${currUser.lname}`
            }))
            await Axios("post", AppContext.MAIN_URL+'/orders', [token, currUser.username], tempArr).then((response) => {
                dispatch({ type: "UPDATE_CART", payload: [] });
                dispatch({ type: "UPDATE_CARTTOTAL", payload: 0 })
                dispatch({ type: "SEND_ORDER", payload: !sendOrder })

                // dispatch({ type: "GET_PRODUCTS", payload: response });             
                // dispatch({ type: "GET_ORDERS", payload: [...orders, ...tempArr ]});             
            });   
        }
    }

    const handleToggleSidebar = () => {
        setCollapsed(!collapsed);
    };

    return (   
        <div style={{width:"auto"}}>
            <Button 
                variant="contained" 
                size="large"
                sx={{
                    height: "2rem",
                    width: "2rem"
                }} 
                onClick={handleToggleSidebar}>{collapsed?<KeyboardDoubleArrowRightIcon/>:<KeyboardDoubleArrowLeftIcon/>}
            </Button>

            <Sidebar width='22rem' collapsedWidth='0px' collapsed={collapsed}>
            
                    <h1>My Cart</h1>
                    {cart.length > 0 &&
                        <div> 
                            {cart.map(product=>{
                                return <CartItem product={product} key={product._id} />
                            })}
                        </div>                      
                    }  
                    <br/>
                    <h3>Total: ${cartTotal}</h3>
                    {/* <br/> */}
                    <Button 
                        variant="contained" 
                        size="large" 
                        sx={{
                            fontSize: "1rem",
                        }} 
                        onClick={processOrder}
                    >
                    Complete Order
                    </Button>               
            </Sidebar>
        </div>       
    )
        
}