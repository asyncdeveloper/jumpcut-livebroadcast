import React from 'react';
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store';
import {
    signIn,
    SIGNIN_FAILURE,
    SIGNIN_SUCCESS,
    signOut,
    SIGNOUT_SUCCESS,
    signUp,
    SIGNUP_FAILURE,
    SIGNUP_SUCCESS
} from "../store/actions/authActions";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock('../config/firebase', () => ({
    auth : jest.fn().mockReturnValue({
        signInWithEmailAndPassword(email, password) {
            return new Promise((resolve, reject) => {
                if(email === 'test@email.com' && password === 'testpassword'){
                    resolve({ type: 'SIGNIN_SUCCESS' });
                }
                reject(Error('sign in error'));
            });
        },
        createUserWithEmailAndPassword(email, password) {
            return new Promise((resolve, reject) => {
                if(email === 'test@email.com' && password === 'testpassword'){
                    resolve({ type: 'SIGNUP_SUCCESS' });
                }
                reject(Error('create user error'));
            });
        },
        signOut() {
            return new Promise((resolve) => {
                resolve({ type: 'SIGNOUT_SUCCESS' });
            });
        }
    }),
    firestore : jest.fn().mockReturnValue({
        collection : () => ({
            set:() => ({ data: 'MOCK DATA' })
        })
    })
}));

describe('AuthActions', () => {
    let store;

    beforeEach(() => {
        store = mockStore({});
    });

    it('authActions should signIn user with correct credentials', async () => {
        const userCredentials = { email: 'test@email.com', password: 'testpassword' };

        const expectedResponse =  [{ type: SIGNIN_SUCCESS }];

        await store.dispatch(signIn(userCredentials));

        expect(store.getActions()).toEqual(expectedResponse);
    });

    it('authActions should not signIn user with wrong credentials', async () => {
        const userCredentials = { email: 'me@email.com', password: 'mypass' };

        const expectedResponse = [{
            type: SIGNIN_FAILURE,
            error : new Error('sign in error')
        }];

        await store.dispatch(signIn(userCredentials));

        expect(store.getActions()).toEqual(expectedResponse);
    });

    it('authActions should signUp user with correct credentials', async () => {
        const userCredentials = { email: 'test@email.com', password: 'testpassword' };

        const expectedResponse =  [{ type: SIGNUP_SUCCESS }];

        await store.dispatch(signUp(userCredentials));

        expect(store.getActions()).toEqual(expectedResponse);
    });

    it('authActions should not signUp user with wrong credentials', async () => {
        const userCredentials = { email: 'meaagain@gemail.com', password: 'mypass123' };

        const expectedResponse = [{
            type: SIGNUP_FAILURE,
            error : new Error('create user error')
        }];

        await store.dispatch(signUp(userCredentials));

        expect(store.getActions()).toEqual(expectedResponse);
    });

    it('authActions should allow user logout', async () => {
        const expectedResponse =  [{ type: SIGNOUT_SUCCESS }];

        await store.dispatch(signOut());

        expect(store.getActions()).toEqual(expectedResponse);
    });

});