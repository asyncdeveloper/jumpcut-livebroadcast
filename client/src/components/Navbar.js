import React from 'react'
import { Link } from 'react-router-dom'
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'
import { connect } from 'react-redux'

export const Navbar = (props) => {
    const { auth } = props;
    const links = auth.uid ? <SignedInLinks profile={auth}/> : <SignedOutLinks/>;

    return (
        <nav className="nav-wrapper grey darken-3">
            <div className="container">
                <div className="left">
                    <Link to='/' className="brand-logo">Jump Cut Live Broad</Link>
                </div>
                {links}
            </div>
        </nav>
    )
};

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
};

export default connect(mapStateToProps)(Navbar)
