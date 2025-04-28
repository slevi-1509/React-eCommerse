import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { Button, Stack, Divider } from "@mui/material"
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import Axios from './helpers'
import AppContext from './appContext';

export const CatalogItem = ({ product }) => {
    const cart = useSelector(state => state.cart);
    const token = useSelector(state => state.token);
    const currUser = useSelector(state => state.currUser);
    const orders = useSelector(state => state.orders);
    const cartTotal = useSelector(state => state.cartTotal);
    const [orderQty, setOrderQty] = useState (0)
    const [productBought, setProductBought] = useState (0)
    const dispatch = useDispatch();

    useEffect (() => {
        const catalogItem = async () => {
            await Axios("get", AppContext.MAIN_URL+'/orders', [token, currUser.username]).then((response) => {
                if (typeof(response)=="string"){
                    // alert (response)
                } else {
                    dispatch({ type: "GET_ORDERS", payload: response });
                    setProductBought(
                        response.filter(order=>{
                            return order.productId==product._id
                        }).reduce((total, item)=>{
                            return total + item.quantity
                        }, 0)
                    )
                }  
                
            }); 
        }
        catalogItem();
    }, [])

    const addToCart = () => {
        if (orderQty > 0) {
            let itemIndex = cart.findIndex(e=>e._id==product._id);
            if (itemIndex == -1) {
                let cartProduct = {...product, orderQty: orderQty}
                dispatch({ type: "UPDATE_CART", payload: [...cart, cartProduct] })
            } else {
                let tempArr = cart;
                if ((tempArr[itemIndex].orderQty + orderQty) <= tempArr[itemIndex].quantity) {
                    tempArr[itemIndex].orderQty += orderQty;
                    dispatch({ type: "UPDATE_CART", payload: tempArr })
                }
                
            }
            dispatch({ type: "UPDATE_CARTTOTAL", payload: product.price * orderQty })
        } else {
            alert ("Select at least 1 item to add to cart !!!")
        }
    }

    return (            
        <div style={{border:"3px solid red", margin:"1rem", padding:"1rem"}}> 
            <Stack direction="row">
                <Stack direction="column"
                    divider={<Divider orientation="vertical" flexItem />}
                    >
                        <h2>{product.title}</h2>
                        <h5>{product.description}</h5>
                        <h5>Category: {product.category}</h5>
                        <h5>Price: ${product.price}</h5>
                        <h5>In Stock: {product.quantity}</h5>
                </Stack>
                <Stack direction="column">
                    <img src={product.imageURL} style={{height:"9rem",width:"9rem",margin:"1rem",border:"2px solid orange"}}></img>
                    <h4 style={{margin:"0 0 0 3rem"}}>Bought: {productBought}</h4>
                </Stack>
            </Stack>
            <Stack direction="row"
                spacing={1}
                height="2rem"
                >
                <Button 
                    variant="contained" 
                    size="small"
                    sx={{
                        fontSize: "0.7rem",
                    }} 
                    onClick={()=>orderQty <= 0 ? setOrderQty(0) : setOrderQty(orderQty-1)}
                >
                <RemoveIcon></RemoveIcon>
                </Button>
                    <h3>{orderQty}</h3>
                <Button 
                    variant="contained" 
                    size="small" 
                    sx={{
                        fontSize: "0.7rem",
                    }} 
                    onClick={()=>orderQty >= product.quantity ? setOrderQty(product.quantity) : setOrderQty(orderQty+1)}
                >
                <AddIcon></AddIcon>
                </Button>
                <br/>
                <br/> 
                <Button 
                    variant="contained" 
                    size="small" 
                    sx={{
                        fontSize: "0.7rem",
                    }} 
                    onClick={addToCart}
                >
                Add to cart
                </Button> 
            </Stack>    
        </div>                      
    )
}