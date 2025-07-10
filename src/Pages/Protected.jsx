import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const Protected = () => {
    const user = JSON.parse(localStorage.getItem('user'));

    console.log("Protected token: ", user)
    
    return (
        user ? <Outlet /> : <Navigate to="/login" />
    )
    
}

export default Protected
