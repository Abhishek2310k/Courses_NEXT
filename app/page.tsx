// app/page.tsx
import Courses from "./components/Courses";

interface HomeProps {
    username: string | null;
}

// console.log(username);
// Home component
export default async function Home() {
    return (
        <div className="home">
            <h1>Welcome to the home page</h1>
            <Courses userName=""/>
        </div>
    );
}
