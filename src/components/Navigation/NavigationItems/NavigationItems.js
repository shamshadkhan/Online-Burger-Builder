import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';

import classes from './NavigationItems.module.css';

const NavigationItems = (props) => {

    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/" exact>Burger Builder</NavigationItem>
            { props.isAuthenticate ? <NavigationItem link="/orders">Orders</NavigationItem> : null }
            { props.isAuthenticate ? <NavigationItem link="/logout">Logout ({localStorage.getItem('username')})</NavigationItem> : <NavigationItem link="/auth">Authenticate</NavigationItem> }    
        </ul>
    );
};

export default NavigationItems;