import React, { useEffect } from 'react'
import { useSelector } from "react-redux"
import { Link, Outlet, useNavigate } from "react-router-dom"
import { Stack, Button } from "@mui/material"
import axios from 'axios'
import Axios from './helpers';
import AppContext from './appContext';

export const AdminPage = () => { 
    const currUser = useSelector(state => state.currUser);
    const token = useSelector(state => state.token);
    const navigate = useNavigate();

    useEffect (() => {
        if (Object.keys(currUser).length > 0) {
            navigate("/admin/categories");
        } else {
            logoutUser("Logging out...\nSorry to see you go")
        } 
    }, [])
    
    const importCustomers = async () => {
        let imports=[];
        let jsonPath ='';
        jsonPath = '../src/data/categories.json';
        await axios.get(jsonPath).then(({data:response}) => {
            imports = [[...response]];
        });
        jsonPath = '../src/data/customers.json';
        await axios.get(jsonPath).then(({data:response}) => {
            imports = [...imports, [...response]];
        });
        jsonPath = '../src/data/products.json';
        await axios.get(jsonPath).then(({data:response}) => {
            imports = [...imports, [...response]];
        });
        jsonPath = '../src/data/orders.json';
        await axios.get(jsonPath).then(({data:response}) => {
            imports = [...imports, [...response]];
        });
        await Axios("post", AppContext.MAIN_URL+'/users/import', [token, currUser.username], imports).then((response) => {
            console.log(response);
            navigate("/admin/categories");
        }); 
        alert ("All records were imported succesfully!");
        navigate("/admin/categories");
    };

    const logoutUser = async (title) => {
        navigate("/error/"+title);
        setTimeout(() => {
            navigate("/login");
        }, 1000);
    }

    return (
        <div >
            <Button 
                variant="contained" 
                size="small" 
                onClick={importCustomers}
                sx={{
                    fontSize: "0.8rem",
                    padding: "3px",
                }} 
            >
            Import
            </Button>
            {/* <select id="import" name="import" defaultValue="">
                <option value="" ></option>
                <option value="customers" ></option>
                <option value="products" ></option>
                <option value="orders" ></option>
            </select> */}
            <Stack spacing={1} direction="column" 
                	   justifyContent="center">
                <h2>Hello, {currUser.fname} {currUser.lname} (Admin) </h2>
                <Stack spacing={1} direction="row">
                    <Link to={'categories'}>
                        Categories
                    </Link>
                    <Link to={'products'}>
                        Products
                    </Link>
                    <Link to={'customers'}>
                        Customers
                    </Link>
                    <Link to={'statistics'}>
                        Statistics
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