// basic schema for login signup among the users
import mongoose, { Document, Model, Schema } from "mongoose";
export interface userInterface {
    userName:string,
    password:string
}
export interface UserDocument extends userInterface, Document {
  createdAt: Date;
  updatedAt: Date;
}
const userSchema: Schema = new Schema({
  userName: {
    type:String,
    required:true,
    unique:true
  },
  password: {
    type:String,
    required:true
  }
});

const userModel: Model<UserDocument> =
  mongoose.models.Users || mongoose.model("Users", userSchema);

export default userModel;