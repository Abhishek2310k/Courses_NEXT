// lets first get the username from the client side
"use client"
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Courses from "@/app/components/Courses";
import { Course } from "@/app/Interface/interfaces";
import Course_card from "@/app/components/courseCard";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/app/context";

const UserProfile = () => {
    const {userName} = useParams();
    const finalUserName = String(userName);
    const [data,setData] = useState<Course[]>();
    const [boughtCourses,setBoughtCourses] = useState<Course[]>();
    const router = useRouter();
    const {state,setState} = useAppContext();
    useEffect(()=>{
        const gettingAddedCourses = async () => {
            const resp = await axios.get(`/api/course?userName=${userName}`);
            setData(resp.data.courses);
        }
        const gettingBoughtCourses = async () => {
            const resp = await axios.get(`/api/course?userName=${userName}&bought=1`)
            setBoughtCourses(resp.data.data);
        }
        gettingAddedCourses();
        gettingBoughtCourses();
    },[]);
    

    const handleLogOut = async (e:React.MouseEvent<HTMLButtonElement>) => {
        document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
        await setState(false);
        router.push('/');
    }

    return (
        <div className="user_profile">
            <div className="profile_courses addedCourses">
                <h1>Added Courses</h1>
            {data?.length === 0 ? <h1>No added Course</h1> : 
                data?.map((course,index) => {
                    return <Course_card key = {index} course={course} buy_display={false}/>
                })
            }
            </div>
            <div className="profile_courses boughtCourses">
                <h1>Bought Courses</h1>
            {boughtCourses?.length === 0 ? <h1>No Course Bought</h1> : 
                boughtCourses?.map((course,index) => {
                    return <Course_card key = {index} course={course} buy_display={false} update_display={false} delete_display={false}/>
                })
            }
            </div>
            <div className="addCourse">
                <Link href={`/course_page/add_course/${userName}`}><button>Add Course</button></Link>
            </div>
            <button 
            className="logOutButton"
            onClick={(e)=>handleLogOut(e)}>
                LogOut
            </button>
        </div>
    )
}

export default UserProfile;