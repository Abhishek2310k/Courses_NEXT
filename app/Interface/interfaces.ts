import { ObjectId } from "mongodb"
export interface Course {
    _id:ObjectId,
    course_id:string,
    course_name:string,
    price:number,
    description:string,
    no_of_users:number,
    author:string,
    users_bought:string[],
    __v: number
}
export interface User {
    userName:string,
    password:string
}

export interface tokenInterface {
    userName:string
}

export interface tokenVerificationInterface {
    error:boolean,
    message:string
}