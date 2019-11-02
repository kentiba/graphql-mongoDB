import React, {Component} from 'react';

export const AuthContext = React.createContext();

class AuthContextProvider extends Component {
    state = {
        token: null,
        userId: null,
    };

    componentDidMount() {
        this.setState({
            userId: JSON.stringify(localStorage.getItem('user')) || null,
            token: JSON.stringify(localStorage.getItem('token')) || null,
        });
    }

    login = ({userId, token}) => {
        this.setState({userId, token});
        //persist data to LocalStorage
        localStorage.setItem('token', token);
        localStorage.setItem('user', userId);
    };
    logout = () => {
        this.setState({token: null, userId: null});
        //remove data from LocalStorage
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    };
    render() {
        return (
            <AuthContext.Provider
                value={{...this.state, login: this.login, logout: this.logout}}
            >
                {this.props.children}
            </AuthContext.Provider>
        );
    }
}

export default AuthContextProvider;
