import React from 'react';
import { configure, shallow } from 'enzyme/build';
import Adapter from 'enzyme-adapter-react-16/build';
import SignUp from '../components/SignUp';

configure({ adapter: new Adapter() });

describe('<SignUp />', () => {
    let wrapper;

    beforeEach( () => {
        wrapper = shallow(<SignUp />);
    });

    it('shows sign up form with 4 input fields and button', () => {
        const numberOfFormInput = wrapper.find('input');
        const numberOfFormButton = wrapper.find('button');

        expect(numberOfFormInput).toHaveLength(4);
        expect(numberOfFormButton).toHaveLength(1);
    });

    it('should call set state when input field is changed', () => {
        const firstNameInput = wrapper.find('#firstName');
        const mockEvent =  {
            target: { id: 'firstName', value: 'my first name' }
        };

        firstNameInput.simulate("change", mockEvent);
        expect(wrapper.state('firstName')).toEqual('my first name');
    });

    it('registers when form is submitted', () => {
        const mockPreventDefault = jest.fn();
        const mockEvent = { preventDefault: mockPreventDefault };

        const fakeEmail = 'me@example.com';
        const fakeState = {
            'firstName' : 'my input field val firstName',
            'lastName' : 'my input field val lastName',
            'email' : fakeEmail,
            'password' : 'my input field val password'
        };

        const form = wrapper.find('form');

        const inputFields = wrapper.find('input');
        inputFields.forEach( input => {
            const inputValue =  input.prop('id') === 'email'
                ? fakeEmail : `my input field val ${input.prop('id')}` ;
            input.simulate("change", {
                target: {
                    id: input.prop('id'),
                    value: inputValue
                }
            });
        });

        form.simulate('submit', mockEvent);
        expect(mockPreventDefault).toHaveBeenCalled();
        expect(wrapper.state()).toEqual(fakeState);
    });

});
