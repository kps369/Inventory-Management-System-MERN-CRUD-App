import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
    const { token } = useContext(AuthContext);

    if (token === null) {
        // You can return a loading spinner here while the token is being checked in useEffect
        return <div>Loading...</div>;
    }

    return token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
