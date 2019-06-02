import React from 'react';
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store';
import {
    BROADCAST_CREATE_SUCCESS,
    createBroadcast,
    END_BROADCAST_SUCCESS,
    endBroadcast
} from "../store/actions/broadcastActions";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock('../config/firebase', () => ({
    firestore : jest.fn().mockReturnValue({
        collection : () => ({
            set:() => ({ data: 'MOCK DATA' }),
            add:() =>({ data: 'MOCK DATA' }),
            doc:() =>({
                update:(data) => ({ data })
            }),
        })
    })
}));

describe('BroadcastActions', () => {
    let store;
    let broadcast;

    beforeEach(() => {
        store = mockStore({});

        broadcast = {
            'brocastId': 'idid111',
            'title' : 'My Live Broadcast',
            'user': {
                'id': 'uuuiddd',
                'name': `Test User`
            }
        };
    });

    it('broadcastActions should createBroadcast successfully', async () => {
        const expectedResponse =  [{ type: BROADCAST_CREATE_SUCCESS }];

        await store.dispatch(createBroadcast(broadcast));

        expect(store.getActions()).toEqual(expectedResponse);
    });

    it('broadcastActions should endBroadcast successfully', async () => {
        broadcast.id = 'iiiddddd';

        const expectedResponse =  [{ type: END_BROADCAST_SUCCESS }];

        await store.dispatch(endBroadcast(broadcast.id));

        expect(store.getActions()).toEqual(expectedResponse);
    });

});