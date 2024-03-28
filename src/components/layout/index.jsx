
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import Create from '../create';
const Layout = () => {
    const user = useSelector((state) => state.auth);
    const location = useLocation();
    console.log(user,";;;;;;;;;;")
    if (!user?.isLoggedIn) {
        return <Navigate to="/" replace />;
    }
    return (
        location.pathname === '/' ? <Create /> : <Outlet />
    )
}

export default Layout
