import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import './App.css';

const UpdateProduct = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [company, setCompany] = useState('');
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getProductDetails();
    }, []);

    const getProductDetails = async () => {
        let result = await fetch(`https://dashboard-backend-7dt4.onrender.com/product/${params.id}`);
        result = await result.json();
        setName(result.name);
        setPrice(result.price);
        setCompany(result.company);
        setCategory(result.category);
    }

    const updateProduct = async () => {
        let result = await fetch(`http://localhost:5000/product/${params.id}`, {
            method: 'put',
            body: JSON.stringify({ name, price, category, company }),
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`,
                'Content-Type': 'application/json'
            }
        });
        result = await result.json();
        console.log(result);
        navigate('/');
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 via-teal-500 to-blue-500 py-12">
            <motion.div 
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white p-8 rounded-lg shadow-2xl w-96"
            >
                <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">Update Product</h1>
                <motion.input 
                    whileFocus={{ scale: 1.05 }}
                    className="w-full px-4 py-2 mb-4 text-gray-700 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600"
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    placeholder="Enter product name"
                />
                <motion.input 
                    whileFocus={{ scale: 1.05 }}
                    className="w-full px-4 py-2 mb-4 text-gray-700 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600"
                    type="text"
                    onChange={(e) => setPrice(e.target.value)}
                    value={price}
                    placeholder="Enter product price"
                />
                <motion.input 
                    whileFocus={{ scale: 1.05 }}
                    className="w-full px-4 py-2 mb-4 text-gray-700 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600"
                    type="text"
                    onChange={(e) => setCategory(e.target.value)}
                    value={category}
                    placeholder="Enter product category"
                />
                <motion.input 
                    whileFocus={{ scale: 1.05 }}
                    className="w-full px-4 py-2 mb-6 text-gray-700 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600"
                    type="text"
                    onChange={(e) => setCompany(e.target.value)}
                    value={company}
                    placeholder="Enter product company"
                />
                <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full py-2 px-4 bg-gradient-to-r from-teal-600 to-blue-600 text-white font-semibold rounded-md shadow-md hover:from-teal-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-opacity-50"
                    onClick={updateProduct}
                >
                    Update Product
                </motion.button>
            </motion.div>
        </div>
    );
}

export default UpdateProduct;