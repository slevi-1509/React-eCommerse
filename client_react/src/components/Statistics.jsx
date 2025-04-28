import React, { useEffect, useState } from 'react'
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts/BarChart';
import { useDispatch, useSelector } from "react-redux"
import { Stack, Divider } from "@mui/material"
import Axios from './helpers'
import AppContext from './appContext';

export const Statistics = () => {
  const token = useSelector(state => state.token);
  const currUser = useSelector(state => state.currUser);
  const users = useSelector(state => state.users);
  const orders = useSelector(state => state.orders);
  const [ordersView, setOrdersView] = useState ([])
  const [customerOrders, setCustomerOrders] = useState ([])
  const [user, setUser] = useState ([])
  const dispatch = useDispatch();
  
  useEffect (() => {
    const statistics = async () => {
        await Axios("get", AppContext.MAIN_URL+'/orders', [token, currUser.username]).then((response) => {
            if (typeof(response)=="string"){
              // alert (response)
            } else {
              let tempTotalsObj={};
              orders.map(order=>{
                tempTotalsObj[order.title] = tempTotalsObj[order.title]==undefined?order.quantity:tempTotalsObj[order.title]+order.quantity;
              })
              let tempArr = [];
              for (const [key, value] of Object.entries(tempTotalsObj)) {
                tempArr.push({label: key, value: value})
              }
              setOrdersView([...tempArr]);
              dispatch({ type: "GET_ORDERS", payload: response });
          }  
            
        });
        await Axios("get", AppContext.MAIN_URL+'/users', [token, currUser.username]).then((response) => {
          if (typeof(response)=="string"){
              // alert (response)
          } else {
            dispatch({ type: "GET_USERS", payload: response });
          }  
      });  
    }
    statistics();
  }, [])

  const getArcLabel = (params) => {
    return `${params.value}`;
  };

  const getUserOrders = (e) => {
    let tempTotalsObj={};
    orders.filter(item=>{
      return item.customerId==e.target.value
    }).map(order=>{
      tempTotalsObj[order.title] = tempTotalsObj[order.title]==undefined?order.quantity:tempTotalsObj[order.title]+order.quantity;
    })
    let tempArr = [];
    for (const [key, value] of Object.entries(tempTotalsObj)) {
      tempArr.push({label: key, value: value})
    }
    setCustomerOrders([...tempArr]);
  }

  return (
    <div>
      <Stack
        direction="column"
        spacing={2}
        width={700}
        sx={{
          justifyContent: "center",
          alignItems: "center",
          border: "2px solid green",
      }}
      >
        <h3>Total sold products:</h3>
        <PieChart
          series={[
            {
              data: ordersView,
              arcLabel: getArcLabel,
              
            },
          ]}
          sx={{
            [`& .${pieArcLabelClasses.root}`]: {
              fontWeight: 'bold',
              fontSize: '1.3rem',
            },
          }}
          width={400}
          height={400}
      />
      </Stack>
      <Stack
        direction="column"
        spacing={2}
        width={700}
        sx={{
          justifyContent: "center",
          alignItems: "center",
          border: "2px solid green",
          marginTop: "2rem",
      }}
      >
        <h3>Prodcts quantity by customer:</h3>
        <h4>Select a customer:</h4>
        <select onChange={getUserOrders}>
            {/* <option value="" ></option> */}
            {
                users.map((user)=>{
                    return <option name="customer" value={user._id} key={user._id}>{user.fname} {user.lname}</option>
                })
                
            }
        </select>
      
        <BarChart style={{fontSize: "2rem"}}
          xAxis={[{ 
            scaleType: 'band', data: customerOrders.map(order=>order.label),
          }]}
          yAxis={[
            {
              colorMap:
                ({
                  type: 'ordinal',
                  colors: [
                    '#ccebc5',
                    '#a8ddb5',
                    '#7bccc4',
                    '#4eb3d3',
                    '#2b8cbe',
                    '#08589e',
                  ],
                }) 
            },
          ]}
          series={[{ data: customerOrders.map(order=>order.value) }]}
          sx={{ 
            "& .MuiChartsAxis-tickLabel tspan": { fontSize: "0.8rem" },
            "& .MuiBarLabel-root": { fontSize: "2rem", fontWeight: "bold" },
          }}
          width={700}
          height={300}
          barLabel="value"
        />
      </Stack>
    </div>
  );
}