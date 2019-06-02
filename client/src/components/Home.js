import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect, isEmpty, isLoaded } from "react-redux-firebase";
import BroadcastList from "./BroadcastList";

export class Home extends Component {

    render() {
        const { broadcasts } = this.props;

        if(isLoaded(broadcasts)) {
            return  (
                <div className="home container">
                    Home
                    <div className="row">
                        {
                            isEmpty(broadcasts) ? 'No Broadcast Available'
                                : <div className="broadcast-list section col s12">
                                    <BroadcastList broadcasts={broadcasts} />
                                </div>
                        }
                    </div>
                </div>
            )
        } else {
            return ('Loading')
        }
    }
}

const mapStateToProps = (state) => {
    return {
        broadcasts: state.firestore.ordered.broadcasts,
        auth: state.firebase.auth,
    }
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {
            collection: 'broadcasts',
            where: [ 'isEnded', '==', false ],
            orderBy: [ 'createdAt', 'desc' ]
        }
    ])
)(Home)