import { NextRequest,NextResponse } from "next/server";
import userModel from "@/app/models/user";
import { compareSync } from "bcrypt";
export async function POST (req:NextRequest) {
    const user_data = await req.json();
    const data_stored = await userModel.findOne({userName:user_data.userName});
    if (data_stored == null) {
        return NextResponse.json({error:true,message:"user does not exist"});
    }
    // in this part we need to check for the password
    if (compareSync(user_data.password,data_stored.password) == false) 
        return NextResponse.json({error:true,message:"password is not correct"});
    return NextResponse.json({error:false,message:"user successfully signed in"});
}