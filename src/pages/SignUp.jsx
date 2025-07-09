import {Form, Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

function SignUp() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setfullName] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [username, setUsername] = useState("");

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            navigate("/");
        }
    })

    const createAccount = async (e)=>{
        e.preventDefault();

        const response = await fetch("http://localhost:8080/public/signup",{
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                username,
                email,
                password,
                fullName
            })
        })

        if (!response.ok) {
            throw new Error('Login failed');
        }

        console.log("account created successfully");
        navigate("/login")
    }

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full bg-white p-8 space-y-8 rounded-md">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900">
                        Sign up
                    </h2>
                </div>
                <form method="POST" onSubmit={createAccount}>
                    <div>
                        <div className="mt-4">
                            <label htmlFor="username"
                                   className="block text-sm font-medium text-gray-700">Username</label>
                            <input type="text"
                                   id="username"
                                   name="username"
                                   value={username}
                                   autoComplete="username"
                                   placeholder="Enter your username"
                                   required
                                   className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                   onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="mt-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input type="email"
                                   id="email"
                                   name="email"
                                   value={email}
                                   autoComplete="email"
                                   placeholder="Enter your email"
                                   required
                                   className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                   onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mt-4">
                            <label htmlFor="fullName"
                                   className="block text-sm font-medium text-gray-700">full name</label>
                            <input type="text"
                                   id="fullName"
                                   name="fullName"
                                   value={fullName}
                                   autoComplete="fullName"
                                   placeholder="Enter your fullName"
                                   required
                                   className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                   onChange={(e) => setfullName(e.target.value)}
                            />
                        </div>
                        <div className="mt-4">
                            <label htmlFor="password"
                                   className="block text-sm font-medium text-gray-700">password</label>
                            <input type="password"
                                   id="password"
                                   name="password"
                                   value={password}
                                   autoComplete="password"
                                   placeholder="Enter your password"
                                   required
                                   className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                   onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="mt-4">
                            <label htmlFor="repassword"
                                   className="block text-sm font-medium text-gray-700">re-password</label>
                            <input type="password"
                                   id="repassword"
                                   name="repassword"
                                   value={confirmPassword}
                                   autoComplete="repassword"
                                   placeholder="re enter your password"
                                   required
                                   className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                   onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                        <div className="mt-8">
                            <button type="submit"
                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                Sign up
                            </button>
                        </div>
                    </div>
                </form>
                <div>
                    <Link to="/login">Login</Link>
                </div>
            </div>
        </div>
    )
}

export default SignUp;