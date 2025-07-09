import '../App.css'
import {useState, useEffect} from "react";
import NavBar from "../Components/NavBar.jsx";

function Setting() {
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
            <NavBar/>
        </>
    )
}

export default Setting