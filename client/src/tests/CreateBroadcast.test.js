import React from 'react';
import { configure, shallow } from 'enzyme/build';
import Adapter from 'enzyme-adapter-react-16/build';
import { CreateBroadcast } from "../components/CreateBroadcast";

configure({ adapter: new Adapter() });

describe('<CreateBroadcast />', () => {
    let wrapper;
    let props;

    beforeEach( () => {
        props = {
            auth: { uid: 'uuiiiidd' },
            profile: { firstName: 'Samuel' ,  lastName: 'Oluwaseyi'},
            broadcastError: null,
            createBroadcast: jest.fn()
        };
        wrapper = shallow(<CreateBroadcast {...props} />);
    });

    it('shows create broadcast form with 1 input fields and 1 button', () => {
        const numberOfFormInput = wrapper.find('input');
        const numberOfFormButton = wrapper.find('button');

        expect(numberOfFormInput).toHaveLength(1);
        expect(numberOfFormButton).toHaveLength(1);
    });

    it('should call set state when input field is changed', () => {
        const firstNameInput = wrapper.find('#title');
        const mockEvent =  {
            target: { id: 'title', value: 'my first broadcast' }
        };

        firstNameInput.simulate("change", mockEvent);
        expect(wrapper.state('title')).toEqual('my first broadcast');
    });

    it('registers when form is submitted', () => {
        const mockPreventDefault = jest.fn();
        const mockEvent = { preventDefault: mockPreventDefault };

        const fakeState = { 'title' : 'my input field val title' };

        const form = wrapper.find('form');

        const inputFields = wrapper.find('input');
        inputFields.forEach( input => {
            const inputValue = `my input field val ${input.prop('id')}` ;
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
