import '../App.css';
import {useEffect, useState} from "react";
import NavBar from "../Components/NavBar.jsx";
import {useNavigate} from "react-router-dom";

const TaskAssignPage = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(
        {
            username: "",
            email: "",
            fullName: "",
            roles: []
        }
    );

    const [formData, setFormData] = useState(
        {
            "title" : '',
            "description" : '',
            "due_date" : '',
            "assigned_to" : '',
        }
    );

    const handelSubmit = async (e) =>{
        e.preventDefault();

        const token = localStorage.getItem("accessToken");
        const response = await fetch("http://localhost:8080/admin/create-task", {
            method: "POST",
            headers: {
                "authorization": "Bearer " + token,
                "Content-Type": "application/json",
            },
            "body": JSON.stringify(formData)
        })

        if(!response.ok) {
            alert("Failed to create task");
            throw new Error("Something went wrong");
        }

        alert("Successfully created task");
    }

    let isAdmin = false;
    const fetchUsers = async () => {
        const token = localStorage.getItem("accessToken");
        const response = await fetch("http://localhost:8080/user/user-info", {
            method: "GET",
            headers: {
                "authorization": "Bearer " + token,
                "Content-Type": "application/json"
            }
        })

        if (!response.ok) {
            throw new Error("Something went wrong!");
        }

        const data = await response.json();

        for (let i = 0; i < data.roles.length; i++) {
            if(data.roles[i]==="ADMIN") isAdmin = true;
        }

        if (!isAdmin) {
            navigate("/");
        }

        setUser(data);

    }

    useEffect(() => {
        fetchUsers();
    },[])

    return(
        <div className="min-h-screen">
            <NavBar/>

            <div className="flex justify-center items-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full bg-white p-8 space-y-8 rounded-md">
                    <form method="POST" onSubmit={handelSubmit}>
                        <div>
                            <label htmlFor="title"
                                   className="block text-sm font-medium text-gray-700 mt-4">Title</label>
                            <input type="text"
                                   id="title"
                                   name="title"
                                   value={formData.title}
                                   autoComplete="title"
                                   placeholder="Enter title"
                                   required
                                   className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                   onChange={e => setFormData({...formData, title: e.target.value})}
                            />
                        </div>
                        <div>
                            <label htmlFor="description"
                                   className="block text-sm font-medium text-gray-700 mt-4">Description</label>
                            <input type="text"
                                   id="description"
                                   name="description"
                                   value={formData.description}
                                   autoComplete="description"
                                   placeholder="Enter description"
                                   required
                                   className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                   onChange={e => setFormData({...formData, description: e.target.value})}
                            />
                        </div>
                        <div>
                            <label htmlFor="assigned_to"
                                   className="block text-sm font-medium text-gray-700 mt-4">Assigned to</label>
                            <input type="text"
                                   id="assigned_to"
                                   name="assigned_to"
                                   value={formData.assigned_to}
                                   autoComplete="title"
                                   placeholder="Enter user to assigned"
                                   required
                                   className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                   onChange={e => setFormData({...formData, assigned_to: e.target.value})}
                            />
                        </div>
                        <div>
                            <label htmlFor="due_date"
                                   className="block text-sm font-medium text-gray-700 mt-4">Due date</label>
                            <input type="date"
                                   id="due_date"
                                   name="due_date"
                                   value={formData.due_date}
                                   autoComplete="description"
                                   placeholder="Enter description"
                                   required
                                   className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                   onChange={e => setFormData({...formData, due_date: e.target.value})}
                            />
                        </div>
                        <div className="mt-4">
                            <button className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Create task</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
};
export default TaskAssignPage;