"use client"

import { useParams } from "next/navigation";
import { useState,useEffect } from "react";
import { Course } from "@/app/Interface/interfaces";
import axios from "axios";

const Details = () => {
    const {id} = useParams();
    const [course_info, setCourseInfo] = useState<Course | undefined>();

    const get_data = async (id: string) => {
        try {
            const response = await axios.get(`/api/course?id=${id}`);
            const course: Course = response.data.data;
            setCourseInfo(course);
        } catch (error) {
            console.error("Error fetching course data:", error);
        }
    };

    useEffect(() => {
        if (id) {
            get_data(id);
        }
    }, [id]);

    return (
        <div className="course_details">
            <h1> {course_info?.course_name} </h1>
            <p> {course_info?.description}</p>
        </div>
    );
}

export default Details;