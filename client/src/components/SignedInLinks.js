import React from 'react'
import { NavLink, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../store/actions/authActions'

const SignedInLinks = (props) => {
    return (
        <ul id="nav-mobile" className="right">
                <li><NavLink to='/broadcast'>Broadcast</NavLink> </li>
                <li>
                    <a id="logout-button" onClick={ () => {
                            props.signOut();
                            return <Redirect to="/" />;
                       }}
                    >Log Out</a>
                </li>
                <li>
                    <NavLink to='/' className="btn btn-floating pink lighten-2">
                         {props.profile.initials}
                    </NavLink>
                </li>
            </ul>
    )
};

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    }
};

export default connect(null, mapDispatchToProps)(SignedInLinks)
