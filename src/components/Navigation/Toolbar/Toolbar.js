import React from 'react';
import NavigationItems from '../NavigationItems/NavigationItems';
import Logo from './Logo/Logo';
import Toggle from './Toggle/Toggle';

import classes from './Toolbar.module.css';

const Toolbar = (props) => {
    return (
        <div className={classes.Toolbar}>
            <div className={classes.Left}>
                <Toggle clicked={props.openSideDrawer}/>
                <Logo/>      
            </div>
            <nav className={classes.DesktopOnly}>
                <NavigationItems isAuthenticate={props.authenticate}/>
            </nav>
        </div>
    );
};

export default Toolbar;