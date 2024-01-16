import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useSendLogoutMutation } from '../features/auth/authApiSlice';
import { FiHome, FiLogOut } from 'react-icons/fi';

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
                className="mr-10 fixed right-10 text-white bg-gradient-to-b from-blue-500 via-blue-450 to-blue-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                <Link to="/portal">
                    <motion.div whileHover={{ scale: 1.5 }} whileTap={{ scale: 1.5 }}>
                        <FiHome />
                    </motion.div>
                </Link>
            </motion.button>

            <motion.button
                className="ml-20 fixed right-4 text-white bg-gradient-to-b from-blue-500 via-blue-450 to-blue-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleLogout}
            >
                <Link to="/">
                    <motion.div whileHover={{ scale: 1.5 }} whileTap={{ scale: 1.5 }}>
                        <FiLogOut />
                    </motion.div>
                </Link>
            </motion.button>
        </header>
    );
};

export default Header;