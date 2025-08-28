import React, { useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const AuthCallback = () => {
    const { login } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const token = params.get('token');

        if (token) {
            login(token);
            navigate('/products');
        } else {
            // Handle error or no token case
            navigate('/login');
        }
    }, [location, login, navigate]);

    return (
        <div>
            <p>Loading...</p>
        </div>
    );
};

export default AuthCallback;
