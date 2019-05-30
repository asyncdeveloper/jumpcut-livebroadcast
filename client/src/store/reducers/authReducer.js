import {
    SIGNIN_FAILURE,
    SIGNIN_SUCCESS,
    SIGNOUT_FAILURE,
    SIGNOUT_SUCCESS,
    SIGNUP_FAILURE,
    SIGNUP_SUCCESS
} from "../actions/authActions";

const initialState = {
    authError: null
};
const authReducer = (state = initialState , action) => {
    switch(action.type) {
        case SIGNUP_SUCCESS:
            return {
                ...state,
                authError: null
            };
        case SIGNUP_FAILURE:
            return {
                ...state,
                authError: action.error.message
            };
        case SIGNIN_SUCCESS:
            return {
                ...state,
                authError: null
            };
        case SIGNIN_FAILURE:
            return {
                ...state,
                authError: action.error.message
            };
        case SIGNOUT_SUCCESS:
            return state;
        case SIGNOUT_FAILURE:
            return {
                ...state,
                authError: action.error.message
            };
        default:
            return state;
    }
};

export default authReducer;