import '../App.css';
import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            navigate("/");
        }
    })

    const login = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/public/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({username, password}),
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const data = await response.text();

            localStorage.setItem('accessToken', data);
            console.log('login sucessfull');

            navigate('/');

        } catch (error) {
            console.error('Login error:', error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full bg-white p-8 space-y-8 rounded-md">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900">
                        log in
                    </h2>
                </div>
                <form className="space-y-6 mt-8" method="POST" onSubmit={async e => login(e)}>
                    <div>

                    </div>
                    <div className="rounded-md shadow-sm space-y-4">
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                            <input type="text"
                                   id="email"
                                   name="username"
                                   value={username}
                                   autoComplete="username"
                                   placeholder="Enter your username"
                                   required
                                   className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                   onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={password}
                                autoComplete="current-password"
                                required
                                className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Enter your password"
                                minLength="8"
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Log in
                            </button>
                        </div>
                    </div>
                </form>
                <div className="flex justify-between">
                    <Link to="/signup">sign up</Link>
                    <Link to="/forgetPassword">forgot password</Link>
                </div>
            </div>
        </div>
    );
}

export default Login;