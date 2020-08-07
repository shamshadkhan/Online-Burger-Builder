import React, { useState, useContext } from 'react';
import Auxilary from '../../hoc/Auxilary';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/Toolbar/SideDrawer/SideDrawer';

import classes from './Layout.module.css';
import AuthContext from '../../hoc/AuthContext';

const Layout = (props) => {
    const [showSideDrawer,setShowSideDrawer] = useState(false);
    const authContext = useContext(AuthContext);
    const toggleSideDrawer = () => {
        setShowSideDrawer(!showSideDrawer);
    }
    return (
        <Auxilary>
            <Toolbar authenticate={authContext.isAuth} openSideDrawer={toggleSideDrawer}/>
            <SideDrawer authenticate={authContext.isAuth} closeSideDrawer={toggleSideDrawer} showSideDrawer={showSideDrawer}/>
            <main className={classes.Content}>{props.children}</main>
        </Auxilary>
    )
}

export default Layout;