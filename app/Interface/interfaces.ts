import { ObjectId } from "mongodb"
export interface Course {
    _id:ObjectId,
    course_id:string,
    course_name:string,
    price:number,
    description:string,
    no_of_users:number,
    author:string,
    __v: number
}