import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../Card/AuthContext';

interface PrivateRouteProps {
    children?: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
    const { isLoggedIn } = useAuth();

    if (!isLoggedIn) {
        return <Navigate to="/DangNhap" replace />;
    }

    return children ? <>{children}</> : <Outlet />;
};

export default PrivateRoute;
