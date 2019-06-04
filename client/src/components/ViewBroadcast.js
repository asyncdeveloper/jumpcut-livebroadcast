import React, { Component } from 'react';
import Script from 'react-load-script';
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect, isEmpty, isLoaded } from "react-redux-firebase";
import { endBroadcast } from "../store/actions/broadcastActions";

export class ViewBroadcast extends Component {

    static getUrlParameter(name) {
        name = name.replace(/[[]/, '[').replace(/[\]]/, ']');
        const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        const results = regex.exec(window.location.search);
        return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };

    loadScript(url, callback) {
        let script = document.createElement("script");
        script.type = "text/javascript";
        script.async = true;
        script.defer = true;

        if (script.readyState) {  //IE
            script.onreadystatechange = function(){
                if (script.readyState === "loaded" || script.readyState === "complete"){
                    script.onreadystatechange = null;
                    callback();
                }
            };
        } else {  //Others
            script.onload = function(){
                callback();
            };
        }
        script.src = url;
        document.getElementsByTagName("body")[0].appendChild(script);
    }

    handleEndBroadcast = async () => {
        await this.props.endBroadcast(this.props.broadcast[0].id);

        if(this.props.broadcastError === null) {
            localStorage.removeItem('user');
            localStorage.removeItem('broadcastId');
            this.props.history.push({ pathname: '/' });
        }
    };

    render() {
        const { auth, broadcast, broadcastError } = this.props;

        if(isLoaded(broadcast)) {
            return  (
                <div className="container">
                    { isEmpty(broadcast)
                        ? 'Broadcast not found'
                        : <div className="broadcast-container">
                            <h1 id="log-info">Broadcast Starting....</h1>
                            <section className="make-center start-broadcast">
                                <div className="make-center">
                                    <p className="make-center" id="broadcast-viewers-counter" />
                                </div>
                                <video id="video-preview" controls loop />
                            </section>
                            { broadcast[0].user.id === auth.uid
                                ? <section className="make-center col end-broadcast">
                                    <br />
                                    <a id="logout-button" href="#" onClick={this.handleEndBroadcast}>End Broadcast</a>
                                </section>
                                : null
                            }
                            { this.loadScript('https://rtcmulticonnection.herokuapp.com/dist/RTCMultiConnection.min.js',() => {
                                this.loadScript(`${window.location.origin}/custom.js`,() => {})
                            })}
                            <Script url="https://rtcmulticonnection.herokuapp.com/node_modules/webrtc-adapter/out/adapter.js"/>
                            <Script url="https://rtcmulticonnection.herokuapp.com/socket.io/socket.io.js" />
                            <div className="center red-text">
                                { broadcastError ? <p>{broadcastError}</p> : null }
                            </div>
                        </div>
                    }
                </div>
            )
        } else {
            return ('Loading');
        }
    }
}

const mapStateToProps = (state) => {
    return {
        broadcast: state.firestore.ordered.broadcast,
        auth: state.firebase.auth,
        broadcastError:state.broadcast.broadcastError
    }
};

const mapDispatchToProps = dispatch => {
    return {
        endBroadcast: (broadcastId) => dispatch(endBroadcast(broadcastId))
    }
};

export default compose(connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect(() => {
        const broadcastId =  ViewBroadcast.getUrlParameter('id');
        return [ {
            collection: 'broadcasts',
            storeAs: 'broadcast',
            limit: 1,
            where: [
                ['broadcastId', '==', broadcastId],
                ['isEnded', '==', false],
            ]
        } ];
    })
)(ViewBroadcast);