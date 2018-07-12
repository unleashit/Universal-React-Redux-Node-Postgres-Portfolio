import { Home } from '../../app/js/containers/Home';

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

    describe('<Home />', () => {
        beforeEach(() => {
            wrapper = shallow(<Home {...props} />);
        });

        it('it renders', () => {
            expect(wrapper.find('#home')).toHaveLength(1);
        });

        it('React Helmet is used', () => {
            expect(wrapper.find('HelmetWrapper')).toHaveLength(1);
        });

        describe('Sections', () => {
            it('has a sticky header', () => {
                expect(wrapper.find('StickyHeader')).toHaveLength(1);
            });
            it('has a responsive menu', () => {
                expect(wrapper.find('ResponsiveMenu')).toHaveLength(1);
            });
            it('has a header', () => {
                expect(wrapper.find('Header')).toHaveLength(1);
            });
            it('has the who-what-where section', () => {
                expect(wrapper.find('WhoWhatWhere')).toHaveLength(1);
            });
            it('has the about section', () => {
                expect(wrapper.find('About')).toHaveLength(1);
            });
            it('has renders the connected portfolio', () => {
                // wrapper = shallow(<Home {...props} />).dive();
                // console.log(wrapper);
                // expect(wrapper.find('Portfolio').shallow()).toHaveLength(1);
            });
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
