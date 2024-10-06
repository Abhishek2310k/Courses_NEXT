"use client"
import { useState } from "react"
import axios from "axios";
export default function Signup() {
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const resp = await axios.post("http://localhost:3000/api/user/signin",{userName:username,password:password});
        console.log(resp.data);
    }
    return (<form className="user_form" onSubmit={(e)=>handleSubmit(e)}>
        <input 
        type="username" 
        placeholder="username" 
        value={username} 
        onChange={(e) => setUsername(e.target.value)}/>
        <input 
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}/>
        <button type="submit">signup</button>
    </form>)
}