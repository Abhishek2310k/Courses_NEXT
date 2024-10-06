import { ObjectId } from "mongodb";
import React from "react";
import "./style.scss";
import { FaUsers } from "react-icons/fa";
import { ImPriceTag } from "react-icons/im";
import Link from "next/link";
import DeleteCourseButton from "./DeleteCourseButton";
import {Course} from "../Interface/interfaces";

const Course_card: React.FC<{ course: Course }> = ({
  course,
}): JSX.Element => {
  // console.log(course);
  return (
    <div className="course_card">
      <h3>{course.course_name}</h3>
      <h4>{course.author}</h4>
      <div className="buy_button">
        <div className="users_and_price">
          <FaUsers />
          <span>{course.no_of_users}</span>
        </div>
        <div className="users_and_price">
          <ImPriceTag />
          <span>{course.price}</span>
        </div>
        <div className="buttons">
          <button type="button" className="buy">
            buy
          </button>
          <Link
            className="details"
            href={`/course_page/update_course/${course._id}`}
          >
            details
          </Link>
          {/* <DeleteCourseButton id={course._id}/> */}
        </div>
      </div>
    </div>
  );
};

export default Course_card;
