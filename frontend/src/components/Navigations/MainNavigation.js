import React, {useContext} from 'react';
import {NavLink} from 'react-router-dom';
import {AuthContext} from '../../context/auth-context';
import './MainNavigation.css';

const MainNavigation = props => {
    const {token, logout} = useContext(AuthContext);

    const routes = (
        <React.Fragment>
            {token ? (
                <React.Fragment>
                    <li>
                        <NavLink to='/bookings'>Bookings</NavLink>
                    </li>

                    <li onClick={logout}>
                        <NavLink to='/login'>Logout</NavLink>
                    </li>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <li>
                        <NavLink to='/login'>Login</NavLink>
                    </li>
                    <li>
                        <NavLink to='/signup'>Signup</NavLink>
                    </li>
                </React.Fragment>
            )}
        </React.Fragment>
    );
    return (
        <header className='main-navigation'>
            <div className='main-navigation__logo'>
                <h1>EasyEvent</h1>
            </div>
            <nav className='main-navigation__items'>
                <ul>
                    <li>
                        <NavLink to='/events'>Events</NavLink>
                    </li>
                    {routes}
                </ul>
            </nav>
        </header>
    );
};

export default MainNavigation;
