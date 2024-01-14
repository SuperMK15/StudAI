import { useState } from 'react';
import { useGetQueriesQuery } from '../features/queries/queriesApiSlice';
import useAuth from '../hooks/useAuth';
import SingleQuery from './SingleQuery';
import StarBG from './StarBG';

const Portal = () => {
    const { id, username } = useAuth();

    const { data: queries, isLoading, isSuccess, isError, error } = useGetQueriesQuery(undefined, {
        pollingInterval: 60000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true,
    });

    const [searchQuery, setSearchQuery] = useState('');

    let content;

    if (isLoading) content = <p>Loading...</p>;

    if (isError) content = <p>{error.error}</p>;

    if (isSuccess) {
        const { ids } = queries;

        const tableContent = ids?.map(queryId => <SingleQuery key={queryId} queryId={queryId} userId={id} searchQuery={searchQuery} />);

        content = (
            <div >
                <StarBG/>
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
                        <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mt-4"> New Query </button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full table-auto border w-full border-gray-700">
                            <thead className='bg-gray-800'>
                                <tr>
                                    <th className="border p-4 text-white text-xl">Title</th>
                                    <th className="border p-4 text-white text-xl">Notes Input</th>
                                    <th className="border p-4 text-white text-xl">Stud.AI Ouput</th>
                                    <th className="border p-4 text-white text-xl">View</th>
                                </tr>
                            </thead>
                            <tbody className='text-white bg-gray-700'>{tableContent}</tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }

    return content;
};

export default Portal;