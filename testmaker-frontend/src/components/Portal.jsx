import { useState } from 'react';
import { useGetQueriesQuery } from '../features/queries/queriesApiSlice';
import useAuth from '../hooks/useAuth';
import SingleQuery from './SingleQuery';

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
            <>
                <h1>Welcome, {username}</h1>
                <br />
                <h2>Queries List</h2> <br />
                <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search Queries..."
                />
                <br /><br />
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Lecture Note Input</th>
                            <th>Test Output</th>
                        </tr>
                    </thead>
                    <tbody>{tableContent}</tbody>
                </table>
            </>
        );
    }

    return content;
};

export default Portal;