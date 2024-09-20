
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Addproduct = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [company, setCompany] = useState('');
    const [error, setError] = useState(false);
    const [photo,setPhoto] = useState();
    const navigate = useNavigate();
    const formData  = new FormData();
    const userId = JSON.parse(localStorage.getItem('user'))._id;
    formData.append('name',name);
    formData.append('price',price);
    formData.append('category',category);
    formData.append('company',company);
    formData.append('photo',photo);
    formData.append('userId',userId)

    const addProduct = async () => {
        if (!name || !price || !category || !company) {
            setError(true);
            return false;
        }
    
        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('category', category);
        formData.append('company', company);
        formData.append('productImage', photo);
        formData.append('userId', userId);
    
        let result = await fetch('https://dashboard-backend-7dt4.onrender.com/add-product', {
            method: 'POST',
            body: formData,
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
    
        result = await result.json();
        console.log(result);
        navigate('/');
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 py-12">
            <motion.div 
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white p-8 rounded-lg shadow-2xl w-96"
            >
                <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">Add Product</h1>
                <div className="mb-4">
                    <motion.input 
                        whileFocus={{ scale: 1.05 }}
                        className="w-full px-4 py-2 text-gray-700 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter product name"
                    />
                    {error && !name && <span className="text-red-500 text-sm">Enter valid name</span>}
                </div>
                <div className="mb-4">
                    <motion.input 
                        whileFocus={{ scale: 1.05 }}
                        className="w-full px-4 py-2 text-gray-700 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        type="text"
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="Enter product price"
                    />
                    {error && !price && <span className="text-red-500 text-sm">Enter valid price</span>}
                </div>
                <div className="mb-4">
                    <motion.input 
                        whileFocus={{ scale: 1.05 }}
                        className="w-full px-4 py-2 text-gray-700 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        type="text"
                        onChange={(e) => setCategory(e.target.value)}
                        placeholder="Enter product category"
                    />
                    {error && !category && <span className="text-red-500 text-sm">Enter valid category</span>}
                </div>
                <div className="mb-6">
                    <motion.input 
                        whileFocus={{ scale: 1.05 }}
                        className="w-full px-4 py-2 text-gray-700 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        type="text"
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="Enter product company"
                    />
                    {error && !company && <span className="text-red-500 text-sm">Enter valid company name</span>}
                </div>
                <div className="mb-6">
                    <motion.input 
                        whileFocus={{ scale: 1.05 }}
                        className="w-full px-4 py-2 text-gray-700 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        type="file"
                        onChange={(e) => setPhoto(e.target.files[0])}
                        placeholder="Enter product image"
                    />
                    {error && !company && <span className="text-red-500 text-sm">Enter valid company name</span>}
                </div>
                <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full py-2 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-md shadow-md hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
                    onClick={addProduct}
                >
                    Add Product
                </motion.button>
            </motion.div>
        </div>
    );
}

export default Addproduct;
