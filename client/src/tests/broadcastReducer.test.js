import broadcastReducer from '../store/reducers/broadcastReducer';
import {
    BROADCAST_CREATE_FAILURE,
    BROADCAST_CREATE_SUCCESS,
    END_BROADCAST_SUCCESS
} from "../store/actions/broadcastActions";

describe('broadcastReducer', () => {

    it('should return default the initial state if no action type is recognized', () => {
        expect(broadcastReducer({}, { type: null })).toEqual({});
    });

    it('should handle BROADCAST_CREATE_SUCCESS', () => {
        const createBroadcastActions = { type: BROADCAST_CREATE_SUCCESS };

        expect(broadcastReducer({}, createBroadcastActions)).toEqual({
            broadcastError : null
        });
    });

    it('should handle BROADCAST_CREATE_FAILURE', () => {
        const errorMockData = {
            code: "broadcast-error",
            message: "The broadcast cannot be saved"
        };

        const createBroadcastActions = { type: BROADCAST_CREATE_FAILURE,  error: errorMockData };

        expect(broadcastReducer({}, createBroadcastActions)).toEqual({
            broadcastError : errorMockData.message
        });
    });

    it('should handle END_BROADCAST_SUCCESS', () => {
        const endBroadcastActions = { type: END_BROADCAST_SUCCESS };

        expect(broadcastReducer({}, endBroadcastActions)).toEqual({
            broadcastError : null
        });
    });

});