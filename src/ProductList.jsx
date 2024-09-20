import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        let result = await fetch('https://dashboard-backend-7dt4.onrender.com/products', {
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        setProducts(result);
    }

    const deleteProduct = async (id) => {
        let result = await fetch(`https://dashboard-backend-7dt4.onrender.com/${id}`, {
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            },
            method: "Delete"
        });
        result = await result.json();
        if (result) {
            alert("Record is deleted");
            getProducts();
        }
    }

    const updateProduct = (id) => {
        navigate(`/update/${id}`);
    }
    
    const searchHandle = async (event) => {
        let key = event.target.value;
        if (key) {
            let result = await fetch(`https://dashboard-backend-7dt4.onrender.com/search/${key}`, {
                headers: {
                    authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            });
            result = await result.json();
            if (result) {
                setProducts(result);
            }
        } else {
            getProducts();
        }
    }

    return (
        <motion.div 
            className="container mx-auto p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <h1 className="text-3xl font-bold mb-6 text-center text-purple-600">E-commerce Dashboard</h1>
            <div className="mb-6">
                <input 
                    type="text" 
                    placeholder='Search product here...' 
                    onChange={searchHandle}
                    className="w-full p-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.length ? products.map((item, index) => (
                    <motion.div 
                        key={item._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
                    >
                        <div className="h-48 overflow-hidden">
                            <img 
                                src={item.filePath} 
                                alt={item.name} 
                                className="w-full h-full object-contain"
                            />
                        </div>
                        <div className="p-4 flex-grow">
                            <h2 className="text-lg font-semibold mb-2 truncate">{item.name}</h2>
                            <p className="text-gray-600 mb-1">Price: Rs {item.price}</p>
                            <p className="text-gray-600 mb-1">Category: {item.category}</p>
                            <p className="text-gray-600 mb-4">Company: {item.company}</p>
                        </div>
                        <div className="px-4 pb-4 mt-auto">
                            <div className="flex justify-between">
                                <button 
                                    onClick={() => deleteProduct(item._id)}
                                    className="bg-red-500 text-white px-3 py-1 rounded mr-2 hover:bg-red-600 transition duration-300"
                                >
                                    Delete
                                </button>
                                <button 
                                    onClick={() => updateProduct(item._id)}
                                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition duration-300"
                                >
                                    Update
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )) : (
                    <div className="col-span-full text-center text-gray-500 py-4">No results found</div>
                )}
            </div>
        </motion.div>
    )
}

export default ProductList;