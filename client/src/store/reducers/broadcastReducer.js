import {
    BROADCAST_CREATE_FAILURE,
    BROADCAST_CREATE_SUCCESS,
    END_BROADCAST_FAILURE,
    END_BROADCAST_SUCCESS
} from "../actions/broadcastActions";

const initState = {
    broadcast: [],
    broadcastError: null
};

const broadcastReducer = (state = initState, action) => {
    switch (action.type) {
        case BROADCAST_CREATE_SUCCESS:
            return {
                ...state,
                broadcastError: null
            };
        case BROADCAST_CREATE_FAILURE:
            return {
                ...state,
                broadcastError: action.error.message
            };
        case END_BROADCAST_SUCCESS:
            return {
                ...state,
                broadcastError: null
            };
        case END_BROADCAST_FAILURE:
            return {
                ...state,
                broadcastError: action.error.message
            };
        default:
            return state;
    }
};

export default broadcastReducer;