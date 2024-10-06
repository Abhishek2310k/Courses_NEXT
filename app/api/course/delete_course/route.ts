import courseModel from "@/app/models/course";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const id = await req.text(); // Assuming `id` is coming in as a string
        console.log(id);

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
