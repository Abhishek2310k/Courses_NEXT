import mongoose, { Document, Model, Schema, Types } from "mongoose";

export interface userInterface {
  userName: string;
  password: string;
}

export interface UserDocument extends userInterface, Document {
  createdAt: Date;
  updatedAt: Date;
}

const userSchema: Schema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    coursesBought: {
      type: [{ type: Types.ObjectId, ref: "Course" }],
      default: [],
      required: false,
    },
    admin: {
      type: Boolean,
      required:false,
      default: false
    }
  }
);

const userModel: Model<UserDocument> =
  mongoose.models.Users || mongoose.model<UserDocument>("Users", userSchema);

export default userModel;
