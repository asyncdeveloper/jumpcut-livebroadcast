import React from 'react';
import { Link } from "react-router-dom";

const BroadcastList = ({ broadcasts }) => {

    return (
        <div className="broadcast-list">
            { broadcasts.map(broadcast => {
                    return (
                        <div className="col s12 m6" key={broadcast.broadcastId}>
                            <div className="card blue-grey darken-1">
                                <div className="card-content white-text">
                                    <span className="card-title">{broadcast.title}</span>
                                    <p>Broadcasing by {broadcast.user.name}</p>
                                </div>
                                <div className="card-action">
                                    <Link to={`/broadcast/${broadcast.title}?id=${broadcast.broadcastId}`}>
                                        Start Watching
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
};

export default BroadcastList