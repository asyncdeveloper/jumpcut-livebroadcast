import React from 'react';
import { configure, shallow } from 'enzyme/build';
import Adapter from 'enzyme-adapter-react-16/build';
import { ViewBroadcast } from '../components/ViewBroadcast';

configure({ adapter: new Adapter() });

describe('<ViewBroadcast />', () => {
    let wrapper;
    let props;

    beforeEach( () => {
        props = {
            auth: { uid: 'myuserId' },
            profile: { firstName: 'Samuel' ,  lastName: 'Oluwaseyi'},
            broadcast: [
                {
                    'id': 'idfromfirebase',
                    'broadcastId': 'oe23M',
                    'title': 'Test Broadcast',
                    'user': {
                        'id': 'myuserId',
                        'name': 'Oluwaseyi Adeogun'
                    },
                    'isEnded': false
                }
            ],
        };
        wrapper = shallow(<ViewBroadcast {...props} />);
    });

    it('should start broadcast if broadcast is currently on', () => {
        const sectionBroadcast = wrapper.find('section.start-broadcast');

        expect(sectionBroadcast).toHaveLength(1);
    });

    it('should show end broadcast button for broadcast owner', () => {
        const sectionBroadcast = wrapper.find('section.end-broadcast');

        expect(sectionBroadcast).toHaveLength(1);
    });

    it('should not show broadcast if broadcast does not exist', () => {
        props.broadcasts = [];
        const sectionBroadcast = wrapper.find('section.start-broadcast');

        expect(sectionBroadcast).toEqual({});
    });

    it('should not show broadcast if broadcast has ended', () => {
        props.broadcast.isEnded = true;
        const sectionBroadcast = wrapper.find('section.start-broadcast');

        expect(sectionBroadcast).toEqual({});
    });

});
