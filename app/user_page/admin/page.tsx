import { Course } from "@/app/Interface/interfaces";
import Course_card from "@/app/components/courseCard";
import courseModel from "@/app/models/course";

const AdminPage = async () => {
    const data : Course[] = await courseModel.find();
    return (
        <div className="admin_page">
            <h1> Admin </h1>
            {data.map((course,index)=><Course_card course={course} key={index} admin={1}/>)}
        </div>
    );
}

export default AdminPage;