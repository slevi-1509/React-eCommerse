import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux"
import { Button, Stack, Divider } from "@mui/material"
import Slider from '@mui/material/Slider';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { CatalogItem } from "./CatalogItem" 
import { Cart } from "./Cart" 

export const Catalog = () => {
    const categories = useSelector(state => state.categories);
    const products = useSelector(state => state.products);
    const [prodctsView, setProdctsView] = useState ([]);
    const [category, setCategory] = useState ("");
    const [minPrice, setMinPrice] = useState (0);
    const [maxPrice, setMaxPrice] = useState (0);
    const [selectedPrice, setSelectedPrice] = useState (0);
    const [title, setTitle] = useState ("");
    const [sort, setSort] = useState ("title");
    const [sortAsc, setSortAsc] = useState (true);

    useEffect (() => {
        const catalog = () => {
            if (products.length > 0) {
                setMinPrice (products.map(item=>{
                    return +item.price
                }).reduce((accumulator, slip)=>{
                    return Math.min(accumulator, slip);
                }));
                setMaxPrice (products.map(item=>{
                    return +item.price
                }).reduce((accumulator, slip)=>{
                    return Math.max(accumulator, slip);
                }));
                setSelectedPrice (products.map(item=>{
                    return +item.price
                }).reduce((accumulator, slip)=>{
                    return Math.max(accumulator, slip);
                }));
                setProdctsView(products);
            }            
        }
        catalog();
    }, [products])

    const applyFilters = () => {
        let tempArr = products.filter(product=>product.category.includes(category) && product.price <= selectedPrice && product.title.toLowerCase().includes(title.toLowerCase()));
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
        setSelectedPrice(maxPrice);
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
                <Stack direction="column" style={{width:"35rem",margin:"0 0 0 1rem"}}>
                    <h1>Products Catalog</h1>
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
                                value={selectedPrice}
                                valueLabelDisplay="on"
                                onChange={(e)=>setSelectedPrice(e.target.value)} 
                            />
                        </div>
                        <p> ${selectedPrice}</p>
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
                            variant="contained" 
                            size="large"
                            sx={{
                                height: "2rem",
                                width: "3rem"
                            }} 
                            onClick={()=>setSortAsc(!sortAsc)}
                        >
                            {sortAsc?<ArrowUpwardIcon/>:<ArrowDownwardIcon/>}
                        </Button>
                        <button onClick={applyFilters}>Apply</button>
                        <button onClick={clearFilters}>Clear</button>
                    </Stack>
                    {products.length > 0 &&
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