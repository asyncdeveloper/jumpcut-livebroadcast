function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

var broadcastId = getUrlParameter('id');
const user = localStorage.getItem('user') ? localStorage.getItem('user') : null;

if(broadcastId) {

    var enableRecordings = false;
    var connection = new RTCMultiConnection();

    connection.enableScalableBroadcast = true;
    connection.maxRelayLimitPerUser = 1;
    connection.autoCloseEntireSession = true;
    connection.socketURL = '/';
    connection.socketURL = 'https://rtcmulticonnection.herokuapp.com:443/';
    connection.socketMessageEvent = 'scalable-media-broadcast-demo';

    // user need to connect server, so that others can reach him.
    connection.connectSocket(function (socket) {
        socket.on('logs', function (log) {
            document.querySelector('h1').innerHTML = log.replace(/</g, '----').replace(/>/g, '___').replace(/----/g, '(<span style="color:red;">').replace(/___/g, '</span>)');
        });

        // this event is emitted when a broadcast is already created.
        socket.on('join-broadcaster', function (hintsToJoinBroadcast) {
            console.log('join-broadcaster', hintsToJoinBroadcast);
            connection.session = hintsToJoinBroadcast.typeOfStreams;
            connection.sdpConstraints.mandatory = {
                OfferToReceiveVideo: !!connection.session.video,
                OfferToReceiveAudio: !!connection.session.audio
            };
            connection.broadcastId = hintsToJoinBroadcast.broadcastId;
            connection.join(hintsToJoinBroadcast.userid);
        });
        socket.on('rejoin-broadcast', function (broadcastId) {
            connection.attachStreams = [];
            socket.emit('check-broadcast-presence', broadcastId, function (isBroadcastExists) {
                if (!isBroadcastExists) {
                    // the first person (i.e. real-broadcaster) MUST set his user-id
                    connection.userid = broadcastId;
                }
                socket.emit('join-broadcast', {
                    broadcastId: broadcastId,
                    userid: connection.userid,
                    typeOfStreams: connection.session
                });
            });
        });
        socket.on('broadcast-stopped', function (broadcastId) {
            console.error('broadcast-stopped', broadcastId);
            alert('This broadcast has been stopped.');
        });

        socket.on('start-broadcasting', function (typeOfStreams) {
            console.log('start-broadcasting', typeOfStreams);
            connection.sdpConstraints.mandatory = {
                OfferToReceiveVideo: false,
                OfferToReceiveAudio: false
            };
            connection.session = typeOfStreams;
            connection.open(connection.userid);
        });
    });

    var videoPreview = document.getElementById('video-preview');
    connection.onstream = function (event) {
        if (connection.isInitiator && event.type !== 'local') {
            return;
        }
        connection.isUpperUserLeft = false;
        videoPreview.srcObject = event.stream;
        videoPreview.play();
        videoPreview.userid = event.userid;
        if (event.type === 'local') {
            videoPreview.muted = true;
        }
        if (connection.isInitiator == false && event.type === 'remote') {
            // he is merely relaying the media
            connection.dontCaptureUserMedia = true;
            connection.attachStreams = [event.stream];
            connection.sdpConstraints.mandatory = {
                OfferToReceiveAudio: false,
                OfferToReceiveVideo: false
            };
            connection.getSocket(function (socket) {
                socket.emit('can-relay-broadcast');
                if (connection.DetectRTC.browser.name === 'Chrome') {
                    connection.getAllParticipants().forEach(function (p) {
                        if (p + '' != event.userid + '') {
                            var peer = connection.peers[p].peer;
                            peer.getLocalStreams().forEach(function (localStream) {
                                peer.removeStream(localStream);
                            });
                            event.stream.getTracks().forEach(function (track) {
                                peer.addTrack(track, event.stream);
                            });
                            connection.dontAttachStream = true;
                            connection.renegotiate(p);
                            connection.dontAttachStream = false;
                        }
                    });
                }
                if (connection.DetectRTC.browser.name === 'Firefox') {
                    // Firefox is NOT supporting removeStream method
                    // that's why using alternative hack.
                    // NOTE: Firefox seems unable to replace-tracks of the remote-media-stream
                    // need to ask all deeper nodes to rejoin
                    connection.getAllParticipants().forEach(function (p) {
                        if (p + '' != event.userid + '') {
                            connection.replaceTrack(event.stream, p);
                        }
                    });
                }
                // Firefox seems UN_ABLE to record remote MediaStream
                // WebAudio solution merely records audio
                // so recording is skipped for Firefox.
                if (connection.DetectRTC.browser.name === 'Chrome') {
                    repeatedlyRecordStream(event.stream);
                }
            });
        }
        // to keep room-id in cache
        localStorage.setItem(connection.socketMessageEvent, connection.sessionid);
    };
    connection.extra.broadcastId = broadcastId;
    connection.session = { audio: true,  video: true, oneway: true };
    connection.getSocket(function (socket) {
        socket.emit('check-broadcast-presence', broadcastId, function (isBroadcastExists) {
            if(isBroadcastExists) {
                //Already exists
                socket.emit('join-broadcast', {
                    broadcastId: broadcastId,
                    userid: connection.userid,
                    typeOfStreams: connection.session
                });
            }else {
                //New Broadcast
                if(user!== null ){
                    // the first person (i.e. real-broadcaster) MUST set his user-id
                    connection.userid = broadcastId;
                    console.log('check-broadcast-presence', broadcastId, isBroadcastExists);
                    socket.emit('join-broadcast', {
                        broadcastId: broadcastId,
                        userid: connection.userid,
                        typeOfStreams: connection.session
                    });
                }
                else {
                    alert('Broadcast not found');
                }
            }
        });
    });

    connection.onstreamended = function () {
    };
    connection.onleave = function (event) {
        if (event.userid !== videoPreview.userid) return;
        connection.getSocket(function (socket) {
            socket.emit('can-not-relay-broadcast');
            connection.isUpperUserLeft = true;
            if (allRecordedBlobs.length) {
                // playing lats recorded blob
                var lastBlob = allRecordedBlobs[allRecordedBlobs.length - 1];
                videoPreview.src = URL.createObjectURL(lastBlob);
                videoPreview.play();
                allRecordedBlobs = [];
            } else if (connection.currentRecorder) {
                var recorder = connection.currentRecorder;
                connection.currentRecorder = null;
                recorder.stopRecording(function () {
                    if (!connection.isUpperUserLeft) return;
                    videoPreview.src = URL.createObjectURL(recorder.getBlob());
                    videoPreview.play();
                });
            }
            if (connection.currentRecorder) {
                connection.currentRecorder.stopRecording();
                connection.currentRecorder = null;
            }
        });
    };
    var allRecordedBlobs = [];

    function repeatedlyRecordStream(stream) {
        if (!enableRecordings) {
            return;
        }
        connection.currentRecorder = RecordRTC(stream, {
            type: 'video'
        });
        connection.currentRecorder.startRecording();
        setTimeout(function () {
            if (connection.isUpperUserLeft || !connection.currentRecorder) {
                return;
            }
            connection.currentRecorder.stopRecording(function () {
                allRecordedBlobs.push(connection.currentRecorder.getBlob());
                if (connection.isUpperUserLeft) {
                    return;
                }
                connection.currentRecorder = null;
                repeatedlyRecordStream(stream);
            });
        }, 30 * 1000); // 30-seconds
    }

    // below section detects how many users are viewing your broadcast
    connection.onNumberOfBroadcastViewersUpdated = function (event) {
        if (!connection.isInitiator) return;
        document.getElementById('broadcast-viewers-counter').innerHTML = 'Number of broadcast viewers: <b>' + event.numberOfBroadcastViewers + '</b>';
    };
}