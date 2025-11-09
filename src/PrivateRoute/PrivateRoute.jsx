import React, { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { Navigate } from 'react-router';

const PrivateRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext)

    if(loading){
      return <p>Loading....</p>
    }
    
    if(user){
       return children;
    }
    return <Navigate to='/login'></Navigate>
};

export default PrivateRoute;