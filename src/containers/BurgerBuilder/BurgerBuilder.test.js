import React from 'react';
import {configure,shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import {BurgerBuilder} from './BurgerBuilder';
import Burger from '../../components/Burger/Burger';

configure({adapter:new Adapter()});

describe('<BurgerBuilder/>', () => {
    
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<BurgerBuilder FetchBurgerInitials={()=>{}}/>);
    });

    it('Check for 1 BuildControls', () => {
        wrapper.setProps({ingredients:{salad:0,meat:0}});
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    });

    it('Check for 1 Burger', () => {
        wrapper.setProps({ingredients:{salad:0,meat:0}});
        expect(wrapper.find(Burger)).toHaveLength(1);
    });
})