import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { SpinnerComp } from "./Error_Comps/SpinnerComp"
import { TextField, Stack, Box } from "@mui/material"
import Axios from './helpers';
import AppContext from './appContext';
import "../styles/Register.css"

export const Register = () => {
    const users = useSelector(state => state.users);
    const authURL = AppContext.AUTH_URL+"/register";
    const [user, setUser] = useState({username: '', fname: '', lname: '', address: '', 
        age: 0, email: '', imageURL: '', password: '', confirmPassword: ''
    });
    const [displaySpinner, setDisplaySpinner] = useState("none")
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    useEffect (() => {
        const register = async () => {
            await axios.get(AppContext.AUTH_URL+"/users").then(({data:response}) => {
                if (typeof(response)=="string"){
                    alert (response)
                } else {
                    dispatch({ type: "GET_USERS", payload: response });
                }  
            }); 
        }
        register();
    }, [])

    const setUserDetails = (e) => {
        let { value, name } = e.target;
        setUser({...user, [name]: value})
    }

    // Check for proper data and registering a new user in the mongo database.
    // Password will be encrypted.
    // Create role for user base on the input.
    // Checking if Admin role exists (Only one user can be Admin)

    const registerUserFunc = async () => {
        if (user.username==""||user.fname==""||user.lname==""||user.address==""||user.age==""||user.email==""||user.password==""||user.confirmPassword=="") {
            alert ('Missing information required for registration');
        } else if (!(password.value==confirmPassword.value)) {
            alert ('Passwords do not match!');
        } else {
            const newUser = {
                username: user.username,
                fname: user.fname,
                lname: user.lname,
                address: user.address,
                age: user.age,
                email: user.email,
                imageURL: user.imageURL,
                password: user.password,
                admin: users.length==0?true:false,
            };
            try {  
                await axios.post(authURL, newUser).then(({data:response}) => {  
                    if (response.includes("username_1 dup key")) {
                        alert("Error creating new account!\nUser name exist.");
                        return;
                    }
                    alert (response);
                    setDisplaySpinner("block");
                    setTimeout(() => {
                        navigate("/");
                    }, 1000);
                });
            } catch (error) {
                alert ("err: " + error.message);
            }
        }
        
    };

    return (
        <div id="registerContainer">
            {displaySpinner=="block" && <SpinnerComp />}
            <h1 id="registerTitle"><span>Register to e-Commerce</span></h1>
            {users.length==0 && 
                <div>
                    <h3>This is the first user. This user will be created as Administrator!</h3>
                </div>
            }
            <div>
                <input type="text" id="fname" name="fname" placeholder="First Name" onChange={setUserDetails} required/>
                <input type="text" id="lname" name="lname" placeholder="Last Name" onChange={setUserDetails} required/>
                <input type="text" id="username" name="username" placeholder="User Name" onChange={setUserDetails} required/>
                <input type="number" id="age" name="age" placeholder="Age" onChange={setUserDetails} required/>
                <Stack direction="column">
                    <input type="text" id="address" name="address" placeholder="Address" onChange={setUserDetails} required/>
                    <input type="email" id="email" name="email" placeholder="Email" onChange={setUserDetails} required/>
                    <input type="text" id="imageURL" name="imageURL" placeholder="Image URL" onChange={setUserDetails}/>
                </Stack>
                <div id="passwordDiv">
                    <input type="password" id="password" name="password" placeholder="Password" onChange={setUserDetails} required/>
                    <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm Password" onChange={setUserDetails} required/>
                </div>
            </div>
            <div className="registerBtns">
                <button id="registerBtn" className="btn" onClick={() => registerUserFunc()}>Register</button>
            </div>
            <section id="loginPage">
                <span>Already registered? </span>
                <Link id="loginLink" to={'/login'}>Login</Link>
            </section>
        </div>
    )
}