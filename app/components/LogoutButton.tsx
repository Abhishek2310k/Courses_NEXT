"use client"

import axios from "axios";

const handleLogout = async () => {
    const resp = await axios.post('/api/user/logout');
    console.log(resp.data);
}

const LogoutButton = () => {
    return (
        <button className='link_buttons' onClick={(e)=>handleLogout()}>
            Log Out
        </button>
    );
}
export default LogoutButton;