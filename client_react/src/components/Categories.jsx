import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { Button, TextField, FormControl } from "@mui/material"
import { Category } from "./Category"
import Axios from './helpers'
import AppContext from './appContext';

export const Categories = () => {
    const token = useSelector(state => state.token);
    const currUser = useSelector(state => state.currUser);
    const categories = useSelector(state => state.categories);
    const [newCategoryName, setNewCategoryName] = useState('');
    const dispatch = useDispatch();

    useEffect (() => {
        const getCategories = async () => {
            await Axios("get", AppContext.MAIN_URL+'/categories', [token, currUser.username]).then((response) => {
                if (typeof(response)=="string"){
                    // alert ("No categories to show!")
                } else {
                    dispatch({ type: "GET_CATEGORIES", payload: response });
                }});
        }
        getCategories();
    }, [])

    const addCategory = async () => {
        await Axios("post", AppContext.MAIN_URL+'/categories', [token, currUser.username], {name: newCategoryName}).then((response) => {
            if (typeof(response) != "string") {
                dispatch({ type: "GET_CATEGORIES", payload: response });    
            }});                
    }

    return (
        <div >
            <h1> Categories </h1>
            {categories.length > 0 &&
                <div>
                    {categories.map(cat=>{
                        return (
                            <Category cat={cat} key={cat._id}/>
                        )
                    })}
                </div>    
            }
            <br/>
            <br/>
            <FormControl variant="standard">
                <TextField
                    label="Add new Category:"
                    defaultValue=""
                    name="category"
                    onChange={(e)=>{setNewCategoryName(e.target.value)}} 
                    required
                    sx={{
                        mb: "1rem"
                    }}
                />
                <Button 
                    variant="contained" 
                    size="large" 
                    onClick={addCategory}
                    sx={{
                        fontSize: "1.2rem",
                    }} 
                >
                Add
                </Button>
            </FormControl>
        </div>
    )
}