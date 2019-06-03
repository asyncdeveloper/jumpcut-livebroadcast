import React, { Component } from 'react';

class SignUp extends Component {

    constructor(props){
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
        };
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    };

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
        //TODO:: Save to Database
    };

    render() {
        return (
            <div className="container">
                <form onSubmit={this.handleSubmit}>
                    <h5 className="text-darken-6">Sign Up</h5>
                    <div className="input-field">
                        <label htmlFor="firstName">First Name</label>
                        <input type="text" id='firstName' onChange={this.handleChange} required />
                    </div>
                    <div className="input-field">
                        <label htmlFor="lastName">Last Name</label>
                        <input type="text" id='lastName' onChange={this.handleChange} required />
                    </div>
                    <div className="input-field">
                        <label htmlFor="email">Email</label>
                        <input type="email" id='email' onChange={this.handleChange} required />
                    </div>
                    <div className="input-field">
                        <label htmlFor="password">Password</label>
                        <input type="password" id='password' onChange={this.handleChange} required />
                    </div>
                    <div className="input-field">
                        <button className="btn blue">Register</button>
                    </div>
                </form>
            </div>
        )
    }

}

export default SignUp;