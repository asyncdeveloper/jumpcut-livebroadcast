import React from 'react';
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store';
import { BROADCAST_CREATE_SUCCESS, createBroadcast } from "../store/actions/broadcastActions";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock('../config/firebase', () => ({
    firestore : jest.fn().mockReturnValue({
        collection : () => ({
            set:() => ({ data: 'MOCK DATA' }),
            add:() =>({ data: 'MOCK DATA' })
        })
    })
}));

describe('BroadcastActions', () => {
    let store;

    beforeEach(() => {
        store = mockStore({});
    });

    it('authActions should createBroadcast successfully', async () => {
        const broadcast = {
            'brocastId': 'idid111',
            'title' : 'My Live Broadcast',
            'user': {
                'id': 'uuuiddd',
                'name': `Test User`
            }
        };

        const expectedResponse =  [{ type: BROADCAST_CREATE_SUCCESS }];

        await store.dispatch(createBroadcast(broadcast));

        expect(store.getActions()).toEqual(expectedResponse);
    });

});