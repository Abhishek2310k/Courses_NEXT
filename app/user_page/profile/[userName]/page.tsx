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
    const router = useRouter();
    const {state,setState} = useAppContext();
    // we have the userName now lets get courses specific to this username
    // i need to define a backend route for this because for courses we were able to define it without
    useEffect(()=>{
        const gettingCourses = async () => {
            const resp = await axios.get(`/api/course?userName=${userName}`);
            setData(resp.data.courses);
        }
        gettingCourses();
    },[]);

    const handleLogOut = async (e:React.MouseEvent<HTMLButtonElement>) => {
        document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
        await setState(false);
        router.push('/');
    }

    return (
        <div className="user_profile">
            <div className="addedCourses">
            {data?.length === 0 ? <h1>No added Course</h1> : 
                data?.map((course,index) => {
                    return <Course_card key = {index} course={course}/>
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