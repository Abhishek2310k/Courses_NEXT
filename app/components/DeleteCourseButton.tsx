"use client"
import axios from "axios";
import { ObjectId } from "mongodb";
async function handleClick (id:ObjectId) {
    // now i just need to create a route to delete the course card
    const data = await axios.post("http://localhost:3000/api/course/delete_course",id);
    console.log(data.data);
}

export default function DeleteCourseButton ({id}:{id:ObjectId}) {
    return (
        <button onClick={() => handleClick(id)}>Delete</button>
    );
}