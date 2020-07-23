import React from 'react';
import Logo from '../Logo/Logo';
import Auxilary from '.././../../../hoc/Auxilary';
import NavigationItems from '../../NavigationItems/NavigationItems';

import classes from './SideDrawer.module.css';
import Backdrop from '../../../UI/Backdrop/Backdrop';

const SideDrawer = (props) => {

    let assignedClasses = [classes.SideDrawer,classes.Close];
    if(props.showSideDrawer)
       assignedClasses = [classes.SideDrawer, classes.Open]; 

    return (
        <Auxilary>
            <Backdrop show={props.showSideDrawer} close={props.closeSideDrawer}/>
            <div className={assignedClasses.join(' ')} onClick={props.closeSideDrawer}>
                <div className={classes.Left}>
                    <Logo/>    
                </div>
                <nav>
                    <NavigationItems isAuthenticate={props.authenticate}/>
                </nav>
            </div>
        </Auxilary>
    );
};

export default SideDrawer;
