import React from 'react'
import { Link } from 'react-router-dom'
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'
import { connect } from 'react-redux'

export const Navbar = (props) => {
    const { auth, profile } = props;
    const headerLinks = auth.uid ? <SignedInLinks profile={profile}/> : <SignedOutLinks/>;

    return (
        <div className="navbar-fixed">
            <nav className="nav-wrapper grey darken-3">
                <div className="nav-wrapper">
                    <Link to='/' className="brand-logo hide-on-med-and-down">Jump Cut Live Broad</Link>
                    {headerLinks}
                </div>
            </nav>
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
};

export default connect(mapStateToProps)(Navbar)
