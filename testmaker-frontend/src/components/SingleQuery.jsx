import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectQueryById } from '../features/queries/queriesApiSlice'
import { motion } from 'framer-motion'
import { useDeleteQueryMutation } from '../features/queries/queriesApiSlice'

import { RiDeleteBinLine } from 'react-icons/ri'

const truncateText = (text, limit) => {
    if (text.length > limit) {
        return text.substring(0, limit) + "..."; // Truncate text and add ellipsis
    }
    return text;
};

const SingleQuery = ({ queryId, userId, searchQuery, foundNumber, setFoundNumber }) => {
    const query = useSelector((state) => selectQueryById(state, queryId));
    const navigate = useNavigate();

    const [deleteQuery, { isLoading, isSuccess, isError, error }] = useDeleteQueryMutation();

    const handleDelete = async (e) => {
        e.preventDefault();

        const confirmDelete = window.confirm("Are you sure you want to delete this query? Action cannot be undone.");

        if (confirmDelete) {
            await deleteQuery({ id: queryId });
            navigate("/portal");
        }
    }

    if (query) {
        if (searchQuery !== "") {
            if (!query.title.toLowerCase().includes(searchQuery.toLowerCase())
                && !query.lecture_note_input.toLowerCase().includes(searchQuery.toLowerCase())
                && !query.test_output.toLowerCase().includes(searchQuery.toLowerCase())) {
                return null;
            }
        }

        console.log(userId, query.user_id);
        if (userId !== query.user_id) return null;

        return (
            <tr>
                <td className="border p-4 font-roboto text-center">{query.title}</td>
                <td className="border p-4 font-roboto">{truncateText(query.lecture_note_input, 100)}</td>
                <td className="border p-4 font-roboto">{truncateText(query.test_output, 100)}</td>
                <td className="border p-4">
                    <motion.button
                        className="w-full text-white bg-gradient-to-b from-yellow-500 via-yellow-300 to-yellow-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => navigate(`/portal/view-query/${queryId}`)}
                    >
                        View
                    </motion.button>
                </td>
                <td className="border p-4">
                    <motion.button
                        className="w-full flex items-center justify-center text-white bg-gradient-to-b from-red-500 via-red-300 to-red-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handleDelete}
                    >
                        <div>
                            <RiDeleteBinLine />
                        </div>
                    </motion.button>
                </td>
            </tr>
        )
    } else return null;
}

export default SingleQuery