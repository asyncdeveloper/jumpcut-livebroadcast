import React from 'react';
import { Link } from "react-router-dom";

const BroadcastList = ({ broadcasts }) => {

    return (
        <div className="broadcast-list col s12">
            { broadcasts.map(broadcast => {
                    return (
                        <Link to={`/broadcast/${broadcast.title}?id=${broadcast.broadcastId}`}
                              key={broadcast.id}>
                            <div className="card z-depth-0 broadcast-summary">
                                <div className="card-content grey-text text-darken-3">
                                    <span className="card-title ">{broadcast.title}</span>
                                    <p>Broadcasting by {broadcast.user.name}</p>
                                </div>
                            </div>
                        </Link>
                    )
                })
            }
        </div>
    )
};

export default BroadcastList