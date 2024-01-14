import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useSendLogoutMutation } from '../features/auth/authApiSlice';

const Header = () => {
    const navigate = useNavigate();
    const [sendLogout, { isLoading, isSuccess, isError, error }] = useSendLogoutMutation();

    useEffect(() => {
        if (isSuccess) navigate('/');
    }, [isSuccess, navigate]);

    const handleLogout = () => {
        sendLogout();
        navigate('/');
    }

    if (isLoading) return <p>Logging Out...</p>

    if (isError) return <p>Unable to Logout: {error.data?.message}</p>

    return (
        <header>
            <motion.button
                className="mr-20 fixed right-10 text-white bg-gradient-to-b from-red-500 via-red-300 to-red-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                <Link to="/portal">Back to Portal Home</Link>
            </motion.button>

            <motion.button
                className="ml-20 fixed right-4 text-white bg-gradient-to-b from-red-500 via-red-300 to-red-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleLogout}
            >
                <Link to="/">Log Out</Link>
            </motion.button>
        </header>
    );
};

export default Header;
