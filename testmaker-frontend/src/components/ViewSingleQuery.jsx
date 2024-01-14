import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import CoHere from './CoHere';

import { useSelector } from 'react-redux';
import { useGetQueriesQuery } from '../features/queries/queriesApiSlice';
import { selectQueryById } from '../features/queries/queriesApiSlice';

const ViewSingleQuery = () => {
    const { data: queries, isLoading, isSuccess, isError, error } = useGetQueriesQuery(undefined, {
        pollingInterval: 60000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true,
    });

    useEffect(() => {
        const fetchQueries = async () => {
            await queries.refetch();
        };

        if (!isLoading && !isSuccess) {
            fetchQueries();
        }
    }, []);

    const { id } = useParams();
    const query = useSelector((state) => selectQueryById(state, id));

    if (isLoading) return <p>Loading...</p>;

    return (
        <div className="relative h-screen">
            <div className="absolute inset-0 bg-gradient-to-b from-teal-500 via-teal-400 to-blue-500 h-full"></div>
            <div className="absolute inset-0 bg-black opacity-25"></div>
            <section className="absolute inset-0 flex items-center justify-center">
                <div className="flex flex-col items-center justify-center px-6 py-8 w-3/4 md:h-screen lg:py-0 relative">
                    <Link to="/" className="flex items-center mb-8 text-7xl font-semibold text-gray-900 dark:text-white">
                        <img className="w-16 h-16 mr-2" src="/logo.svg" alt="logo" />
                        Stud<span style={{ color: "#FF7D7D" }}>.AI</span>
                    </Link>
                    <div className="w-full bg-white rounded-3xl shadow dark:border md:p-12 sm:p-10 xl:px-20 xl:py-16 dark:bg-gray-800 dark:border-gray-700">
                        <div className="w-full space-y-6">
                            <h1 className="text-center text-xl font-bold leading-tight text-gray-900 md:text-2xl dark:text-white">
                                Title: {query.title}
                            </h1>
                            <div className="w-full">
                                <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Input Notes
                                </label>
                                <textarea readOnly
                                    name="input"
                                    id="input"
                                    placeholder="Input"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    rows="4" // Adjust the number of rows as needed
                                    required=""
                                    value={query.lecture_note_input}
                                ></textarea>
                            </div>
                            <div className="w-full">
                                <label htmlFor="prompt" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Generated Test
                                </label>
                                <textarea readOnly
                                    name="output"
                                    id="output"
                                    placeholder="Output"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    rows="6" // Adjust the number of rows as needed
                                    required=""
                                    value={query.test_output}
                                ></textarea>
                            </div>
                            <motion.button
                                className="w-full text-white bg-gradient-to-r from-pink-500 to-teal-500 hover:to-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-bold rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                Send Prompt
                            </motion.button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ViewSingleQuery;
