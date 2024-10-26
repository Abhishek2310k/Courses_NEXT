"use client" 
import { User } from "@/app/Interface/interfaces";
import axios from "axios";
import { useState } from "react";
import { useAppContext } from "@/app/context";
import { useRouter } from "next/navigation";

export default function LoginUpRoute() {
    const [user,setUser] = useState<User>({userName:"",password:""});
    const router = useRouter();
    const {state,setState} = useAppContext();
    // helper functions
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const {name,value} = e.target;
        setUser({
            ...user,
            [name]: value
        });
    }

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            // trying to send the info for signup 
            const resp = await axios.get('/api/user',{
                headers:{
                    username:user.userName,
                    password:user.password
                }
            });
            if (resp.data.error === false) {
                setState(true);
                router.push('/');
            }
        } catch (error) {
            console.log(error);
        }
    }

    return <div className="loginForm">
        <form onSubmit={(e)=>handleSubmit(e)}>
            <input 
            type="text" 
            value={user.userName} 
            name="userName"
            placeholder="username"
            onChange={(e)=>handleChange(e)}
            />
            <input 
            type="password" 
            value={user.password} 
            name="password"
            placeholder="password"
            onChange={(e)=>handleChange(e)}
            />
            <button type="submit">Log In</button>
        </form>
    </div>;
    }