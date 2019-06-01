import React, { Component } from 'react';
import Script from 'react-load-script';
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";

export class ViewBroadcast extends Component {

    static getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
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

    render() {
        const { auth, broadcasts } = this.props;

        if(broadcasts !== undefined) {

            if(broadcasts.length === 1) {
                if(broadcasts[0].isEnded){
                    return (
                        'Broadcast ended '
                    )
                }else {
                    return (
                        <div className="container">
                            <h1 />
                            <section className="make-center">
                                <div className="make-center">
                                    <input type="hidden" id="broadcast-id" value="" size="20" />
                                    <div className="make-center" id="broadcast-viewers-counter" />
                                </div>
                                <video id="video-preview" controls loop />
                            </section>
                            {
                                broadcasts[0].user.id === auth.uid
                                    ?
                                    <section className="make-center col">
                                        <br />
                                        <a>End Broadcast</a>
                                    </section>
                                    : null
                            }
                            <Script url="https://rtcmulticonnection.herokuapp.com/node_modules/webrtc-adapter/out/adapter.js"/>
                            <Script url="https://rtcmulticonnection.herokuapp.com/socket.io/socket.io.js" />
                            {
                                this.loadScript('https://rtcmulticonnection.herokuapp.com/dist/RTCMultiConnection.min.js',() => {
                                    this.loadScript(`${window.location.origin}/custom.js`,() => {})
                                })
                            }
                        </div>
                    );
                }
            } else {
                return ( 'Live Doesnt Exist');
            }
        }else {
            return ('Loading icon')
        }
    }
}

const mapStateToProps = (state) => {
    return {
        broadcast: state.firestore.ordered.broadcasts,
        auth: state.firebase.auth,
    }
};

export default compose(connect(mapStateToProps),
    firestoreConnect(() => {
        const broadcastId =  ViewBroadcast.getUrlParameter('id');
        if (broadcastId) {
            return [
                { collection: 'broadcasts', where:
                    [ 'broadcastId', '==', broadcastId ]
                }
            ]
        }
    }))(ViewBroadcast);