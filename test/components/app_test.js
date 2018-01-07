import {renderComponent, expect} from '../test_helper';
import App from '../../app/js/containers/app';

describe('App container', () => {
    let component;

    beforeEach(() => {
        component = renderComponent(App);
    });

    it('includes a footer with class of footer', () => {
        expect(component.find('.footer')).to.exist;
    });
});
