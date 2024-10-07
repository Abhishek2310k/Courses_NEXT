// app/page.tsx
import { cookies } from 'next/headers';
import userModel from "@/app/models/user";
import { jwtVerify } from "jose";
import Courses from "./components/Courses";

interface HomeProps {
    username: string | null;
}

// Function to get username from the token
async function getUsernameFromToken(token: string) {
    try {
        const { payload } = await jwtVerify(token, Buffer.from(process.env.SESSION_SECRET!, 'base64'));
        const userId = payload.userId;
        const user = await userModel.findById(userId);
        
        return user ? user.userName : null;
    } catch (error) {
        console.error("Error verifying token:", error);
        return null;
    }
}

// Function to get the username
const getUsername = async (): Promise<string | null> => {
    const cookieStore = cookies(); // Access cookies
    const token = cookieStore.get('session')?.value; // Get the session token
    if (token) {
        return await getUsernameFromToken(token); // Fetch username from token
    }
    return null; // Return null if no token is present
}

// Exporting the username function
export const fetchUsername = getUsername; // Export the function to fetch username

// Home component
export default async function Home() {
    const username = await getUsername(); // Get the username asynchronously

    return (
        <div className="home">
            {username ? (
                <h1>Welcome, {username}!</h1> // Display the username
            ) : (
                <h1>Welcome to the homepage!</h1>
            )}
            <Courses />
        </div>
    );
}
