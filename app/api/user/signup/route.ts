import userModel from "@/app/models/user";
import { NextRequest,NextResponse } from "next/server";
import { genSaltSync,hashSync } from "bcrypt";
export async function POST(req:NextRequest) {
    try {
        let user_data = await req.json();
        // now just need to hash the password and store it in the database
        const salt = genSaltSync(10);
        user_data.password = hashSync(user_data.password,salt);
        const data = new userModel(user_data);
        await data.save();
        return NextResponse.json({error:false,message:"hi welcome to the application"});
    } catch (err) {
        return NextResponse.json({error:true,message:err});
    }
}