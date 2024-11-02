import { NextRequest, NextResponse } from "next/server";
import courseModel from "@/app/models/course";
import jwt from 'jsonwebtoken';
import { verifyToken } from "@/app/utility/server_utility";
import { tokenVerificationInterface } from "@/app/Interface/interfaces";
import { ObjectId } from "mongodb";
import { Course} from "@/app/Interface/interfaces";
import mongoose from "mongoose";
import userModel, { userInterface } from "@/app/models/user";
import { returnData } from "../utility";
import { jwtDecode } from "jwt-decode";
import { User } from "@/app/Interface/interfaces";

export async function POST(req: NextRequest) {
  try {
    const temp_obj = await req.json();
    const { info: course,} = temp_obj;
    const data = new courseModel(course);
    await data.save();

    return NextResponse.json({
      message: "Course added successfully",
      error: false,
    });
  } catch (error) {
    console.error("Error adding course:", error);
    return NextResponse.json({
      message: "Server error occurred",
      error: true,
    });
  }
}


export async function DELETE(req: NextRequest) {
    try {
        console.log("delete function is called");
        const temp_id = req.headers.get("id");
        const token = req.headers.get("token");
        const admin = req.headers.get("admin");
        if (temp_id === null) return NextResponse.json({message:"something"});
        const id = new ObjectId(temp_id);
        if (admin === '1') {
          const _id = new ObjectId(id);
        
          const result = await courseModel.deleteOne({_id:id});
          if (!result) {
              return NextResponse.json({ error: true, message: "Course not found" }, { status: 404 });
          }

          return NextResponse.json({ error: false, message: "Course deleted successfully" });
        }
        if (token === null) return returnData({error:true,message:"token not provided"});
        const decoded_token = jwtDecode<{userName:string}>(token);
        console.log(decoded_token.userName);
        const course:any = await courseModel.findById({_id:id});
        if (course === null) return NextResponse.json({error:false,message:"course already deleted"});

        if (!ObjectId.isValid(id)) {
            return NextResponse.json({ error: true, message: "Invalid course ID" }, { status: 400 });
        }

        const _id = new ObjectId(id);
        
        const result = await courseModel.deleteOne({author:decoded_token.userName,_id:id});
        if (!result) {
            return NextResponse.json({ error: true, message: "Course not found" }, { status: 404 });
        }

        return NextResponse.json({ error: false, message: "Course deleted successfully" });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: true, message: "Failed to delete course" }, { status: 500 });
    }
}

// for updating data
export async function PUT(req: NextRequest) {
  try {
  const token = req.headers.get("token");
  if (token === null) return returnData({error:true,message:"token not provided"});
  const decoded_token = jwtDecode<{userName:string}>(token);
  const user:User = await userModel.findOne({userName:decoded_token.userName});
  console.log(user);
  const temp_obj = await req.json();
  const course:Course = temp_obj.course_info;
  const id = course._id;
  const object_id = new mongoose.Types.ObjectId(id);
  if (user.userName === course.author || user.admin === true)
    await courseModel.findByIdAndUpdate({ _id: id }, { $set: course });

  return NextResponse.json({ error: false, message: "everything is good" });
} catch (err) {
  console.log(err);
  return NextResponse.error();
}
}


// for getting course
export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  const userName = req.nextUrl.searchParams.get("userName");
  const bought = req.nextUrl.searchParams.get("bought");

  if (bought) {
    // If bought header is provided, return all of the courses bought by a particular user
    const user = await userModel.findOne({ userName: userName });
    if (user === null || user === undefined) {
        return returnData({ error: true, message: "User not defined" });
    } 

    // Here we need to find all of the courses in the list of the courses bought
    const courses = await courseModel.find({ _id: { $in: user.coursesBought } });

    // Return the found courses
    return returnData({ error: false, data: courses });
  }

  if (!id && !userName) {
    // console.log("aaya");
    const data = await courseModel.find();
    return NextResponse.json({
      error: true,
      message: "Invalid or missing ID parameter",
      data:data
    });
  }


  // this is used for showing all of the courses belonging to a particular user
  if (!id) {
    try {
        const data = await courseModel.find({author:userName});
        return NextResponse.json({error:false,courses:data});
    } catch (err) {
        return NextResponse.json({error:false,data:{}})
    }
  }


  // used for returning all the info about a particular course
  let obj_id;
  obj_id = new mongoose.Types.ObjectId(id);

  try {
    const data = await courseModel.findById(obj_id);
    if (!data) {
      return NextResponse.json({
        error: true,
        message: "Course not found",
      });
    }

    return NextResponse.json({ error: false, data });
  } catch (err) {
    return NextResponse.json({
      error: true,
      message: "Error fetching course data",
    });
  }
}