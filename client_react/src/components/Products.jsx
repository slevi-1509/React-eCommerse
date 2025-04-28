import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { Button, Stack } from "@mui/material"
import { Product } from "./Product"
import Axios from './helpers'
import AppContext from './appContext';

export const Products = () => {
    const token = useSelector(state => state.token);
    const currUser = useSelector(state => state.currUser);
    const products = useSelector(state => state.products);
    const [addProduct, setAddProduct] = useState(false);
    
    const dispatch = useDispatch();

    useEffect (() => {
        const getProducts = async () => {
            await Axios("get", AppContext.MAIN_URL+'/orders', [token, currUser.username]).then((response) => {
                if (typeof(response)=="string"){
                    // alert (response)
                } else {
                    dispatch({ type: "GET_ORDERS", payload: response });
                }  
                
            }); 
            await Axios("get", AppContext.MAIN_URL+'/products', [token, currUser.username]).then((response) => {
                if (typeof(response)=="string"){
                    // alert (response)
                } else {
                    dispatch({ type: "GET_PRODUCTS", payload: response });
                }
            });
        }
        getProducts();
    }, [])

    const handelAddProduct = async () => {
        setAddProduct(true);
    }

    return (
        <div>
            <div >
                <h1> Products </h1>
                <Button 
                    variant="contained" 
                    size="large" 
                    onClick={handelAddProduct}
                    sx={{
                        fontSize: "1.2rem",
                    }} 
                >
                Add
                </Button>
                {addProduct &&
                    <Product product={{title:"",category:"",description:"",price:"",imageURL:"",quantity:""}} addProduct={addProduct} setAddProduct={setAddProduct}/>
                }
                {products.length > 0 &&
                    <div>
                        <Stack direction="column">
                            {products.map(product=>{
                                return (
                                    <Product product={product} addProduct={false} key={product._id}/>
                                )
                            })}
                        </Stack>
                    </div>    
                }
            </div>
        </div>
    )
}