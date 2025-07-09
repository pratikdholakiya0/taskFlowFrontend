import './App.css'
import {useState, useEffect} from "react";
import NavBar from "./Components/NavBar.jsx";
import TaskAssignPage from "./pages/TaskAssignPage.jsx";
import {useNavigate} from "react-router-dom";
import Home from "./pages/Home.jsx";

function App() {
    let isAdmin = false;
    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: '',
        fullName: '',
        username: ''
    })

    const getUserInfo = async () => {
        try {
            const token = localStorage.getItem("accessToken");

            const response = await fetch('http://localhost:8080/user/user-info', {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })

            if (!response.ok) throw new Error('Failed to fetch user info');

            const userData = await response.json();

            for (let i = 0; i < userData.roles.length; i++) {
                if(userData.roles[i]==="ADMIN") isAdmin = true;
            }

            if (!isAdmin) {
                navigate("/");
            }
            setUser(userData);
        } catch(err) {
            console.log(err);
            localStorage.removeItem('accessToken');
        }
    }

    useEffect(() => {
        getUserInfo();
    }, []);

    return (
        <>
            <NavBar state={{ isAdmin: isAdmin }} />
            <Home isAuthenticated={user!==null}/>
        </>
    )
}

export default App