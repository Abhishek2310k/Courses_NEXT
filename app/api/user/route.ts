import userModel from "@/app/models/user";
import { NextRequest,NextResponse } from "next/server";
import { genSaltSync,hashSync } from "bcrypt";
import { compareSync } from "bcrypt";
import jwt from 'jsonwebtoken';
import { returnData } from "../utility";
import { Types } from "mongoose";


// function for signing up the user
export async function POST(req:NextRequest) {
    try {
        let user_data = await req.json();
        // now just need to hash the password and store it in the database
        const salt = genSaltSync(10);
        user_data.password = hashSync(user_data.password,salt);
        const data = new userModel(user_data);
        await data.save();
        return returnData({error:false,message:"signup Successful"});
    } catch (err) {
        return returnData({error:true,message:"some error while signing up"});
    }
}


// function for the signin part
export async function GET (req:NextRequest) {
    try {
        const {sign} = jwt;
        const username:string = req.headers.get("username") || "";
        const password:string = req.headers.get("password") || "";
        // data is here 
        // checking if the user is in the database
        const stored_data = await userModel.findOne({userName:username});
        if (stored_data === null) return returnData({error:true,message:"user doesn't exist"});

        // user exists we need to compare the hashed password and the input passwort
        let compare:boolean = compareSync(password,stored_data.password);
        if (compare === false) return returnData({error:true,message:"password is incorrect"});

        // at this point authentication is done lets create a jwt for the user and send it back
        const key = process.env.TOKEN_KEY;
        if (key !== undefined) {
            const token = sign({userName:username},key,{expiresIn:'12h'});
            return returnData({error:false,message:"successful signin",token:token});
        }
        else throw new Error("server key is not working");
    } catch (err) {
        console.log(err);
        return returnData({error:true,message:"some error has occured on the backend"});
    }
}

export async function PUT (req:NextRequest) {
    try {
        // lets first get our info from req body
        const {userid,courseid} = await req.json();
        const userObjectId = new Types.ObjectId(userid);
        const courseObjectId = new Types.ObjectId(courseid);
        // we have both the userid and the course id in req we just need to get the course from the backend and add new value to that course
        await userModel.findByIdAndUpdate(
            userid,
            { $push : {coursesBought : new Types.ObjectId(courseid)}},
            {new : true}
        );
        return returnData({error:false,message:"nice"});
    }
    catch (err) {
        console.log(err);
        return returnData({error:true,message:"some error has occured while buying the course"})
    }
}
