import constants from '../../config/constants';
import firebase from '../../config/firebase';

export const BROADCAST_CREATE_SUCCESS = 'BROADCAST_CREATE_SUCCESS';
export const BROADCAST_CREATE_FAILURE = 'BROADCAST_CREATE_FAILURE';
export const END_BROADCAST_SUCCESS = 'END_BROADCAST_SUCCESS';
export const END_BROADCAST_FAILURE = 'END_BROADCAST_FAILURE';

export const createBroadcast = (broadcast) => {
    return async (dispatch) => {
        try {
            await firebase.firestore().collection(constants.REF_COLLECTION_BROADCAST).add({
                ...broadcast,
                createdAt: new Date()
            });
            dispatch({type: BROADCAST_CREATE_SUCCESS});
        }catch(error) {
            dispatch({type: BROADCAST_CREATE_FAILURE, error});
        }
    }
};

export const endBroadcast = (broadcastId) => {
    return async (dispatch) => {
        try {
            await firebase.firestore()
                .collection(constants.REF_COLLECTION_BROADCAST)
                .doc(broadcastId)
                .update({ isEnded: true });
            dispatch({type: END_BROADCAST_SUCCESS});
        }catch(error) {
            dispatch({type: END_BROADCAST_FAILURE, error});
        }
    }
};