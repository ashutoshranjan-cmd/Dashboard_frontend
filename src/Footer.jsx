import React from "react";
import { motion } from 'framer-motion';

const Footer = () => {
    return (
        <motion.footer 
            className="bg-gradient-to-r from-red-600 to-red-900 text-white py-6  "
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="container mx-auto text-center">
                <motion.h1 
                    className="text-2xl font-bold"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                >
                    Ecommerce Dashboard
                </motion.h1>
                <p className="mt-2 text-sm">© 2024 Your Company Name. All rights reserved.</p>
                <div className="mt-4">
                    <a href="#" className="text-purple-200 hover:text-white mx-2 transition duration-300">Privacy Policy</a>
                    <a href="#" className="text-purple-200 hover:text-white mx-2 transition duration-300">Terms of Service</a>
                    <a href="#" className="text-purple-200 hover:text-white mx-2 transition duration-300">Contact Us</a>
                </div>
            </div>
        </motion.footer>
    )
}

export default Footer;