// Core
import { mount } from 'enzyme';

// Tools
import { DialogWindowCode } from './modalWindowCode';

describe('modalWindowCode component', () => {
    it('checking props.countryCallingCode', () => {
        expect(
            mount(<DialogWindowCode countryCallingCode={'+7'} open={true} />)
                .find('#alert-dialog-description')
                .length
        ).toBe(5)
    })
})