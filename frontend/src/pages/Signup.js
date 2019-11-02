import React, {Component} from 'react';
import {graphql} from 'react-apollo';
import {Link} from 'react-router-dom';
import {createUser} from '../queries/Queries';
import './Auth.css';

class Signup extends Component {
    state = {
        email: '',
        password: '',
        userId: '',
    };

    handleChange = e => {
        this.setState({
            [e.target.id]: e.target.value,
        });
    };

    handleSubmit = async e => {
        e.preventDefault();
        try {
            const user = await this.props.createUser({
                variables: {
                    email: this.state.email,
                    password: this.state.password,
                },
            });
            this.setState({
                userId: user.data.createUser._id,
            });
            this.props.history.push('/login');
        } catch (err) {
            this.setState({
                error: 'Username or password is invalid, please try again!',
                err,
            });
        }
    };
    render() {
        const {error, userId} = this.state;
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
                    <Link to='/login'>
                        <button type='button'>Switch to Login</button>
                    </Link>
                </div>
                <div>{error && error}</div>
                <div>{userId}</div>
            </form>
        );
    }
}

//bind loginuser to the componenet. It is stored in props
export default graphql(createUser, {name: 'createUser'})(Signup);
