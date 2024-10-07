import { NextRequest, NextResponse } from "next/server";
import { SignJWT } from "jose";
import userModel from "@/app/models/user";
import { compare } from "bcrypt"; // Use the async version of bcrypt
const sessionSecret = process.env.SESSION_SECRET;

// Convert Base64 string to Uint8Array
if (!sessionSecret) {
    throw new Error('SESSION_SECRET is not defined in the environment variables.');
}

const keyBuffer = Buffer.from(sessionSecret, 'base64');
const keyUint8Array = new Uint8Array(keyBuffer);

export async function POST(req: NextRequest) {
    try {
        const user_data = await req.json();
        const data_stored = await userModel.findOne({ userName: user_data.userName });
        
        if (!data_stored) {
            return NextResponse.json({ error: true, message: "User does not exist" });
        }
        
        const isPasswordValid = await compare(user_data.password, data_stored.password);
        
        if (!isPasswordValid) {
            return NextResponse.json({ error: true, message: "Password is not correct" });
        }

        // At this point, both the user and the password are verified.
        // Creating session token
        const token = await new SignJWT({ userId: data_stored._id })
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime('7d') // Set token expiration
            .sign(keyUint8Array); // Use the Uint8Array key for signing

        // Set the token in a cookie
        const response = NextResponse.json({ error: false, message: "User successfully signed in" });
        response.cookies.set('session', token, {
            httpOnly: true, // Prevents client-side access to the cookie
            secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
            sameSite: 'lax', // Prevent CSRF attacks
            path: '/', // Cookie is available for all routes
            maxAge: 7 * 24 * 60 * 60 // Cookie expiration in seconds (7 days)
        });

        return response;
    } catch (error) {
        console.error("Error during user sign-in:", error);
        return NextResponse.json({ error: true, message: "Internal Server Error" }, { status: 500 });
    }
}
