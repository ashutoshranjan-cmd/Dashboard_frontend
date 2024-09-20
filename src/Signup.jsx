import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from 'framer-motion';
import './App.css';

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [photo,setPhoto] = useState("");
    const navigate = useNavigate();
    useEffect(()=>{
        const auth = localStorage.getItem('user');
        if(auth)
        {
            navigate('/')
        }

    },[])
    const collectData = async () => {
        const formData  = new FormData();
        formData.append('name',name);
        formData.append('email',email);
        formData.append('password',password);
        formData.append('choco',photo);
        let result = await fetch("https://dashboard-backend-7dt4.onrender.com/register", {
            method: 'post',
            // body: JSON.stringify({name, email, password ,photo}),
            body: formData,
            // headers: {
            //     'Content-Type': 'application/json'
            // },
        })
        result = await result.json()
        console.log(result)
        localStorage.setItem("user",JSON.stringify(result.result));
        localStorage.setItem("token",JSON.stringify(result.auth));
         navigate('/')
        // console.log(photo);
        
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-yellow-400 via-white-500 to-red-500 py-12 ">
            <motion.div 
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white p-8 rounded-lg shadow-2xl w-96"
            >
                <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">Register</h1>
                <motion.input 
                    whileFocus={{ scale: 1.05 }}
                    className="w-full px-4 py-2 mb-4 text-gray-700 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter name"
                />
                <motion.input 
                    whileFocus={{ scale: 1.05 }}
                    className="w-full px-4 py-2 mb-4 text-gray-700 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                    type="text"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email"
                />
                <motion.input 
                    whileFocus={{ scale: 1.05 }}
                    className="w-full px-4 py-2 mb-6 text-gray-700 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                />
                <motion.input 
                    whileFocus={{ scale: 1.05 }}
                    className="w-full px-4 py-2 mb-6 text-gray-700 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                    type="file"
                    onChange={(e)=>setPhoto(e.target.files[0])}
                    placeholder="Enter password"
                />
                <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full py-2 px-4 bg-gradient-to-r from-red-600 to-red-900 text-white font-semibold rounded-md shadow-md hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50"
                    onClick={collectData}
                >
                    Sign up
                </motion.button>
                <p className="mt-4 text-center text-gray-600">
                    Already have an account? 
                    <Link to="/login" className="text-purple-600 hover:text-purple-800 ml-1">
                        Login here
                    </Link>
                </p>
            </motion.div>
        </div>
    )
}

export default Signup;

{/* <input className="inputBox" type="file" onChange={(e)=>setPhoto(e.target.files[0])} /> */}