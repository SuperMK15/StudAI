import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectQueryById } from '../features/queries/queriesApiSlice'

const SingleQuery = ({ queryId, userId, searchQuery }) => {
    const query = useSelector((state) => selectQueryById(state, queryId));
    const navigate = useNavigate();

    if (query) {
        if (searchQuery !== "") {
            if (!query.title.toLowerCase().includes(searchQuery.toLowerCase())
                && !query.lecture_note_input.toLowerCase().includes(searchQuery.toLowerCase())
                && !query.test_output.toLowerCase().includes(searchQuery.toLowerCase())) {
                return null;
            }
        }

        if (toString(userId) !== toString(query.user_id)) return null;

        return (
            <tr>
                <td>{query.title}</td>
                <td>{query.lecture_note_input}</td>
                <td>{query.test_output}</td>
            </tr>
        )
    } else return null;
}

export default SingleQuery