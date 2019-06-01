import { BROADCAST_CREATE_FAILURE, BROADCAST_CREATE_SUCCESS } from "../actions/broadcastActions";

const initState = {
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
        default:
            return state;
    }
};

export default broadcastReducer;