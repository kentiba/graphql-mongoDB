import React, {useContext} from 'react';
import {AuthContext} from '../context/auth-context';
import {Route, Redirect} from 'react-router-dom';

const PrivateRoute = ({component: Component, auth, ...rest}) => {
    const {token} = useContext(AuthContext);
    return (
        <Route
            {...rest}
            render={props =>
                token ? <Component {...props} /> : <Redirect to='/login' />
            }
        />
    );
};

export default PrivateRoute;
