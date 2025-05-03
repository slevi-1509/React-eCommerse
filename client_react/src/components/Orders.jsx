import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux"
import { Stack, Divider } from "@mui/material"
import { TableComp } from "./TableComp" 

export const Orders = () => {
    const orders = useSelector(state => state.orders);
    const [ordersView, setOrdersView] = useState ([])

    useEffect (() => {
        const customerOrders = () => {   
            setOrdersView(orders.map(item => ({ 
                Title: item.title, 
                Qty: item.quantity,
                Total: +item.total,
                Date: new Date(item.createdAt).toLocaleString("he-IL", {
                    hourCycle: 'h23',
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit"})
            })))    
        }
        customerOrders();
    }, [orders])
    
    return (   
        <div>
            <Stack direction="column"
            divider={<Divider orientation="vertical" flexItem />}
            >
                <h1>Orders</h1>
                {ordersView.length > 0 &&   
                    <TableComp header={["Title","Qty","Total","Date"]} data={ordersView} tableHeight="fit-content" tableWidth="60rem"/>  
                }  
            </Stack>
        </div>       
    )
        
}