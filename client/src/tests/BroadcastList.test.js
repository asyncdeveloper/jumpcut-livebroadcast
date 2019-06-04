import React from 'react';
import { configure, mount } from 'enzyme/build';
import Adapter from 'enzyme-adapter-react-16/build';
import BroadcastList from '../components/BroadcastList';
import { BrowserRouter } from "react-router-dom";

configure({ adapter: new Adapter() });

describe('<BroadcastList />', () => {
    let wrapper;
    let props;

    beforeEach( () => {
        props = {
            broadcasts: [
                {
                    'id': 'idfromfirebase',
                    'broadcastId': 'oe23MS',
                    'title': 'Testing Broadcast',
                    'user': {
                        'id': 'myuserId1',
                        'name': 'Tests Name'
                    },
                    'isEnded': false
                },
                {
                    'id': 'idfromfirebase2',
                    'broadcastId': 'SWe23M',
                    'title': 'Broadcasting Tut',
                    'user': {
                        'id': 'userId12',
                        'name': 'Samuel Sammie'
                    },
                    'isEnded': false
                }
            ]
        };
        wrapper = mount(<BrowserRouter><BroadcastList {...props} /></BrowserRouter>);
    });

    it('shows broadcasts when passed as props', () => {
        const broadcastList = wrapper.find('.broadcast-list>.col');
        expect(broadcastList).toHaveLength(2);
    });

});