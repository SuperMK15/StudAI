import { useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import { selectCurrentToken } from '../features/auth/authSlice';

const useAuth = () => {
    const token = useSelector(selectCurrentToken);

    if (token) {
        const decoded = jwtDecode(token);
        const { id, username } = decoded.UserInfo;

        return { id, username, role: 'verified'};
    }

    return { id: '', username: '', role: 'X'};
};

export default useAuth