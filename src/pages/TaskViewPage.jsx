import { useState, useEffect } from 'react';
import '../App.css';
import NavBar from "../Components/NavBar.jsx";
import {useNavigate} from "react-router-dom";

const TaskViewPage = () => {
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState('All');
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                if (!token) {
                    navigate('/');
                }
                const response = await fetch('http://localhost:8080/user/get-All-Tasks', {
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
                <h1>My Tasks</h1>

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
                                        <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                                        <span className={`status ${task.status}`}>
                                        {task.status}
                                      </span>
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
};

export default TaskViewPage;