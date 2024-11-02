"use client";
import { Course } from "@/app/Interface/interfaces";
import DeleteCourseButton from "@/app/components/DeleteCourseButton";
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";

const AdminPage = () => {
    const [data, setData] = useState<Course[]>([]);
    const [pageIndex, setPageIndex] = useState<number>(1);
    const [dataDisplayed, setDataDisplayed] = useState<Course[]>([]);
    const itemsPerPage = 10;

    useEffect(() => {
        const getData = async () => {
            const resp = await axios.get('/api/course');
            setData(resp.data.data);
        };
        getData();
    }, []);

    useEffect(() => {
        const startIndex = (pageIndex - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        setDataDisplayed(data.slice(startIndex, endIndex));
    }, [data, pageIndex]);

    const totalPages = Math.ceil(data.length / itemsPerPage);
    const renderPaginationButtons = () => {
        const buttons = [];

        if (totalPages <= 1) return null;
        if (pageIndex !== 1) {
            buttons.push(
                <button
                    key={1}
                    onClick={() => setPageIndex(1)}
                    className={pageIndex === 1 ? "active" : ""}
                >
                    1
                </button>
            );
        }
        if (pageIndex > 3) {
            buttons.push(<span key="start-ellipsis">...</span>);
        }
        if (pageIndex > 2) {
            buttons.push(
                <button
                    key={pageIndex - 1}
                    onClick={() => setPageIndex(pageIndex - 1)}
                >
                    {pageIndex - 1}
                </button>
            );
        }
        buttons.push(
            <button key={pageIndex} className="active">
                {pageIndex}
            </button>
        );
        if (pageIndex < totalPages - 1) {
            buttons.push(
                <button
                    key={pageIndex + 1}
                    onClick={() => setPageIndex(pageIndex + 1)}
                >
                    {pageIndex + 1}
                </button>
            );
        }

        // Show ellipses if the current page is far from the last
        if (pageIndex < totalPages - 2) {
            buttons.push(<span key="end-ellipsis">...</span>);
        }

        if (pageIndex !== totalPages) {
            buttons.push(
                <button
                    key={totalPages}
                    onClick={() => setPageIndex(totalPages)}
                    className={pageIndex === totalPages ? "active" : ""}
                >
                    {totalPages}
                </button>
            );
        }

        return buttons;
    };

    return (
        <div className="admin_page">
            <h1>Admin</h1>
            {data.length === 0 ? (
                <h1>Loading...</h1>
            ) : dataDisplayed.length === 0 ? (
                <p>No courses available.</p>
            ) : (
                <>
                    <table>
                        <thead>
                            <tr>
                                <th>Course ID</th>
                                <th>Author</th>
                                <th>Course Name</th>
                                <th>Price</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataDisplayed.map((course) => (
                                <tr key={course.course_id}>
                                    <td>{course.course_id}</td>
                                    <td>{course.author}</td>
                                    <td>{course.course_name}</td>
                                    <td>{course.price}</td>
                                    <td>
                                        <div className="button-container">
                                            <DeleteCourseButton id={course._id} admin={1} />
                                            <Link
                                                className="details"
                                                href={`/course_page/update_course/${course._id}`}
                                            >
                                                Update
                                            </Link>
                                            <Link
                                                className="details"
                                                href={`/course_page/course_details/${course._id}`}
                                            >
                                                Details
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="pagination">
                        {renderPaginationButtons()}
                    </div>
                </>
            )}
        </div>
    );
};

export default AdminPage;
