import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface PrivateRouteProps {
    children?: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
    const maKH = localStorage.getItem('maKH');
    console.log(maKH);
        if (!maKH) {
            return <Navigate to="/DangNhap" replace />;
        }

    return children ? <>{children}</> : <Outlet />;
};

export default PrivateRoute;
