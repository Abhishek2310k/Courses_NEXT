"use client"
import axios from "axios";
async function handleClick (id:string) {
    // now i just need to create a route to delete the course card
    const data = await axios.post("http://localhost:3000/api/course/delete_course",id);
    console.log(data.data);
}


export default function DeleteCourseButton ({id}:{id:string}) {
    return (
        <button onClick={() => handleClick(id)}>Delete</button>
    );
}