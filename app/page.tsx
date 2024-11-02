// app/page.tsx
import Course_card from "./components/courseCard";
import courseModel from "./models/course";
import { Course } from "./Interface/interfaces";

interface HomeProps {
    username: string | null;
}

export default async function Home() {
    const data: Course[] = (await courseModel.find().sort({_id:-1}).limit(5));
    console.log(data);

    const most_bought: Course[] = await courseModel.find();
    most_bought.sort((a, b) => b.users_bought.length - a.users_bought.length);
    const topCourses = most_bought.slice(0,5);

    // at the time of finding the courses i need to get the courses that were most recently added

    return (
        <div className="home">
            <h1>Welcome to the home page</h1>
            <div className="course-list recently_added">
                <h1>Recently Added</h1>
                {data.map((course,index) => (
                    <Course_card key={index} course={course} admin={0} delete_display={false} update_display={false}/>
                ))}
            </div>
            <div className="course-list most_bought">
                <h1>Most Bought</h1>
                {topCourses.map((course,index) => (
                    <Course_card key={index} course={course} admin={0} delete_display={false} update_display={false}/>
                ))}
            </div>
        </div>
    );
}
