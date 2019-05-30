import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';

export class Home extends Component {

    render() {
        const { auth } = this.props;
        if (!auth.uid)
            return <Redirect to='/signin'/>;

        return (
            <div className="home container">
                <div className="row">
                   Home
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
    }
};

export default compose(connect(mapStateToProps))(Home)
