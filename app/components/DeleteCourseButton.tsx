"use client";
import axios from "axios";
import { ObjectId } from "mongodb";
import { getToken } from "../utility/client_utility";

async function handleClick(id: ObjectId) {
    const token = getToken();
    const response = await axios.delete("/api/course", {
        headers: {
            id: id.toString(),
            token: token,
        },
    });
    console.log(response.data);
}

export default function DeleteCourseButton({ id }: { id: ObjectId }) {
    return <button onClick={() => handleClick(id)}>Delete</button>;
}
