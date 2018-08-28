import Navigation, { Logo } from '../navigation';

describe('<Navigation />', () => {
    let wrapper;
    let props = {
        home: false
    };

    beforeEach(() => {
        wrapper = shallow(<Navigation {...props} />);
    });

    test('renders without crashing', () => {
        expect(wrapper.find('nav')).toHaveLength(1);
    });

    test('snapshot matches', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('logo renders in correct position', () => {
        props.logo = '1';
        wrapper = shallow(<Navigation {...props} />);
        expect(
            wrapper
                .find('ul')
                .childAt(0)
                .name()
        ).toEqual('Logo');
        expect(wrapper).toMatchSnapshot();

        props.logo = '2';
        wrapper = shallow(<Navigation {...props} />);
        expect(
            wrapper
                .find('ul')
                .childAt(2)
                .name()
        ).toEqual('Logo');
        expect(wrapper).toMatchSnapshot();
    });

    test('home link renders if it should', () => {
        props.home = true;
        wrapper = shallow(<Navigation {...props} />);
        expect(
            wrapper
                .find('Link')
                .first()
                .prop('to')
        ).toEqual('/#home');
    });
});

describe('<Logo />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<Logo />);
    });

    test('renders logo', () => {
        expect(wrapper.find('.jg-logo')).toHaveLength(1);
    });

    test('snapshot matches', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('links to home', () => {
        const link = wrapper.find('Link').first();

        expect(link.prop('to')).toEqual('/#home');
    });
});
