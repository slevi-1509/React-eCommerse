import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { Button, Stack, Divider } from "@mui/material"
import Slider from '@mui/material/Slider';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { CatalogItem } from "./CatalogItem" 
import { Cart } from "./Cart" 
import Axios from './helpers'
import AppContext from './appContext';

export const Catalog = () => {
    const token = useSelector(state => state.token);
    const currUser = useSelector(state => state.currUser);
    const categories = useSelector(state => state.categories);
    const products = useSelector(state => state.products);
    const [prodctsView, setProdctsView] = useState ([]);
    const [category, setCategory] = useState ("");
    const [minPrice, setMinPrice] = useState (0);
    const [maxPrice, setMaxPrice] = useState (0);
    const [topPrice, setTopPrice] = useState (0);
    const [title, setTitle] = useState ("");
    const [sort, setSort] = useState ("title");
    const [sortAsc, setSortAsc] = useState (true);
    const dispatch = useDispatch();

    useEffect (() => {
        const catalog = async () => {
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
                    setMinPrice (response.map(item=>{
                        return +item.price
                    }).reduce((accumulator, slip)=>{
                        return Math.min(accumulator, slip);
                    }));
                    setMaxPrice (response.map(item=>{
                        return +item.price
                    }).reduce((accumulator, slip)=>{
                        return Math.max(accumulator, slip);
                    }));
                    setTopPrice (response.map(item=>{
                        return +item.price
                    }).reduce((accumulator, slip)=>{
                        return Math.max(accumulator, slip);
                    }));
                    setProdctsView(response.sort((a,b) => {
                        if (a.title < b.title) {
                          return -1;
                        }
                        if (a.title > b.title) {
                          return 1;
                        }
                        return 0;
                      }));
                    dispatch({ type: "GET_PRODUCTS", payload: response });
                }
            });       
        }
        catalog();
    }, [])

    const applyFilters = () => {
        let tempArr = products.filter(product=>product.category.includes(category) && product.price <= topPrice && product.title.toLowerCase().includes(title.toLowerCase()));
        if (sortAsc) {
            tempArr.sort(((a,b) => {
                if (a[sort] < b[sort]) {
                    return -1;
                }
                if (a[sort] > b[sort]) {
                    return 1;
                }
                return 0;
            }));
        } else {
            tempArr.sort(((a,b) => {
                if (a[sort] < b[sort]) {
                    return 1;
                }
                if (a[sort] > b[sort]) {
                    return -1;
                }
                return 0;
            }));
        }
        setProdctsView([...tempArr]);
    } 

    const clearFilters = () => {
        setTopPrice(maxPrice);
        setTitle("");
        setCategory("");
        setProdctsView([...products]);
        setSort("title");
        setSortAsc(true);
    } 

    return (   
        <div>
            <Stack direction="row"
            divider={<Divider orientation="horizontal" flexItem />}
            style={{width:"100%"}}
            >
                <Cart/>
                <Stack direction="column" style={{width:"50%",margin:"0 0 0 2rem"}}>
                    <h1>Catalog</h1>
                    <br/>
                    <h4>Filter by:</h4>

                    <Stack direction="row" style={{fontSize:"1rem",gap:"15px",width:"35rem",height:"2rem"}}>
                        <label htmlFor="category">Category:</label>
                        <select id="category" name="category" value={category} onChange={(e)=>setCategory(e.target.value)}>
                            <option value="" >All</option>
                            {
                                categories.map((cat, index)=>{
                                    return <option value={cat.name} key={index}>{cat.name}</option>
                                })
                                
                            }
                        </select>
    
                        <p> Price: </p>
                        <div className="slidecontainer" style={{width: "40%"}}>
                            <Slider 
                                min={minPrice} 
                                max={maxPrice} 
                                value={topPrice}
                                valueLabelDisplay="on"
                                onChange={(e)=>setTopPrice(e.target.value)} 
                            />
                        </div>
                        <p> ${topPrice}</p>
                        <label htmlFor="title">Title:</label>
                        <input type="text" id="title" name="title" style={{width:"5rem"}} value={title} onChange={(e)=>{setTitle(e.target.value)}} ></input>
                    </Stack>
                    <br/>
                    <Stack direction="row" style={{fontSize:"1rem",gap:"15px",width:"35rem",height:"2rem"}}>
                        <label htmlFor="sort">Sort by:</label>
                        <select id="sort" name="sort" value={sort} onChange={(e)=>setSort(e.target.value)}>
                            <option value="title" >Title</option>
                            <option value="category" >Category</option>
                            <option value="price" >Price</option>
                        </select>
                        <Button
                            onClick={()=>setSortAsc(!sortAsc)}
                        >
                            {sortAsc?<ArrowUpwardIcon/>:<ArrowDownwardIcon/>}
                        </Button>
                        <button onClick={applyFilters}>Apply</button>
                        <button onClick={clearFilters}>Clear</button>
                    </Stack>
                    {prodctsView.length > 0 &&
                        <div> 
                            {prodctsView.map(product=>{
                                return (
                                    <CatalogItem product={product} key={product._id}/>
                                )
                            })}
                        </div>                      
                    }  
                </Stack>
            </Stack>
        </div>       
    )
        
}