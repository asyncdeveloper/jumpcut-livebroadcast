import React from 'react';
import { configure, shallow } from 'enzyme/build';
import Adapter from 'enzyme-adapter-react-16/build';
import { SignIn } from '../components/SignIn';

configure({ adapter: new Adapter() });

describe('<SignIn />', () => {
    let wrapper;
    let props;

    beforeEach( () => {
        props = {
            auth: null,
            authError: null,
            signIn: jest.fn()
        };
        wrapper = shallow(<SignIn {...props} />);
    });

    it('shows sign in form with 2 input fields and button', () => {
        const numberOfFormInput = wrapper.find('input');
        const numberOfFormButton = wrapper.find('button');

        expect(numberOfFormInput).toHaveLength(2);
        expect(numberOfFormButton).toHaveLength(1);
    });

});
