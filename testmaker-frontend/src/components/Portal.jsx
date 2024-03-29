import { useState } from 'react';
import { useGetQueriesQuery } from '../features/queries/queriesApiSlice';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import useAuth from '../hooks/useAuth';
import SingleQuery from './SingleQuery';
import StarBG from './StarBG';
import Header from './Header';

const Portal = () => {
    const { id, username } = useAuth();

    const { data: queries, isLoading, isSuccess, isError, error } = useGetQueriesQuery(undefined, {
        pollingInterval: 60000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true,
    });

    const [searchQuery, setSearchQuery] = useState('');

    let content;

    if (isLoading) {
        content = (
            <div className='h-screen flex items-center justify-center'>
                <div role="status">
                    <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                    <span class="sr-only">Loading...</span>
                </div>
            </div>
        )
    }

    if (isError) content = <p>{error.error}</p>;

    if (isSuccess) {
        const { ids } = queries;
        const reversedIds = [...ids].reverse();

        const tableContent = reversedIds?.map(queryId => <SingleQuery key={queryId} queryId={queryId} userId={id} searchQuery={searchQuery} />);
        content = (
            <div >
                <StarBG />
                <div className="relative z-20"><Header /></div>
                <div className="w-3/4 mx-auto mt-8">
                    <h1 className="text-3xl font-extrabold mb-6 text-center text-white">Welcome, {username}</h1>
                    <div className="bg-gray-800 p-6 rounded-lg mb-8">
                        <h2 className="text-2xl font-bold mb-4 text-white">Queries List</h2>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search Queries..."
                            className="w-5/6 mr-10 5px border rounded-md p-3 focus:outline-none"
                        />
                        <motion.button whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mt-4">
                            <Link to="/portal/new-query"> New Query </Link>
                        </motion.button>
                    </div>
                    <div className="overflow-y-scroll max-h-96">
                        {true ?
                            (<table className="min-w-full table-auto border w-full border-gray-700">
                                <thead className='bg-gray-800'>
                                    <tr>
                                        <th className="border p-4 text-white text-xl">Title</th>
                                        <th className="border p-4 text-white text-xl">Notes Input</th>
                                        <th className="border p-4 text-white text-xl">Stud.AI Ouput</th>
                                        <th className="border p-4 text-white text-xl">View</th>
                                        <th className="border p-4 text-white text-xl">Delete</th>
                                    </tr>
                                </thead>
                                <tbody className='text-white bg-gray-700'>{tableContent}</tbody>
                            </table>) : <div className="bg-gray-800 p-4 rounded-lg"><p className="text-center text-white text-xl">No Queries Found. Please Get Started by Clicking "New Query!"</p></div>}
                    </div>
                </div>
            </div>
        );
    }

    return content;
};

export default Portal;