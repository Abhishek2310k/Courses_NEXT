import { ObjectId } from "mongodb";
import mongoose, { Document, Model, Schema } from "mongoose";
export interface courseInterface {
  course_id: string;
  course_name: string;
  price?: number;
  description?: string;
  no_of_users?: number;
  author: string;
  users_bought?: string[];
}
export interface CourseDocument extends courseInterface, Document {
  createdAt: Date;
  updatedAt: Date;
}
const courseSchema: Schema = new Schema({
  course_id: {
    type: String,
    unique: true,
    required: true,
  },
  course_name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    default: 0,
  },
  description: {
    type: String,
    default: "",
  },
  no_of_users: {
    type: Number,
    default: 0,
  },
  author: {
    type: String,
    required: true,
  },
  users_bought: {
    type: [String],
    required:false,
    default: [],
  }
});

const courseModel: Model<CourseDocument> =
  mongoose.models?.Courses || mongoose.model("Courses", courseSchema);

export default courseModel;
