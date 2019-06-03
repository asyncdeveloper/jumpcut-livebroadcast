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

