import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({adapter:new Adapter()});

describe('<NavigationItems/>', () => {

    let wrapper;
    beforeEach(()=> {
        wrapper = shallow(<NavigationItems/>);
    })

    it('has 2 nav if not authenticated', () => {
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    })

    it('has 3 nav if authenticated', () => {
        wrapper.setProps({isAuthenticate:true});
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    })

    it('has logout nav if authenticated', () => {
        wrapper.setProps({isAuthenticate:true});
        expect(wrapper.contains(<NavigationItem link="/logout">Logout ({localStorage.getItem('username')})</NavigationItem>)).toEqual(true);
    })
})