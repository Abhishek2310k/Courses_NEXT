import { NextRequest,NextResponse } from "next/server";
export function tokenVerification (req:NextRequest) {
    console.log("middleware working");
    NextResponse.next();
}