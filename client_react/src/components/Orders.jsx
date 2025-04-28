import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { Stack, Divider } from "@mui/material"
import { TableComp } from "./TableComp" 
import Axios from './helpers'
import AppContext from './appContext';

export const Orders = () => {
    const token = useSelector(state => state.token);
    const currUser = useSelector(state => state.currUser);
    const [ordersView, setOrdersView] = useState ([])
    const dispatch = useDispatch();

    useEffect (() => {
        const customerOrders = async () => {
            await Axios("get", AppContext.MAIN_URL+'/orders', [token, currUser.username]).then((response) => {
                if (typeof(response)=="string"){
                    // alert (response)
                } else {
                    setOrdersView(response.filter(item=>item.customerId==currUser._id).map(item => ({ 
                        Title: item.title, 
                        Qty: item.quantity,
                        Total: +item.total,
                        Date: new Date(item.createdAt).toLocaleDateString("he-IL", {dateStyle:"short"})
                    })))
                    dispatch({ type: "GET_ORDERS", payload: response });
                }  
                
            }); 
        }
        customerOrders();
    }, [])
    
    return (   
        <div>
            <Stack direction="column"
            divider={<Divider orientation="vertical" flexItem />}
            >
                <h1>Orders</h1>
                {ordersView.length > 0 &&   
                    <TableComp header={["Title","Qty","Total","Date"]} data={ordersView}/>  
                }  
            </Stack>
        </div>       
    )
        
}