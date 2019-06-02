import React from 'react';
import { configure, shallow } from 'enzyme/build';
import Adapter from 'enzyme-adapter-react-16/build';
import { Home } from '../components/Home';
import BroadcastList from '../components/BroadcastList';

configure({ adapter: new Adapter() });

describe('<Home />', () => {
    let wrapper;
    let props;

    beforeEach( () => {
        props = {
            auth: { email: 'samuel@jumpcut.com', uid: 'uuuddiiid' },
            profile: { firstName: 'Samuel' ,  lastName: 'Oluwaseyi'},
            broadcasts: [
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
            ]
        };
        wrapper = shallow(<Home {...props} />);
    });

    it('should render user home page ', () => {
        const homeDiv = wrapper.find('div.home');

        expect(homeDiv).toHaveLength(1);
    });

    it('should render <BroadcastList />', () => {
        expect(wrapper.find('BroadcastList').length).toEqual(1);
    });

});
