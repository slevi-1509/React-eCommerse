import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { TableComp } from "./TableComp" 
import Axios from './helpers';
import AppContext from './appContext';

export const Customers = () => {
    const token = useSelector(state => state.token);
    const currUser = useSelector(state => state.currUser);
    const [usersView, setUsersView] = useState ([])
    const dispatch = useDispatch();
    let ordersView = [];
    let customerOrders = [];
    
    useEffect (() => {
        const getCustomers = async () => {
            await Axios("get", AppContext.MAIN_URL+'/orders', [token, currUser.username]).then((response) => {
                if (typeof(response)=="string"){
                    // alert (response)
                } else {
                    ordersView = response.map(item => ({ 
                        title: item.title, 
                        quantity: item.quantity,
                        customerId: item.customerId,
                        createdAt: new Date(item.createdAt).toLocaleDateString("he-IL", {dateStyle:"short"})
                    }))
                    dispatch({ type: "GET_ORDERS", payload: response });
                }  
            }); 
            await Axios("get", AppContext.MAIN_URL+'/users', [token, currUser.username]).then((response) => {
                if (typeof(response)=="string"){
                    // alert (response)
                } else {
                    let tempArr = response.map(user => ({ 
                        fullName: `${user.fname} ${user.lname}`, 
                        joinedAt: new Date(user.createdAt).toLocaleDateString("he-IL", {dateStyle:"short"}),
                        orders: <TableComp header={["Product","Qty","Date"]} data={getCustomerOrders(user._id)}
                        tableHeight={"15rem"}
                        tableWidth={"auto"}
                        />
                    }))
                    setUsersView(tempArr)
                    dispatch({ type: "GET_USERS", payload: response });
                }  
            }); 
        }
        getCustomers();
    }, [])

    const getCustomerOrders = (userId) => {
        customerOrders = ordersView.filter(order=>order.customerId==userId).map(item => ({ 
            Product: item.title, 
            Qty: item.quantity,
            Date: item.createdAt
        }))
        return customerOrders
    }

    return (
        <div >
            <h1> Customers </h1>
            {usersView.length > 0 &&   
                <TableComp header={["Full Name","Joined At","Products Bought"]} data={usersView} tableHeight={"100%"} tableWidth={"70rem"}/>  
            }  
        </div>
    )
}