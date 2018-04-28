import {renderComponent, expect} from '../test_helper';
import App from '../../app/js/containers/App';

describe('App container', () => {
    let component;

    beforeEach(() => {
        component = renderComponent(App);
    });

    // TODO: upgrading test deps broke deep rendering tests

    // it('the app renders...', () => {
    //     expect(component.find('.page-wrapper')).to.exist;
    // });
});
