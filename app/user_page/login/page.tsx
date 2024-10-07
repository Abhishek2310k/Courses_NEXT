"use client"
import { useState } from "react"
import axios from "axios";
import { useRouter } from "next/navigation";
export default function Signup() {
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const router = useRouter();
    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const resp = await axios.post("http://localhost:3000/api/user/signin",{userName:username,password:password});
        if (resp.status === 200) router.push("/");
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
        <button type="submit">Login</button>
    </form>)
}