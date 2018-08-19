import AccordionPane from '../accordionPane';

describe('<AccordionPane />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<AccordionPane />);
    });

    test('renders without crashing', () => {
        expect(wrapper.find('.accordion')).toHaveLength(1);
    });

    test('has the right initial state', () => {
        expect(wrapper.state('toggleStatus')).toEqual('closed');
    });

    test('it renders children', () => {
        wrapper = shallow(
            <AccordionPane>
                <div>stuff</div>
            </AccordionPane>
        );
        expect(wrapper.contains(<div>stuff</div>)).toEqual(true);
        expect(wrapper).toMatchSnapshot();
    });

    test('it changes the toggleState when clicked', () => {
        wrapper = shallow(
            <AccordionPane>
                <div>stuff</div>
            </AccordionPane>
        );
        wrapper.find('.accordion').simulate('click');
        expect(wrapper.state('toggleStatus')).toEqual('open');
        expect(wrapper).toMatchSnapshot();

        wrapper.find('.accordion').simulate('click');
        expect(wrapper.state('toggleStatus')).toEqual('closed');
        expect(wrapper).toMatchSnapshot();
    });
});