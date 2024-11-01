"use client";
import axios from "axios";
import { ObjectId } from "mongodb";
import { getToken } from "../utility/client_utility";

async function handleClick({ id, admin }: { id: ObjectId; admin: number}) {
    const token = getToken();
    const response = await axios.delete("/api/course", {
        headers: {
            id: id.toString(),
            token: token,
            admin: admin === 1 ? '1' : ''
        },
    });
}

export default function DeleteCourseButton({ id, admin }: { id: ObjectId; admin: number }) {
    return <button onClick={() => handleClick({ id, admin })}>Delete</button>;
}
