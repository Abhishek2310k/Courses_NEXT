"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const AddCourse = () => {
  const router = useRouter();
  const { userName } = useParams();
  
  const [isClient, setIsClient] = useState(false);
  const [info, setInfo] = useState({
    course_id: "",
    author: userName,
    price: "",
    description: "",
    course_name: "",
    token: "",
  });

  useEffect(() => {
    // Client-side logic to fetch cookies and initialize form
    setIsClient(true);

    const userToken = Cookies.get("token") || "";
    setInfo({
      ...info,
      token: userToken,
    });
  }, [userName]);

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

    if (!info.token) {
      alert("Please login to add courses.");
      return;
    }

    try {
      const resp = await axios.post(
        "/api/course",
        { info, token: info.token }, // Passing course data + token
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      console.log(resp.data);
      if (resp.data.error === false)
        router.push(`/user_page/profile/${userName}`);
    } catch (error) {
      console.error("Error adding course:", error);
    }
  };

  if (!isClient) {
    return null;
  }

  if (!info.token) {
    return <h1>Please Login to add courses</h1>;
  }

  return (
    <div className="add_course_form">
      <form onSubmit={handleSubmit}>
        <input
          name="course_id"
          value={info.course_id || ""}
          onChange={handleChange}
          placeholder="Course Code"
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
