import React from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';
import Events from './pages/Events';
import Bookings from './pages/Bookings';
import Navbar from './components/Navigations/MainNavigation';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AuthContext from './context/auth-context';
import PrivateRoutes from './common/PrivateRoute';

import './App.css';

//apollo client setup
const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    // in order to send token with every request we do the following
    request: operation => {
        const token = localStorage.getItem('token');
        operation.setContext({
            headers: {
                authorization: token ? `Bearer ${token}` : '',
            },
        });
    },
});

function App() {
    return (
        <ApolloProvider client={client}>
            <BrowserRouter>
                <React.Fragment>
                    <AuthContext>
                        <Navbar />
                        <main className='main-content'>
                            <Switch>
                                <Redirect exact from='/' to='/login' />
                                <Route exact path='/login' component={Login} />
                                <Route
                                    exact
                                    path='/signup'
                                    component={Signup}
                                />
                                <Route
                                    exact
                                    path='/events'
                                    component={Events}
                                />
                                <PrivateRoutes
                                    exact
                                    path='/bookings'
                                    component={Bookings}
                                />
                            </Switch>
                        </main>
                    </AuthContext>
                </React.Fragment>
            </BrowserRouter>
        </ApolloProvider>
    );
}

export default App;
