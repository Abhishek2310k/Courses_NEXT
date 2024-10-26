import courseModel from "../models/course";
import Course_card from "./courseCard";
import { Course } from "../Interface/interfaces";
async function get_data() {
  const data:Course[] = await courseModel.find();
  return data;
}

async function get_data_userName(userName:string) {
  const data:Course[] = await courseModel.find({userName:userName});
  return data;
}

export default async function Courses({userName} : {userName:string}) {
  let data;
  if (userName === undefined)
    data = await get_data();
  else data = await get_data_userName(userName);
  // console.log(data);
  return (
    <div>
      {data.map((course:Course, index:number) => (
        <Course_card course={course} key={index} />
      ))}
    </div>
  );
}
