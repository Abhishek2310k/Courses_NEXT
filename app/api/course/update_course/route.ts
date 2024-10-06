// creating end point for updating course
import { NextRequest, NextResponse } from "next/server";
import courseModel from "@/app/models/course";
import mongoose from "mongoose";
export async function POST(req: NextRequest) {
  const data = await req.json();
  console.log(data);
  const id = data._id;
  const object_id = new mongoose.Types.ObjectId(id);
  console.log(object_id);
  await courseModel.findByIdAndUpdate({ _id: id }, { $set: data });

  return NextResponse.json({ error: false, message: "everything is good" });
}
