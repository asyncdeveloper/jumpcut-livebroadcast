import broadcastReducer from '../store/reducers/broadcastReducer';
import { BROADCAST_CREATE_FAILURE, BROADCAST_CREATE_SUCCESS } from "../store/actions/broadcastActions";

describe('broadcastReducer', () => {

    it('should return default the initial state if no action type is recognized', () => {
        expect(broadcastReducer({}, { type: null })).toEqual({});
    });

    it('should handle BROADCAST_CREATE_SUCCESS', () => {
        const creatBroadcastActions = { type: BROADCAST_CREATE_SUCCESS };

        expect(broadcastReducer({}, creatBroadcastActions)).toEqual({
            broadcastError : null
        });
    });

    it('should handle BROADCAST_CREATE_FAILURE', () => {
        const errorMockData = {
            code: "broadcast-error",
            message: "The broadcast cannot be saved"
        };

        const creatBroadcastActions = { type: BROADCAST_CREATE_FAILURE,  error: errorMockData };

        expect(broadcastReducer({}, creatBroadcastActions)).toEqual({
            broadcastError : errorMockData.message
        });
    });

});