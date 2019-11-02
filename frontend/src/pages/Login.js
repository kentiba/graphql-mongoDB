import React, {Component} from 'react';
import {graphql} from 'react-apollo';
import {loginUser} from '../queries/Queries';
import {Link} from 'react-router-dom';
import {AuthContext} from '../context/auth-context';
import './Auth.css';

class Login extends Component {
    state = {
        email: '',
        password: '',
        error: '',
    };

    //access context
    static contextType = AuthContext;

    handleChange = e => {
        this.setState({
            [e.target.id]: e.target.value,
        });
    };

    handleSubmit = async e => {
        e.preventDefault();
        try {
            const user = await this.props.loginUser({
                variables: {
                    email: this.state.email,
                    password: this.state.password,
                },
            });
            this.context.login({
                userId: user.data.login.userId,
                token: user.data.login.token,
            });
            this.setState({error: ''});
            this.props.history.push('/events');
        } catch (err) {
            this.setState({
                error: 'Username or password is invalid, please try again!',
                err,
            });
        }
    };

    render() {
        // const {userId, token} = this.context;
        const {error} = this.state;
        return (
            <form className='auth-form' onSubmit={this.handleSubmit}>
                <div className='form-control'>
                    <label htmlFor='email'>Email</label>
                    <input
                        type='email'
                        id='email'
                        onChange={this.handleChange}
                    />
                </div>
                <div className='form-control'>
                    <label htmlFor='password'>Password</label>
                    <input
                        type='password'
                        id='password'
                        onChange={this.handleChange}
                    />
                </div>
                <div className='form-actions'>
                    <button type='submit'>Submit</button>
                    <Link to='/signup'>
                        <button type='button'>Switch to Signup</button>
                    </Link>
                </div>
                <div>{error && error}</div>
            </form>
        );
    }
}

//bind loginuser to the componenet. It is stored in props
export default graphql(loginUser, {name: 'loginUser'})(Login);
