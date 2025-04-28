import React, { useRef, useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import Table from 'react-bootstrap/Table';
import { Button, TextField, FormControl, Stack, Divider, Link} from "@mui/material"
import { styled } from '@mui/system';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Axios from './helpers'
import AppContext from './appContext';

export const TableComp = ({ header, data }) => {
    const token = useSelector(state => state.token);
    const currUser = useSelector(state => state.currUser);
    const categories = useSelector(state => state.categories);
    const products = useSelector(state => state.products);
    const cart = useSelector(state => state.cart);
    // const [orderQty, setOrderQty] = useState (product.quantity)
    const dispatch = useDispatch();
    
    useEffect (() => {
        const cartItem = () => {
            console.log(header,data)   
        }
        cartItem();
    }, [])

    const params = {
        headers: {
            "x-access-token": token,
            "Content-Type": "application/json"},
        params: {
            "username": currUser.username,
        }
    }

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    {header.map((h, index) => {
                        return(
                            // <th>#</th>
                            <th key={index}>{h}</th>
                        )
                    })}
                </tr>
            </thead>
            <tbody>
                {data.map((tableRow, index1) => {
                    return (
                        <tr key={index1}>
                            {Object.values(tableRow).map((rowItem, index2) => {
                                return <td key={index2}>{rowItem}</td>
                            })}
                        </tr>
                    )
                })}
            </tbody>
        </Table>
        )                   
}