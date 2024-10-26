// lets create a function for token verification
import { courseInterface } from "../models/course";
import jwt from "jsonwebtoken";
export function verifyToken ({token,course} : {token:string,course:courseInterface}) {
    if (process.env.TOKEN_KEY === undefined) return {error:true,message:"environment variables not set"}
    const decodedToken = jwt.verify(token,process.env.TOKEN_KEY);
    if (typeof decodedToken === "string")
      return (
        {
          message:"token not valid",
          error:true
        }
    );
    console.log(decodedToken.userName);
    if (decodedToken.userName !== course.author) 
      return (
        {
          message:"token not valid",
          error:true
        }
    );
    return ({error:false,message:"token is valid"}); 
}