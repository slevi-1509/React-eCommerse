import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { Link, Outlet, useNavigate } from "react-router-dom"
import { Stack } from "@mui/material"
import Axios from './helpers'
import AppContext from './appContext';

export const CustomerPage = () => {
    const token = useSelector(state => state.token);
    const currUser = useSelector(state => state.currUser);
    const sendOrder = useSelector(state => state.sendOrder);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect (() => {
        const customerActions = async () => {
            if (Object.keys(currUser).length > 0) {
                await Axios("get", AppContext.MAIN_URL+'/categories', [token, currUser.username]).then((response) => {
                    if (typeof(response)=="string"){
                        // alert ("No categories to show!")
                    } else {
                        dispatch({ type: "GET_CATEGORIES", payload: response });
                    }   
                });       
                await Axios("get", AppContext.MAIN_URL+'/products', [token, currUser.username]).then((response) => {
                    if (typeof(response)=="string"){
                        // alert ("No products to show!")
                    } else {
                        dispatch({ type: "GET_PRODUCTS", payload: response });
                    }
                });  
                await Axios("get", AppContext.MAIN_URL+'/orders/'+currUser._id, [token, currUser.username]).then((response) => {
                    if (typeof(response)=="string"){
                        // alert (response)
                    } else {
                        dispatch({ type: "GET_ORDERS", payload: response });
                    }  
                });         
                navigate("/customer/catalog");
            } else {
                logoutUser("Logging out...\nSorry to see you go")
            } 
        }
        customerActions();
    }, [sendOrder])

    const logoutUser = async (title) => {
        navigate("/error/"+title);
        setTimeout(() => {
            navigate("/login");
        }, 2000);
    }

    return (
        <div>
            <Stack spacing={1} direction="column" 
                justifyContent="center"
                >
                <h1>Hello, {currUser.fname} {currUser.lname}</h1>
                <Stack spacing={2} direction="row" fontSize="1.5rem" style={{margin:"2rem 0 2rem 0"}}>
                    <Link to={'Catalog'}>
                        Catalog
                    </Link>
                    <Link to={'Orders'}>
                        Orders
                    </Link>
                    <Link to={'Profile'}>
                        My Profile
                    </Link>
                     <button onClick={()=>{logoutUser("Logging out...\nSorry to see you go")}}>
                        Logout
                    </button>
                </Stack>
            
                <Outlet/>
            </Stack>
        </div>
    )
}