import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { Button, Stack, Divider } from "@mui/material"
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export const CartItem = ({ product }) => {
    const cart = useSelector(state => state.cart);
    const cartTotal = useSelector(state => state.cartTotal);
    const orderQty = product.orderQty;
    const dispatch = useDispatch();
    
    useEffect (() => {
        const cartItem = () => {
        }
        cartItem();
    }, [])
    
    const cartUpdate = (action) => {
        let itemIndex = cart.findIndex(e=>e._id==product._id);
        if (action=="decr") {
            if (orderQty > 0) {
                let tempArr = [...cart];
                tempArr[itemIndex].orderQty --;
                dispatch({ type: "UPDATE_CART", payload: tempArr })
                dispatch({ type: "UPDATE_CARTTOTAL", payload: cartTotal - product.price })
            } 
        } else {
            if (orderQty < product.quantity) {
                let tempArr = [...cart];
                tempArr[itemIndex].orderQty ++;
                dispatch({ type: "UPDATE_CART", payload: tempArr })
                dispatch({ type: "UPDATE_CARTTOTAL", payload: cartTotal + product.price })

            }
        }
    }

    const removeCartItem = () => {
        dispatch({ type: "UPDATE_CART", payload: cart.toSpliced((cart.findIndex(e=>e._id==product._id)),1) })
        dispatch({ type: "UPDATE_CARTTOTAL", payload: cartTotal - (product.price * orderQty) })
    }

    return (            
        <div style={{border:"3px solid green",margin:"1rem",width:"90%",height:"fit-content",padding:"0.5rem"}}> 
            <Stack direction="row"
                >
                <h2>{product.title}</h2>
            </Stack>
            {/* <img src={product.imageURL}></img> */}
            <br/>
            <Stack direction="row"
                spacing={1}
                height="2rem"
                >
                <Button 
                    variant="contained" 
                    size="small"
                    sx={{
                        height: "2rem",
                        minWidth: "2rem"
                    }} 
                    onClick={()=>cartUpdate("decr")}
                >
                <RemoveIcon fontSize="large"/>
                </Button>
                <h3>{product.orderQty}</h3>
                <Button 
                    variant="contained" 
                    size="small"
                    sx={{
                        height: "2rem",
                        minWidth: "2rem"
                    }} 
                    onClick={cartUpdate}
                >
                <AddIcon/>
                </Button>
                <br/>
                <h6>Total: ${product.price * orderQty}</h6>
                <br/>  
                <Button 
                    variant="contained" 
                    size="small"
                    fontSize="small"
                    sx={{
                        height: "2rem",
                        minWidth: "2rem"
                    }} 
                    onClick={removeCartItem}
                >
                <DeleteForeverIcon/>
                </Button> 
            </Stack>    
        </div>                      
    )
}