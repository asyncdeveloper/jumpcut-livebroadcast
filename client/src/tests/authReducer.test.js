import authReducer from '../store/reducers/authReducer';
import {
    SIGNIN_FAILURE,
    SIGNIN_SUCCESS,
    SIGNOUT_FAILURE,
    SIGNOUT_SUCCESS,
    SIGNUP_FAILURE,
    SIGNUP_SUCCESS
} from "../store/actions/authActions";

describe('authReducer', () => {

    it('should return default the initial state if no action type is recognized', () => {
        expect(authReducer({}, { type: null })).toEqual({});
    });

    it('should handle SIGNUP_SUCCESS', () => {
        const signUpActions = { type: SIGNUP_SUCCESS };

        expect(authReducer({}, signUpActions)).toEqual({
            authError : null
        });
    });

    it('should handle SIGNUP_FAILURE', () => {
        const errorMockData = {
            code: "email-already-in-use",
            message: "The email address is already in use"
        };

        const signUpActions = { type: SIGNUP_FAILURE,  error: errorMockData };

        expect(authReducer({}, signUpActions)).toEqual({
            authError : errorMockData.message
        });
    });

    it('should handle SIGNIN_SUCCESS', () => {
        const signInActions = { type: SIGNIN_SUCCESS };

        expect(authReducer({}, signInActions)).toEqual({
            authError : null
        });
    });

    it('should handle SIGNIN_FAILURE', () => {
        const errorMockData = {
            code: "incorrect login details",
            message: "The user does not exist"
        };

        const signInActions = { type: SIGNIN_FAILURE,  error: errorMockData };

        expect(authReducer({}, signInActions)).toEqual({
            authError : errorMockData.message
        });
    });

    it('should handle SIGNOUT_SUCCESS', () => {
        const signOutActions = { type: SIGNOUT_SUCCESS };

        expect(authReducer({}, signOutActions)).toEqual({});
    });

    it('should handle SIGNOUT_FAILURE', () => {
        const errorMockData = {
            code: "user not found",
            message: "The user does not exist"
        };

        const signOutActions = { type: SIGNOUT_FAILURE,  error: errorMockData };

        expect(authReducer({}, signOutActions)).toEqual({
            authError : errorMockData.message
        });
    });

});