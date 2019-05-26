import constants from '../../config/constants';

export const signUp = (newUser) => {
    return async (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();

        try {
            await firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password);
            delete newUser.password;
            await firestore.collection(constants.REF_COLLECTION_USERS).set(newUser);
            dispatch({ type: 'SIGNUP_SUCCESS' });
        } catch (error) {
            dispatch({ type: 'SIGNUP_FAILURE', error });
        }
    };
};

