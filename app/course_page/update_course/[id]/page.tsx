"use client";
import { Course } from '@/app/Interface/interfaces';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from "js-cookie";

const UpdateCoursePage = () => {
    const { id } = useParams();
    const [course_info, setCourseInfo] = useState<Course | undefined>();
    const token = Cookies.get('token');

    const get_data = async (id: string) => {
        try {
            const response = await axios.get(`/api/course?id=${id}`);
            const course: Course = response.data.data;
            setCourseInfo(course);
        } catch (error) {
            console.error("Error fetching course data:", error);
        }
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        if (course_info !== undefined) {
            const { name, value } = e.target;
            setCourseInfo({
                ...course_info,
                [name]: name === "price" ? Number(value) : value,
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const resp = await axios.put("/api/course", 
                { course_info },
                {
                    headers: {
                        "token": token
                    }
                }
            );
            if (resp.status === 200) {
                toast.success("Course updated successfully!");
            } else {
                toast.error("You don't have the correct access to update the course.");
            }
        } catch (err) {
            toast.error("An error occurred while updating the course.");
        }
    }

    useEffect(() => {
        if (id) {
            get_data(id);
        }
    }, [id]);

    return (
        <div className="update_course_form">
            <ToastContainer />
            {course_info === undefined ? (
                <h1>Loading...</h1>
            ) : (
                <form onSubmit={(e) => handleSubmit(e)}>
                    <input
                        name="course_id"
                        value={course_info.course_id || ""}
                        placeholder="Unique course ID"
                        onChange={(e) => handleChange(e)}
                    />
                    <input
                        name="course_name"
                        value={course_info.course_name || ""}
                        placeholder="Course name"
                        onChange={(e) => handleChange(e)}
                    />
                    <input
                        type="number"
                        name="price"
                        value={course_info.price || ""}
                        placeholder="Price"
                        onChange={(e) => handleChange(e)}
                    />
                    <input
                        name="author"
                        value={course_info.author || ""}
                        placeholder="Author"
                        onChange={(e) => handleChange(e)}
                    />
                    <textarea
                        name="description"
                        value={course_info.description || ""}
                        placeholder="Description"
                        onChange={(e) => handleChange(e)}
                    />
                    <button type="submit">Update Course</button>
                </form>
            )}
        </div>
    );
};

export default UpdateCoursePage;
