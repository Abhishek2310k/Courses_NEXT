import { NextRequest, NextResponse } from "next/server";
import courseModel from "@/app/models/course";
import mongoose from "mongoose";

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");

  if (!id) {
    return NextResponse.json({
      error: true,
      message: "Invalid or missing ID parameter",
    });
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
