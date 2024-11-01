import { ObjectId } from "mongodb";
import React from "react";
import "./style.scss";
import { FaUsers } from "react-icons/fa";
import { ImPriceTag } from "react-icons/im";
import Link from "next/link";
import DeleteCourseButton from "./DeleteCourseButton";
import {Course} from "../Interface/interfaces";
import BuyCourseButton from "./BuyCourseButton";
import Details from "../course_page/course_details/[id]/page";

const Course_card: React.FC<{ course: Course ,admin:number, delete_display?:boolean, 
  update_display?:boolean, buy_display?:boolean
}> = ({
  course,admin,delete_display=true,update_display=true,buy_display=true
}): JSX.Element => {
  // console.log(course);
  return (
    <div className="course_card">
      <h3>{course.course_name}</h3>
      <h4>{course.author}</h4>
      <div className="buy_button">
        <div className="users_and_price">
          <FaUsers />
          <span>{course.users_bought.length}</span>
        </div>
        <div className="users_and_price">
          <ImPriceTag />
          <span>{course.price}</span>
        </div>
        <div className="buttons">
          {update_display === true ? 
          <Link
          className="details"
          href={`/course_page/update_course/${course._id}`}
        >
          update
        </Link> : 
        <Link
          className="details"
          href={`/course_page/course_details/${course._id}`}
        >
          Details
        </Link>
      }
          {buy_display === true ? <BuyCourseButton id = {course._id}/> : <></>}
          {delete_display === true ? <DeleteCourseButton id={course._id} admin={admin}/> : <></>}
        </div>
      </div>
    </div>
  );
};

export default Course_card;