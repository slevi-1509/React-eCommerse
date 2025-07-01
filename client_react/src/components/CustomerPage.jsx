import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { Link, Outlet, useNavigate } from "react-router-dom"
import { useCookies } from "react-cookie";
import { Stack } from "@mui/material"
import Axios from './helpers'
import AppContext from './appContext';

export const CustomerPage = () => {
    const token = useSelector(state => state.token);
    const currUser = useSelector(state => state.currUser);
    const sendOrder = useSelector(state => state.sendOrder);
    const [cookies, setCookie, removeCookie] = useCookies({});
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect (() => {
        const customerActions = async () => {
            if (Object.keys(currUser).length > 0) {
                getAllUserData(currUser._id, token);
                navigate("/customer/catalog");
            } else {
                if (Object.keys(cookies).length > 0){
                    let myId = Object.keys(cookies)[Object.keys(cookies).length-1];
                    let myToken = Object.values(cookies)[Object.values(cookies).length-1];
                    await Axios ("get", AppContext.MAIN_URL+'/users/'+myId, [myToken]).then((response) => {
                        if (typeof(response) == "string") {
                            logoutUser("Can't find credentials...\nplease login again")
                        } else {
                            dispatch({ type: "GET_CURRUSER", payload: response });
                            dispatch({ type: "GET_TOKEN", payload: myToken });
                            getAllUserData(myId, myToken);
                            navigate("/customer/catalog");

                    }});
                } else {
                    logoutUser("Can't find credentials...\nplease login again")
                }
            }
        }
        customerActions();
    }, [sendOrder])

    const getAllUserData = async (myId, myToken) => {
        await Axios("get", AppContext.MAIN_URL+'/categories', [myToken]).then((response) => {
            if (typeof(response)=="string"){
                // alert ("No categories to show!")
            } else {
                dispatch({ type: "GET_CATEGORIES", payload: response });
            }   
        });       
        await Axios("get", AppContext.MAIN_URL+'/products', [myToken]).then((response) => {
            if (typeof(response)=="string"){
                // alert ("No products to show!")
            } else {
                dispatch({ type: "GET_PRODUCTS", payload: response });
            }
        });  
        await Axios("get", AppContext.MAIN_URL+'/orders/'+myId, [myToken]).then((response) => {
            if (typeof(response)=="string"){
                // alert (response)
            } else {
                dispatch({ type: "GET_ORDERS", payload: response });
            }  
        });         
    }

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
                    <Link to={'catalog'}>
                        Catalog
                    </Link>
                    <Link to={'orders'}>
                        Orders
                    </Link>
                    <Link to={'profile'}>
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