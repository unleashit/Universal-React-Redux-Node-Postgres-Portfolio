import React from 'react';
import { shallow } from 'enzyme';
import { Home } from '../../app/js/containers/Home';
import Header from '../../app/js/components/Home/Header';

describe('Home container', () => {
    let wrapper;
    let props = {
        global: {
            headerState: false,
            hamburgerState: false,
            htmlClass: '',
            animateOff: false
        },
        liveChat: {
            remoteId: null
        },
        dispatch: () => {}
    };

    beforeEach(() => {
        wrapper = shallow(<Home {...props} />);
    });
    describe('<Home />', () => {
        it('it renders', () => {
            expect(wrapper.find('#home')).toHaveLength(1);
        });

        describe('Sections', () => {
            it('has a header', () => {
                // console.log(wrapper.debug());
                // expect(wrapper.find(Header)).toHaveLength(1);
            });
            // it('has the who-what-where section', () => {
            //     expect(wrapper.find('.who-what-where')).toHaveLength(1);
            // });
            // it('has the about section', () => {
            //     expect(wrapper.find('.about')).toHaveLength(1);
            // });
            // it('has renders the portfolio thumbs', () => {
            //     expect(wrapper.find('.portfolio')).toHaveLength(1);
            // });
        });

    });


//     describe('UI Triggers', () => {
//         it('sticky header is invisible by default', () => {
//             expect(component.find('.sticky-header.off')).to.exist;
//         });
//         // it('sticky header displays when scrolling', () => {
//         //     window.simulate('scroll', 1500);
//         //     expect(component.find('.sticky-header.on')).to.exist;
//         // });
//     });


});
