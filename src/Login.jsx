import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate('/');
        }
    }, [navigate]);

    const handleLogin = async () => {
        console.log(email, password);
        let result = await fetch("https://dashboard-backend-7dt4.onrender.com/login", {
            method: 'post',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        result = await result.json();
        console.log(result);
        if (result.auth) {
            localStorage.setItem("user", JSON.stringify(result.user));
            localStorage.setItem("token", JSON.stringify(result.auth));
            navigate("/");
        } else {
            alert("Please enter correct details");
        }
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 via-black-500 to-yellow-500 ">
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white p-8 rounded-lg shadow-2xl w-96"
            >
                <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">Login</h1>
                <motion.input
                    whileFocus={{ scale: 1.05 }}
                    className="w-full px-4 py-2 mb-4 text-gray-700 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                    type="text"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email"
                />
                <div className="relative">
                    <motion.input
                        whileFocus={{ scale: 1.05 }}
                        className="w-full px-4 py-2 mb-6 text-gray-700 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                        type={showPassword ? "text" : "password"}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter password"
                    />
                    <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-700 mt-[-1rem]"
                    >
                        {showPassword ? (
                            <EyeOff className="h-5 w-5" />
                        ) : (
                            <Eye className="h-5 w-5" />
                        )}
                    </button>
                </div>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full py-2 px-4 bg-gradient-to-r from-red-600 to-red-900 text-white font-semibold rounded-md shadow-md hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50"
                    onClick={handleLogin}
                >
                    Login
                </motion.button>
            </motion.div>
        </div>
    );
}

export default Login;