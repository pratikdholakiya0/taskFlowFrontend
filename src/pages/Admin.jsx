import '../App.css'
import NavBar from "../Components/NavBar.jsx";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useEffect} from "react";

function Admin() {
    const navigate = useNavigate();
    const location = useLocation();
    const isAdmin = location.state?.isAdmin || false;

    useEffect(()=>{
        if (!isAdmin){
            navigate("/")
        }
    },[])
    return (
        <div>
            <div className="flex flex-col min-h-screen">
                <NavBar/>
                <div className="flex-1 bg-gray-100 flex flex-col justify-center items-center gap-6 p-4">
                    <h1 className="text-2xl font-bold text-gray-800">Task Manager</h1>
                    <div className="flex gap-4">
                        <Link
                            to="/addTask"
                            state={{ isAdmin }}
                            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors shadow-md"
                        >
                            Add Task
                        </Link>
                        <Link
                            to="/listTask"
                            state={{ isAdmin }}
                            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors shadow-md"
                        >
                            View Tasks
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )}

export default Admin