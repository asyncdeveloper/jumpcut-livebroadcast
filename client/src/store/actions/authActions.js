import constants from '../../config/constants';

export const signUp = (newUser) => {
    return async (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();

        try {
            await firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password);
            delete newUser.password;
            await firestore.collection(constants.REF_COLLECTION_USERS).set(newUser);
            dispatch(authenticationSuccess());
        } catch (error) {
            dispatch(authenticationFailed(error));
        }
    };
};

export const signIn = (credentials) => {
    return async (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();

        try {
            await firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password);
            dispatch(loginSuccess());
        } catch (error) {
            dispatch(loginFailed(error));
        }
    };
};

export function authenticationSuccess() {
    return {
        type: 'SIGNUP_SUCCESS'
    };
}
export function authenticationFailed(error) {
    return {
        type: 'SIGNUP_FAILURE' , error
    };
}

export function loginSuccess() {
    return {
        type: 'SIGNIN_SUCCESS'
    };
}
export function loginFailed(error) {
    return {
        type: 'SIGNIN_FAILURE' , error
    };
}

