import React from 'react';
import { Navigate } from 'react-router-dom';

const AuthRoute = ({ children }) => {
    const token = localStorage.getItem('token');

    if (!token) {
        // User not logged in, redirect to landing page
        return <Navigate to="/" />;
    }

    return children;
};
