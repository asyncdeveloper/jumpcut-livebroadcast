import React, { Component } from 'react';
import { connect } from 'react-redux'
import { signIn } from '../store/actions/authActions';
import { Redirect } from "react-router-dom";

export class SignIn extends Component {

    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
        };
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        this.props.signIn(this.state);
    };

    render() {
        const { auth, authError } = this.props;

        //Redirect if user is logged in
        if (auth)
            if (auth.id || auth.uid)
                return <Redirect to='/' />;

        return (
            <div className="container">
                <form onSubmit={this.handleSubmit}>
                    <h5 className="text-darken-6">Sign In</h5>
                    <div className="input-field">
                        <label htmlFor="email">Email</label>
                        <input type="email" id='email' onChange={this.handleChange} required />
                    </div>
                    <div className="input-field">
                        <label htmlFor="password">Password</label>
                        <input type="password" id='password' onChange={this.handleChange} required />
                    </div>
                    <div className="input-field">
                        <button className="btn blue">Login</button>
                        <div className="center red-text">
                            { authError ? <p>{authError}</p> : null }
                        </div>
                    </div>
                </form>
            </div>
        )
    }

}
const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        authError: state.auth.authError
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (credentials) => dispatch(signIn(credentials))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)