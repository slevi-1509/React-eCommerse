import React, { useState } from 'react'
import axios from 'axios'
import { CookiesProvider, useCookies } from 'react-cookie'
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { SpinnerComp } from "./Error_Comps/SpinnerComp"
import { Button, TextField, FormControl, Stack } from "@mui/material"
import AppContext from './appContext';
import "../styles/logIn.css"

export const Login = () => {
    const authURL = AppContext.AUTH_URL+"/login";
    const [displaySpinner, setDisplaySpinner] = useState("none")
    const [userLogin, setUserLogin] = useState({username: '', password: ''})
    const [cookies, setCookie] = useCookies([]);
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const setUserDetails = (e) => {
        let { value, name } = e.target;
        setUserLogin({...userLogin, [name]: value})
    }

     // Check for login name and passwaord and in case of approval creates a cookie with the token.
     // Updates the reducers parameters.

    const loginUserFunc = async () => {
        if (userLogin.username == "" || userLogin.password == ""){
            alert ("Missing username or password!");
            return;
        } else {
            try { 
                let {data: response} = await axios.post(authURL, {username: userLogin.username, password: userLogin.password})
                if (typeof response == "string"){
                    alert(response);
                } else {
                    setCookie(userLogin.username, response.token, {
                        path: "/",
                        secure: false,
                        sameSite: "strict",
                        // maxAge: 36000,
                      }); 
                    dispatch({ type: "GET_CURRUSER", payload: response.user });
                    dispatch({ type: "GET_TOKEN", payload: response.token });
                    
                    setDisplaySpinner("block");
                    setTimeout(() => {
                        response.user.admin?navigate("/admin"):navigate("/customer")
                    }, 1000);
                }
            } catch (e) {
                alert ("Something went wrong with login request:\n" + e.message +
                    ", Probably server is not reachable."
                );
            }
        }    
    }

    return (
        <div id="loginContainer">
            <div id="loginBody">
                <h1 id="loginTitle"><span>Login to e-Commerce</span></h1>
                <FormControl variant="standard">
                    <TextField
                        label="User Name:"
                        defaultValue=""
                        name="username"
                        onChange={setUserDetails} 
                        required
                        sx={{
                            mb: "1rem"
                        }}
                    />
                    <TextField
                        label="Password:"
                        defaultValue=""
                        name="password"
                        onChange={setUserDetails} 
                        type="password"
                        required
                        sx={{
                            mb: "1rem",
                        }}
                    />
                    <Button 
                        variant="contained" 
                        size="large" 
                        onClick={() => loginUserFunc()}
                        sx={{
                            fontSize: "1.2rem",
                        }} 
                    >
                    Login
                    </Button>
                </FormControl>
                <section id="registerPage">
                    <span>Not registered? </span>
                    <Link id="registerLink" to={'/register'}>Register</Link>
                </section>
            </div>
            {displaySpinner=="block" && <SpinnerComp />}
        </div>
    )
}