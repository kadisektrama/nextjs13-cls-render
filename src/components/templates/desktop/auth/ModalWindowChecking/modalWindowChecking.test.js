// Core
import { mount } from 'enzyme';

// Tools
import { WindowChecking } from "./modalWindowChecking";

let country_registers = {
    country_registers: [
        {
            country_calling_code: "+375",
            country_name: "Беларусь",
            is_available_for_verification: true,
            verification_type: "Sms",
        }
    ]
}

describe('modalWindowChecking component', () => {
    it('button submit', () => {
        //const _click = jest.fn();

        expect(
            mount(<WindowChecking open={true} countryRegister={country_registers} />)
                .find('button.submit')
                .length
        ).toBe(1);
    })
})