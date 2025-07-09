import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';

const Navbar = () => {
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    const [imageUrl, setImageUrl] = useState('https://i.pinimg.com/originals/1b/11/e4/1b11e4b7a17cf33f773937db9bce895d.jpg');

    useEffect(() => {
        const fetchImage = async () => {
            const token = localStorage.getItem('accessToken');
            if (!token) return;

            try {
                const response = await fetch('http://localhost:8080/user/getImage', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const imageBlob = await response.blob();
                const url = URL.createObjectURL(imageBlob);
                setImageUrl(url);
            } catch (err) {
                console.error('Error fetching image:', err);
            }
        };

        fetchImage();

        // Cleanup function
        return () => {
            if (imageUrl) {
                URL.revokeObjectURL(imageUrl);
            }
        };
    }, []);


    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('accessToken');
            if (!token) return;

            try {
                const response = await fetch('http://localhost:8080/user/user-info', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch user info');
                }

                const data = await response.json();

                setIsAdmin(data.roles.includes("ADMIN"))

                setUser(data);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        fetchUser();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        setUser(null);
        setIsAdmin(false);
        navigate('/');
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    ✓ TaskFlow
                </Link>

                <div className="menu-icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    ☰
                </div>

                <ul className={isMenuOpen ? 'nav-menu active' : 'nav-menu'}>
                    <li className="nav-item">
                        <Link to="/" className="nav-links">
                            Home
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/tasks" className="nav-links">
                            Tasks
                        </Link>
                    </li>
                    {
                        isAdmin &&

                        <li className="nav-item">
                            <Link to="/admin" state={{ isAdmin }} className="nav-links">
                                Admin
                            </Link>
                        </li>
                    }

                    {user ? (
                        <>
                            <li className="nav-item">
                                <div className="user-profile">
                                <span className="username">{user.username}</span>
                                    <div className="dropdown">
                                        <button className="dropbtn">
                                            <img
                                                src={imageUrl}
                                                alt="Profile"
                                                className="profile-pic"
                                            />
                                        </button>
                                        <div className="dropdown-content">
                                            <Link to="/profile">Profile</Link>
                                            <Link to="/setting">Settings</Link>
                                            <button onClick={handleLogout}>Logout</button>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className="nav-item">
                                <Link to="/login" className="nav-links">
                                    Login
                                </Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;