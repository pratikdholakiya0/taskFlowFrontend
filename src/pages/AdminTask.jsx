import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import NavBar from "../Components/NavBar.jsx";
import {ObjectId} from "bson";

function AdminTask(){
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState('All');
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const [taskUpdate, setTaskUpdate] = useState({});
    const istaskUpdate = false;

    const update = (id) => {
        const token = localStorage.getItem("accessToken");
        try {
            const response = fetch(`http://localhost:8080/admin/update-task/${id}`, {
                method: 'PUT',
                headers: {
                    'authorization': `Bearer ${token}`
                },
                body: JSON.stringify({taskUpdate})
            });
            if (!response.ok) throw new Error(response.statusText);
        }catch (error) {
            console.log(error);
        }
    }

    const deleteTask = async (id) =>{
        const token = localStorage.getItem("accessToken");
        try{
            const response = await fetch(`http://localhost:8080/admin/delete-task/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${token}`
                }
            });

            if (!response.ok){
                throw new Error(response.statusText);
            }


        }catch(err){
            console.error(err);
        }
    }

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                if (!token) {
                    navigate('/');
                }
                const response = await fetch('http://localhost:8080/admin/get-All-Tasks', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) throw new Error('Failed to fetch tasks');

                const data = await response.json();
                setTasks(data);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTasks();
    }, []);

    const filteredTasks = filter === 'All'
        ? tasks
        : tasks.filter(task => task.status === filter);

    return (
        <div>
            <NavBar/>

            <div className="task-container">
                <h1 className="font-medium text-3xl my-8">All Tasks</h1>

                <div className="filter-controls">
                    <button
                        className={filter === 'All' ? 'active' : ''}
                        onClick={() => setFilter('All')}
                    >
                        All Tasks
                    </button>
                    <button
                        className={filter === 'pending' ? 'active' : ''}
                        onClick={() => setFilter('pending')}
                    >
                        Pending
                    </button>
                    <button
                        className={filter === 'In Progress' ? 'active' : ''}
                        onClick={() => setFilter('In Progress')}
                    >
                        In Progress
                    </button>
                    <button
                        className={filter === 'completed' ? 'active' : ''}
                        onClick={() => setFilter('completed')}
                    >
                        Completed
                    </button>
                </div>

                {isLoading ? (
                    <div className="loading">Loading tasks...</div>
                ) : (
                    <div className="task-list">
                        {filteredTasks.length > 0 ? (
                            filteredTasks.map(task => (
                                <div key={task._id} className="task-card">
                                    <h3>{task.title}</h3>
                                    <p>{task.description}</p>
                                    <div className="task-meta">
                                        <span>Due: {new Date(task.due_date).toLocaleDateString()}</span>
                                        <span className={`status ${task.status}`}>
                                        {task.status}
                                      </span>
                                    </div>
                                    <div className="w-full flex justify-between items-center mt-6">
                                        <button
                                            onClick={() => updateTask(task.id)}
                                            className="flex justify-center py-2 px-4 border border-transparent rounded-3xl shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">update</button>
                                        <button
                                            onClick={() => deleteTask(task.id)}
                                            className="flex justify-center py-2 px-4 border border-transparent rounded-3xl shadow-sm text-sm font-medium text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">delete</button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No tasks found</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default AdminTask;