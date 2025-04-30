import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { Button, Stack, Divider } from "@mui/material"
import { TableComp } from "./TableComp" 
import Axios from './helpers'
import AppContext from './appContext';
import '../../src/App.css';

export const Product = ({ product, addProduct, setAddProduct }) => {
    const token = useSelector(state => state.token);
    const currUser = useSelector(state => state.currUser);
    const categories = useSelector(state => state.categories);
    const orders = useSelector(state => state.orders);
    const [ordersView, setOrdersView] = useState ([])
    const [updateProduct, setUpdateProduct] = useState(!addProduct);
    const [updateColor, setUpdateColor] = useState('success');
    const [updatedProduct, setUpdatedProduct] = useState({});
    const dispatch = useDispatch();

    useEffect (() => {
        const addProdView = () => {
            if (!addProduct) {
                let tempArr = orders.filter(order=>order.productId==product._id).map(item => ({ 
                    Name: item.customerName, 
                    Qty: item.quantity,
                    Date: new Date(item.createdAt).toLocaleDateString("he-IL", {dateStyle:"short"})
                }))
                setOrdersView(tempArr);
                setUpdatedProduct(product);          
            } else {
                setUpdatedProduct({...product, category: categories[0].name});          
            }
            
        }
        addProdView();
    }, [])
    
    const addNewProduct = async () => {
        await Axios("post", AppContext.MAIN_URL+'/products', [token, currUser.username], updatedProduct).then((response) => {
            if (response.includes("Error")) {
                alert(response);
            } else {
                dispatch({ type: "GET_PRODUCTS", payload: response });    
                setAddProduct(false);
            }
        });
    }

    const updateProductDetails = async(e) => {
        if (updateProduct){
            setUpdateColor('error')
        } else {
            setUpdateColor('success')
            await Axios("put", AppContext.MAIN_URL+'/products/'+product._id, [token, currUser.username], updatedProduct).then((response) => {
                if (response.includes("Error")) {
                    alert(response);
                } else { 
                    dispatch({ type: "GET_PRODUCTS", payload: response });    
                }    
            });
        }
        setUpdateProduct(!updateProduct)
    }

    const getProductDetails = (e) => {
        let { value, name } = e.target;
        setUpdatedProduct({...updatedProduct, [name]: value})
    }

    const deleteProduct = async(e) => {
        await Axios("delete", AppContext.MAIN_URL+'/products/'+product._id, [token, currUser.username]).then((response) => {
            if (typeof(response) != "string") {
                dispatch({ type: "GET_PRODUCTS", payload: response });    
            }
        });       
    }

    return (            
        <div style={{border:"5px solid red",width:"40rem"}}> 
            <Stack direction="row"
                divider={<Divider orientation="horizontal" flexItem />}
                >
                <Stack direction="column" style={{width:"50%",margin:"10px"}}>
                    <label htmlFor='title'>Title:</label>
                    <input type="text" id="title" name="title" readOnly={updateProduct} defaultValue={product.title} onChange={getProductDetails} ></input>
                    <label htmlFor="category">Category:</label>
                    <select id="category" name="category" defaultValue={product.category} disabled={updateProduct} onChange={getProductDetails}>
                        {/* <option value="" ></option> */}
                        {
                            categories.map((cat, index)=>{
                                return <option value={cat.name} key={index}>{cat.name}</option>
                            })
                        }
                    </select>
                    <label htmlFor='description'>Description:</label>
                    <textarea type="text" id="description" name="description" readOnly={updateProduct} defaultValue={product.description} 
                        style={{maxHeight:"10rem",minHeight:"4rem"}} onChange={getProductDetails} ></textarea >
                    <label htmlFor='price'>Price:</label>
                    <input type="number" id="price" name="price" readOnly={updateProduct} defaultValue={product.price} onChange={getProductDetails} ></input>
                    <label htmlFor='imageURL'>Image URL:</label>
                    <input type="text" id="imageURL" name="imageURL" readOnly={updateProduct} defaultValue={product.imageURL} onChange={getProductDetails} ></input>
                    <label htmlFor='quantity'>Quantity:</label>
                    <input type="number" id="quantity" name="quantity" readOnly={updateProduct} defaultValue={product.quantity} onChange={getProductDetails} ></input>
                    <label htmlFor='bought'>Bought:</label>
                    <input type="number" id="bought" name="bought" readOnly={updateProduct} defaultValue={product.bought} onChange={getProductDetails} ></input>
                    <Stack direction="row" style={{margin:"10px 0 0 0"}}>
                        <Button 
                            variant="contained" 
                            size="small"
                            color={updateColor}
                            onClick={addProduct?addNewProduct:updateProductDetails}
                            sx={{
                                fontSize: "0.7rem",
                            }} 
                        >
                        {addProduct?"Add":"Update"}
                        </Button>

                        <Button 
                            variant="contained" 
                            size="small" 
                            onClick={addProduct?()=>setAddProduct(false):deleteProduct}
                            sx={{
                                fontSize: "0.7rem",
                            }} 
                        >
                        {addProduct?"Cancel":"Remove"}
                        </Button>
                    </Stack>
                </Stack>
                {!addProduct && 
                    <Stack direction="column" style={{width:"50%",margin:"10px"}}>
                        <label>Bought by:</label>
                        {ordersView.length > 0 &&   
                            <TableComp style={{width:"100%",margin:"10px"}} header={["Name","Qty","Date"]} data={ordersView} tableHeight={"30px"} tableWidth={"100%"}/>  
                        }  
                    </Stack>
                }
            </Stack>
            
        </div>                      
    )
}