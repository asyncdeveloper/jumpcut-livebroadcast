import constants from '../../config/constants';
import firebase from '../../config/firebase';

export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';
export const SIGNIN_SUCCESS = 'SIGNIN_SUCCESS';
export const SIGNIN_FAILURE = 'SIGNIN_FAILURE';
export const SIGNOUT_SUCCESS = 'SIGNOUT_SUCCESS';
export const SIGNOUT_FAILURE = 'SIGNOUT_FAILURE';

export const signUp = (newUser) => {
    return async (dispatch) => {
        try {
            await firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password);
            delete newUser.password;
            await firebase.firestore().collection(constants.REF_COLLECTION_USERS).set(newUser);
            dispatch( { type: SIGNUP_SUCCESS });
        } catch (error) {
            dispatch( { type: SIGNUP_FAILURE, error });
        }
    };
};

export const signIn = (credentials) => {
    return async (dispatch) => {
        try {
            await firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password);
            dispatch( { type: SIGNIN_SUCCESS });
        } catch (error) {
            dispatch( { type: SIGNIN_FAILURE, error });
        }
    };
};

export const signOut = () => {
    return async (dispatch) => {
        try {
            await firebase.auth().signOut();
            dispatch({type: SIGNOUT_SUCCESS });
        } catch (error) {
            dispatch({type: SIGNOUT_FAILURE, error});
        }
    }
};