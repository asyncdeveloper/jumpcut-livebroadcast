import React from 'react';
import { configure, shallow } from 'enzyme/build';
import Adapter from 'enzyme-adapter-react-16/build';
import { Home } from '../components/Home';

configure({ adapter: new Adapter() });

describe('<Home />', () => {
    let wrapper;
    let props;

    beforeEach( () => {
        props = {
            auth: { email: 'samuel@jumpcut.com', uid: 'uuuddiiid' },
            profile: { firstName: 'Samuel' ,  lastName: 'Oluwaseyi'}
        };
        wrapper = shallow(<Home {...props} />);
    });

    it('should render user home page ', () => {
        const numberOfFormInput = wrapper.find('div.home');
        expect(numberOfFormInput).toHaveLength(1);
    });

});
