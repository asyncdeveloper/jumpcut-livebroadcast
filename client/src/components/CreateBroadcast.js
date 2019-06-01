import React, { Component } from 'react';
import { compose } from "redux";
import { connect } from "react-redux";
import { createBroadcast } from "../store/actions/broadcastActions";
import { Redirect } from "react-router-dom";

export class CreateBroadcast extends Component {

    constructor(props){
        super(props);
        this.state = {
            title: ''
        };
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    };

    handleSubmit = async (e) => {
        e.preventDefault();

        let title = this.state.title.replace(/\s+/g, '');
        let userId = this.props.auth.uid;

        let broadcastId = '';
        while(broadcastId.length<6) {
            broadcastId+= title[Math.floor(Math.random() * title.length)];
            broadcastId+= userId[Math.floor(Math.random() * userId.length)];
        }

        const broadcast = {
            'brocastId': broadcastId,
            'title' : title,
            'user': {
                'id': userId,
                'name': `${this.props.profile.firstName} ${this.props.profile.lastName}`
            }
        };

        this.props.createBroadcast(broadcast);
    };

    render() {
        const { auth , broadcastError } = this.props;

        if (!auth.uid)
            return <Redirect to='/signin'/>;

        return (
            <div className="container">
                <form className="white" onSubmit={this.handleSubmit}>
                    <h3 className="grey-text text-darken-3">Start a New Broadcast</h3>
                    <div className="input-field">
                        <input type="text" id='title' onChange={this.handleChange} required minLength="3" />
                        <label htmlFor="title">Title</label>
                    </div>
                    <div className="input-field">
                        <button className="btn pink lighten-1">Start Broadcast</button>
                        <div className="center red-text">
                            { broadcastError ? <p>{broadcastError}</p> : null }
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
        profile: state.firebase.profile,
        broadcastError: state.broadcast.broadcastError
    }
};

const mapDispatchToProps = dispatch => {
    return {
        createBroadcast: (broadcast) => dispatch(createBroadcast(broadcast))
    }
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(CreateBroadcast)
