"use client";
import { User } from "@/app/Interface/interfaces";
import Cookies from "js-cookie";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { useAppContext } from "@/app/context";
// Use named import for jwt-decode
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  userName: string;
}

const Navbar = () => {
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

    return (
        <div className="navbar">
            {login === false ? 
            <span>...</span> : 
            userName === "" ? 
            <h1>Please Login</h1> : 
            <Link href={`http://localhost:3000/user_page/profile/${userName}`}>
              <h1>{userName}</h1>
            </Link>}
        </div>
    );
}

export default Navbar;
