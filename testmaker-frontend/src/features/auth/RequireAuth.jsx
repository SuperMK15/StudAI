import { useLocation, Navigate, Outlet } from 'react-router-dom'
import useAuth from '../../hooks/useAuth';

const RequireAuth = () => {
    const location = useLocation();
    const { role } = useAuth();

    const content = (
        (role == 'verified')
            ? <Outlet />
            : <Navigate to="/" state={{ from: location }} replace />
    );

    return content;
}

export default RequireAuth