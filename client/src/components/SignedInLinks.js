import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../store/actions/authActions'

const SignedInLinks = (props) => {
    return (
        <div>
            <ul className="right">
                <li>
                    <NavLink to='/golive'>Create Live</NavLink>
                </li>
                <li>
                    <a href="#" onClick={props.signOut}>Log Out</a>
                </li>
                <li>
                    <div>
                        {props.profile.email}
                    </div>
                </li>
            </ul>
        </div>
    )
};

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    }
};

export default connect(null, mapDispatchToProps)(SignedInLinks)
