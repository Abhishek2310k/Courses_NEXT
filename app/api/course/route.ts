import { NextRequest, NextResponse } from "next/server";
import courseModel from "@/app/models/course";
import jwt from 'jsonwebtoken';
import { verifyToken } from "@/app/utility/server_utility";
import { tokenVerificationInterface } from "@/app/Interface/interfaces";
import { ObjectId } from "mongodb";
import { Course} from "@/app/Interface/interfaces";
import mongoose from "mongoose";

export async function POST(req: NextRequest) {
  try {
    const temp_obj = await req.json();
    const { info: course, token } = temp_obj;
    if (!token || token === "") {
      return NextResponse.json({
        message: "Authorization token is missing or invalid",
        error: true,
      });
    }
    
    const tokenVerification:tokenVerificationInterface = verifyToken({token,course});
    if (tokenVerification.error === true) {
      NextResponse.json(tokenVerification);
    }
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
        const temp_id = req.headers.get("id");
        const token = req.headers.get("token");
        if (temp_id === null || token === null) return NextResponse.json({message:"something"});
        const id = new ObjectId(temp_id);
        const course:any = await courseModel.findById({_id:id});
        // no need to check if the course exists
        if (course === null) return NextResponse.json({error:false,message:"course already deleted"});
        const tokenVerification:tokenVerificationInterface = verifyToken({token,course});
        

        if (!ObjectId.isValid(id)) {
            return NextResponse.json({ error: true, message: "Invalid course ID" }, { status: 400 });
        }

        const _id = new ObjectId(id);
        const result = await courseModel.findByIdAndDelete(_id);

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
  const temp_obj = await req.json();
  console.log(temp_obj);
  const course:Course = temp_obj.course_info;
  const token:string = temp_obj.token
  const id = course._id;
  const object_id = new mongoose.Types.ObjectId(id);

  if (!token || token === "") {
    return NextResponse.json({
      message: "Authorization token is missing or invalid",
      error: true,
    });
  }
  
  const tokenVerification:tokenVerificationInterface = verifyToken({token,course});
  if (tokenVerification.error === true) {
    NextResponse.json(tokenVerification);
  }

  console.log(object_id);
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
  if (!id && !userName) {
    return NextResponse.json({
      error: true,
      message: "Invalid or missing ID parameter",
    });
  }

  if (!id) {
    try {
        const data = await courseModel.find({author:userName});
        return NextResponse.json({error:false,courses:data});
    } catch (err) {
        return NextResponse.json({error:false,data:{}})
    }
  }

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