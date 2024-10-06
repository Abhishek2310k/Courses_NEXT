import courseModel from "../models/course";
import Course_card from "./courseCard";
import { Course } from "../Interface/interfaces";
async function get_data() {
  const data:Course[] = await courseModel.find();
  return data;
}

export default async function Courses() {
  let data = await get_data();
  // console.log(data);
  return (
    <div>
      {data.map((course:Course, index:number) => (
        <Course_card course={course} key={index} />
      ))}
    </div>
  );
}