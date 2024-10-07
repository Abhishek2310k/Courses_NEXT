// creating end point for updating course
import { NextRequest, NextResponse } from "next/server";
import courseModel from "@/app/models/course";
import mongoose from "mongoose";
import { Course } from "@/app/Interface/interfaces";
export async function POST(req: NextRequest) {
  const data:Course = await req.json();
  const id = data._id;
  const object_id = new mongoose.Types.ObjectId(id);
  console.log(object_id);
  await courseModel.findByIdAndUpdate({ _id: id }, { $set: data });

  return NextResponse.json({ error: false, message: "everything is good" });
}
