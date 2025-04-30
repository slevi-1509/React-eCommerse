import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { Button } from "@mui/material"
import Axios from './helpers'
import AppContext from './appContext';

export const Category = ({ cat }) => {
    const token = useSelector(state => state.token);
    const currUser = useSelector(state => state.currUser);
    const categories = useSelector(state => state.categories);
    const [updateCategory, setUpdateCategory] = useState(true);
    const [updateColor, setUpdateColor] = useState('success');
    const [newCategoryName, setNewCategoryName] = useState('');
    const dispatch = useDispatch();
    
    useEffect (() => {
            const category = async () => {
                setNewCategoryName(cat.name);
            }
            category();
        }, [])

    const updateCategoryName = async(e) => {
        if (updateCategory){
            setUpdateColor('error')
        } else {
            setUpdateColor('success')
            await Axios("put", AppContext.MAIN_URL+'/categories/'+cat._id, [token, currUser.username], {name: newCategoryName}).then((response) => {
                if (response.includes("Error")) {
                    alert(response);
                } else {
                    dispatch({ type: "GET_CATEGORIES", payload: response });    
                }  
            });            
        } 
        setUpdateCategory(!updateCategory)
    }

    const deleteCategory = async(e) => {
        await Axios("delete", AppContext.MAIN_URL+'/categories/'+cat._id, [token, currUser.username]).then((response) => {
            if (typeof(response) != "string") {
                dispatch({ type: "GET_CATEGORIES", payload: response });    
            }            
        });       
    }

    return (            
        <div>
            <input readOnly={updateCategory} defaultValue={cat.name} onChange={(e)=>{setNewCategoryName(e.target.value)}} ></input>
            <Button 
                variant="contained" 
                size="small"
                color={updateColor}
                onClick={updateCategoryName}
                sx={{
                    fontSize: "0.7rem",
                }} 
            >
            Update
            </Button>

            <Button 
                variant="contained" 
                size="small" 
                onClick={deleteCategory}
                sx={{
                    fontSize: "0.7rem",
                }} 
            >
            remove
            </Button>
            <br/>
        </div>                      
    )
}