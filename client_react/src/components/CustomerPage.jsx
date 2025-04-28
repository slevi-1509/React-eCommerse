import React, { useEffect } from 'react'
import { useSelector } from "react-redux"
import { Link, Outlet, useNavigate } from "react-router-dom"
import { Stack } from "@mui/material"

export const CustomerPage = () => {
    const currUser = useSelector(state => state.currUser);
    const navigate = useNavigate();

    useEffect (() => {
        if (Object.keys(currUser).length > 0) {
            navigate("/customer/catalog");
        } else {
            logoutUser("Logging out...\nSorry to see you go")
        } 
    }, [])

    const logoutUser = async (title) => {
        navigate("/error/"+title);
        setTimeout(() => {
            navigate("/login");
        }, 1000);
    }

    return (
        <div>
            <Stack spacing={1} direction="column" 
                justifyContent="center"
                >
                <h2>Hello, {currUser.fname} {currUser.lname}</h2>
                <Stack spacing={2} direction="row" style={{margin:"0 0 1rem 0"}}>
                    <Link to={'Catalog'}>
                        Catalog
                    </Link>
                    <Link to={'Orders'}>
                        Orders
                    </Link>
                    <Link to={'Profile'}>
                        My Profile
                    </Link>
                    <button onClick={()=>{logoutUser("Logging out...\nSorry to see you go")}}>
                        Logout
                    </button>
                </Stack>
            
                <Outlet/>
            </Stack>
        </div>
    )
}