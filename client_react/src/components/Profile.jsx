import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { Stack, Divider } from "@mui/material"
import Axios from './helpers'
import AppContext from './appContext';
import '../../src/App.css';

export const Profile = () => {
    const token = useSelector(state => state.token);
    const currUser = useSelector(state => state.currUser);
    const [user, setUser] = useState({});
    const dispatch = useDispatch();

    useEffect (() => {
        const Profile = () => {
            setUser({...currUser, confirmPassword: currUser.password});
        }
        Profile();
    }, [])

    const setUserDetails = (e) => {
        let { value, name } = e.target;
        setUser({...user, [name]: value})
    }

    const updateUser = async () => {
        if (user.fname==""||user.lname==""||user.address==""||user.age==""||user.email=="") {
            alert ('Missing information required for updating!');
        } else if (!(user.password==user.confirmPassword)) {
            alert ('Passwords do not match!');
        } else {
            try {
                await Axios("put", AppContext.MAIN_URL+'/users/'+currUser._id, [token, currUser.username], user).then((response) => {
                    dispatch({ type: "GET_CURRUSER", payload: [response.user] });
                });
            } catch (error) {
                alert(error.message);
            }
        };
    };   

    return (            
        <div>
            
            <h1>My Profile</h1>
            <Stack direction="row" style={{fontSize:"1.3rem",border:"3px solid blue",width:"50rem",padding:"1rem"}}>
                <Stack direction="column">
                    <label htmlFor="username">User Name:</label>
                    <input type="text" id="username" name="username" defaultValue={currUser.username} readOnly={true} required/>
                    <Stack>
                        <label htmlFor="fname">First Name:</label>
                        <input type="text" id="fname" name="fname" defaultValue={currUser.fname} onChange={setUserDetails} required/>
                        <label htmlFor="lname">Last Name:</label>
                        <input type="text" id="lname" name="lname" defaultValue={currUser.lname} onChange={setUserDetails} required/>
                    </Stack>
                    <label htmlFor="address">Address:</label>
                    <input type="text" id="address" name="address" defaultValue={currUser.address} onChange={setUserDetails} required/>
                    <label htmlFor="age">Age:</label>
                    <input type="number" id="age" name="age" defaultValue={currUser.age} onChange={setUserDetails} required/>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" defaultValue={currUser.email} onChange={setUserDetails} required/>
                    <label htmlFor="imageURL">Image URL:</label>
                    <input type="text" id="imageURL" name="imageURL" defaultValue={currUser.imageURL} onChange={setUserDetails}/>
                    <div id="passwordDiv">
                        <input type="password" id="password" name="password" placeholder="Password" onChange={setUserDetails} required/>
                        <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm Password" onChange={setUserDetails} required/>
                    </div>
                    <div>
                        <button id="updateBtn" onClick={updateUser}>Update</button>
                    </div>
                </Stack>
                <img src={user.imageURL} style={{height:"20rem", margin:"1rem"}}></img>
            </Stack>   
        </div>                      
    )
}