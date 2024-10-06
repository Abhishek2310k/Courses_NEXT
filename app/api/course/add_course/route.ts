import { NextRequest, NextResponse } from "next/server";
import courseModel from "@/app/models/course";

export async function POST(req: NextRequest) {
  try {
    const course = await req.json(); // Parse the request body as JSON

    if (!course || Object.keys(course).length === 0) {
      return NextResponse.json({
        message: "Received empty data",
        error: true,
      });
    }
    const data = new courseModel(course);
    await data.save();
    return NextResponse.json({
      message: "Element added successfully",
      error: false,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Failed to process request",
      error: true,
    });
  }
}
