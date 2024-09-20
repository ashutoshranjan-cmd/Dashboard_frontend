import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LuLogOut, LuMenu } from "react-icons/lu";
import './App.css';

const Nav = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const auth = localStorage.getItem('user');
    const [image, setImage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (auth) {
            setImage(JSON.parse(auth).filePath);
        }
    }, [auth]);

    const logout = () => {
        localStorage.clear();
        navigate("/signup");
    }

    return (
        <motion.nav
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-red-600 shadow-lg fixed top-0 left-0 right-0 z-50"
        >
               {auth ? (
            <div className="container mx-auto px-4 py-2 mt-4">
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <motion.img
                            whileHover={{ scale: 1.1 }}
                            className="w-10 h-10 rounded-full object-cover mr-3"
                            src={image}
                            alt=""
                        />
                        <span className="text-white font-semibold">{auth ? JSON.parse(auth).name : 'Guest'}</span>
                    </div>
                    <div className="md:hidden">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white p-2 focus:outline-none">
                            <LuMenu size={24} />
                        </button>
                    </div>
                    <div className="hidden md:flex items-center space-x-4">
                        <Link to="/" className="text-white hover:text-gray-200">Products</Link>
                        <Link to="/add" className="text-white hover:text-gray-200">Add Products</Link>
                        <button onClick={logout} className="text-white hover:text-gray-200 flex items-center">
                            <LuLogOut className="mr-1" />Log out
                        </button>
                    </div>
                </div>
                {isMenuOpen && (
                    <div className="mt-2 py-2 bg-red-700 rounded-md">
                        <Link to="/" className="block text-white px-4 py-2 hover:bg-red-800">Products</Link>
                        <Link to="/add" className="block text-white px-4 py-2 hover:bg-red-800">Add Products</Link>
                        <button onClick={logout} className="w-full text-left text-white px-4 py-2 hover:bg-red-800 flex items-center">
                            <LuLogOut className="mr-1" />Log out
                        </button>
                    </div>
                )}
            </div>
               ) : (
                <ul className="flex justify-end space-x-4 mt-[1rem] mr-[4rem]">
                <li className="linkname"><Link to="/Login" className="text-white hover:text-gray-200 ">Login</Link></li>
                <li className="linkname"><Link to="/signup" className="text-white hover:text-gray-200 ">Signup</Link></li>
            </ul>
        )}
        </motion.nav>
    );
}

export default Nav;