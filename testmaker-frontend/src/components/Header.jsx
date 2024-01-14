import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const Header = () => {
    return (
        <header>
            <motion.button
                className="fixed right-4 text-white bg-gradient-to-b from-red-500 via-red-300 to-red-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                <Link to="/">Log Out</Link>
            </motion.button>
        </header>
    );
};

export default Header;
