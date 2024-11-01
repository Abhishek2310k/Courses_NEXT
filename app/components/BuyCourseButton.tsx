"use client"
import axios from "axios";
import { ObjectId } from "mongodb";
import { jwtDecode } from 'jwt-decode';
import { useState,useEffect,useContext } from "react";
import Cookies from "js-cookie";
import { useAppContext } from "../context";

interface DecodedToken {
    userName: string;
}
// this is a client component so we can get client info using cookies

const BuyCourseButton = (id : ObjectId) => {

    const [userName, setUserName] = useState<string>("");
    const [login,setLogin] = useState<boolean>(false);
    const {state,setState} = useAppContext();
    useEffect(() => {
        const userToken = Cookies.get('token');
        if (userToken) {
            try {
              const decodedUser = jwtDecode<DecodedToken>(userToken);
              setUserName(decodedUser.userName);
            } catch (error) {
              console.error('Error decoding user token:', error);
            }
        } else {
            console.log("User token not defined");
        }
        setLogin(true);
    }, [userName,state]);

    const handleClick = async () => {
        if (userName === "") alert("please Login first");
        const resp = await axios.put("/api/user",{userid:userName,courseid:id})
        if (resp.data.error === false) alert("course bought successfully");
        else alert(resp.data.message);
    }
    return(
        <button onClick={handleClick}>Buy</button>
    )
}

export default BuyCourseButton;