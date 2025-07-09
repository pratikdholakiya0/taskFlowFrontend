import '../App.css'
import {useState, useEffect} from "react";
import NavBar from "../Components/NavBar.jsx";
import {useNavigate} from "react-router-dom";

function Profile() {
    const [user, setUser] = useState({
        email: '',
        fullName: '',
        username: '',
        image: [],
        isVerified: false
    });
    const [selectedFile, setSelectedFile] = useState(null);
    const [edit, setEdit] = useState(false);
    const [url, setUrl] = useState('');
    const [stats, setStats] = useState({
        tasks: 0,
        completionRate: 0,
        projects: 0
    })
    const navigate = useNavigate();

    const updateProfile = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('user', new Blob([JSON.stringify({
            email: user.email,
            fullName: user.fullName,
            username: user.username
        })], { type: 'application/json' }));

        if (selectedFile) {
            formData.append('file', selectedFile);
        }

        try {
            const response = await fetch('http://localhost:8080/user/updateProfile', {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                },
                body: formData
            });

            if (!response.ok) throw new Error('Failed to update profile');

            const updatedUser = await response.json();
            setUser({
                ...updatedUser,
                image: updatedUser.image || []
            });
            setEdit(false);
            alert('Profile updated successfully');
        } catch (error) {
            console.error('Update error:', error);
            alert('Failed to update profile');
        }
    }

    const fileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setSelectedFile(file);
        const reader = new FileReader();
        reader.onload = (e) => {
            setUser(prev => ({...prev, image: [e.target.result]}));
        }
        reader.readAsDataURL(file);
    }

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem("accessToken");
                if (!token) return;

                // Fetch user info
                const userResponse = await fetch('http://localhost:8080/user/user-info', {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                });
                if (!userResponse.ok) throw new Error('Failed to fetch user info');
                const userData = await userResponse.json();

                // Fetch user stats (example endpoint - adjust to your API)
                const statsResponse = await fetch('http://localhost:8080/user/stats', {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                });
                const statsData = statsResponse.ok ? await statsResponse.json() : {
                    tasks: 0,
                    completionRate: 0,
                    projects: 0
                };

                console.log(statsData);
                // Fetch profile image
                const imageResponse = await fetch('http://localhost:8080/user/getImage', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                let imageUrl = '';
                if (imageResponse.ok) {
                    const imageBlob = await imageResponse.blob();
                    imageUrl = URL.createObjectURL(imageBlob);
                }

                setUser({
                    ...userData,
                    image: userData.image || []
                });
                setUrl(imageUrl);
                setStats(statsData);
            } catch(err) {
                console.error('Fetch error:', err);
                localStorage.removeItem('accessToken');
            }
        }

        fetchUserData();
    }, []);

    useEffect(()=>{
        const token = localStorage.getItem("accessToken");
        if (!token) {
            navigate('/');
        };
    },[]);

    return (
        <div className="bg-gray-50 min-h-screen">
            <NavBar/>

            <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                {!edit ? (
                    <div className="space-y-6">
                        <div className="bg-white rounded-xl shadow-md overflow-hidden">
                            <div className="p-6">
                                <div className="flex flex-col md:flex-row items-center gap-8">
                                    <div className="relative">
                                        <img
                                            src={url}
                                            alt="Profile"
                                            className="w-40 h-40 rounded-full object-cover border-4 border-indigo-100 shadow-sm"
                                        />
                                        <button
                                            onClick={() => setEdit(true)}
                                            className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition"
                                        >
                                            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                        </button>
                                    </div>

                                    <div className="flex-1 text-center md:text-left">
                                        <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                                            <h2 className="text-2xl font-bold text-gray-800 capitalize">
                                                {user.username}
                                            </h2>
                                            {user.isVerified && (
                                                <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                </svg>
                                            )}
                                        </div>

                                        <div className="space-y-3">
                                            <div className="flex items-center justify-center md:justify-start gap-2">
                                                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                                <p className="text-lg text-gray-600 capitalize">{user.fullName}</p>
                                            </div>

                                            <div className="flex items-center justify-center md:justify-start gap-2">
                                                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                                <p className="text-lg text-gray-600">{user.email}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8 pt-6 border-t border-gray-200">
                                    <div className="flex justify-around">
                                        <div className="text-center">
                                            <p className="text-2xl font-semibold text-gray-800">{stats.tasks}</p>
                                            <p className="text-sm text-gray-500">Tasks</p>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-2xl font-semibold text-gray-800">{stats.completionRate}%</p>
                                            <p className="text-sm text-gray-500">Completed</p>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-2xl font-semibold text-gray-800">{stats.projects}</p>
                                            <p className="text-sm text-gray-500">Projects</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="bg-white rounded-xl shadow-md overflow-hidden">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-gray-800">Edit Profile</h2>
                                <button
                                    onClick={() => setEdit(false)}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <form onSubmit={updateProfile} className="space-y-6">
                                <div className="flex flex-col items-center">
                                    <div className="relative mb-4">
                                        <img
                                            src={url || 'https://i.pinimg.com/originals/1b/11/e4/1b11e4b7a17cf33f773937db9bce895d.jpg'}
                                            alt="Profile"
                                            className="w-32 h-32 rounded-full object-cover border-4 border-indigo-100 shadow-sm"
                                        />
                                        <label htmlFor="profile-upload" className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition cursor-pointer">
                                            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            <input
                                                id="profile-upload"
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={fileUpload}
                                            />
                                        </label>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                        <input
                                            type="text"
                                            id="fullName"
                                            value={user.fullName}
                                            onChange={(e) => setUser(prev => ({...prev, fullName: e.target.value}))}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                        <input
                                            type="email"
                                            id="email"
                                            value={user.email}
                                            onChange={(e) => setUser(prev => ({...prev, email: e.target.value}))}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                                        <input
                                            type="text"
                                            id="username"
                                            value={user.username}
                                            onChange={(e) => setUser(prev => ({...prev, username: e.target.value}))}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-end space-x-4 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setEdit(false)}
                                        className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Profile;