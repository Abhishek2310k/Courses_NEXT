import { NextResponse } from "next/server";
import { courseInterface } from "../models/course";
export const returnData = ({error,message,data = [],token = ""} : 
        {error:boolean | false,
        message:string | "",
        data?:courseInterface[],
        token?:string
    }) => {
        // this is where we create the main return type
        const resp = NextResponse.json({error:error,message:message,data:data});
        if (token !== "") {
        resp.cookies.set('token', token, {
                httpOnly: false,      
                secure: process.env.NODE_ENV === 'production',
                maxAge: 12 * 60 * 60,
                path: '/',         
                sameSite: 'strict',
              });
            }
        return resp;
}