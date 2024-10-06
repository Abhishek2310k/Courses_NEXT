"use client";
import axios from "axios";
import React, { useState } from "react";

const AddCourse = () => {
  const [info, setInfo] = useState({
    course_id: "",
    author: "abhishek",
    price: "",
    description: "",
    course_name: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setInfo({
      ...info,
      [name]: name === "price" ? Number(value) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const resp = await axios.post(
        "http://localhost:3000/api/course/add_course",
        info,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      console.log(resp.data);
    } catch (error) {
      console.error("Error adding course:", error);
    }
  };

  return (
    <div className="add_course_form">
      <form onSubmit={handleSubmit}>
        <input
          name="course_id"
          value={info.course_id || ""}
          onChange={handleChange}
          placeholder="Unique course ID"
        />
        <input
          name="course_name"
          value={info.course_name || ""}
          onChange={handleChange}
          placeholder="Course name"
        />
        <input
          type="number"
          name="price"
          value={info.price || ""}
          onChange={handleChange}
          placeholder="Price"
        />
        <input
          name="author"
          value={info.author || ""}
          onChange={handleChange}
          placeholder="Author"
        />
        <textarea
          name="description"
          value={info.description || ""}
          onChange={handleChange}
          placeholder="Description"
        />
        <button type="submit">Add Course</button>
      </form>
    </div>
  );
};

export default AddCourse;
