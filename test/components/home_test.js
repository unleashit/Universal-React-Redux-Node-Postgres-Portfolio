import {renderComponent, expect} from '../test_helper';
import Home from '../../app/js/containers/home';

describe('Home container', () => {
    let component;

    beforeEach(() => {
        component = renderComponent(Home);
    });

    describe('Sections', () => {
        it('has a header', () => {
            expect(component.find('.main-header')).to.exist;
        });
        it('has the who-what-where section', () => {
            expect(component.find('.who-what-where')).to.exist;
        });
        it('has the about section', () => {
            expect(component.find('.about')).to.exist;
        });
        it('has renders the portfolio thumbs', () => {
            expect(component.find('.portfolio')).to.exist;
        });
    });

    describe('UI Triggers', () => {
        it('sticky header is invisible by default', () => {
            expect(component.find('.sticky-header.off')).to.exist;
        });
        // it('sticky header displays when scrolling', () => {
        //     window.simulate('scroll', 1500);
        //     expect(component.find('.sticky-header.on')).to.exist;
        // });
    });


});
