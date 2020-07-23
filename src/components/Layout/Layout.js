import React, { Component } from 'react';
import Auxilary from '../../hoc/Auxilary';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/Toolbar/SideDrawer/SideDrawer';

import classes from './Layout.module.css';
import { connect } from 'react-redux';

class Layout extends Component {

    state = {
        showSideDrawer : false
    }

    toggleSideDrawer = () => {
        this.setState((prevState)=>{
            return {showSideDrawer:!prevState.showSideDrawer}
        })
    }

    render() {
        return (
            <Auxilary>
                <Toolbar authenticate={this.props.isAuth} openSideDrawer={this.toggleSideDrawer}/>
                <SideDrawer authenticate={this.props.isAuth} closeSideDrawer={this.toggleSideDrawer} showSideDrawer={this.state.showSideDrawer}/>
                <main className={classes.Content}>{this.props.children}</main>
            </Auxilary>
        )
    }
}

const mapStatetoProps = state => {
    return {
        isAuth : state.authUser.token !== null
    }
}

export default connect(mapStatetoProps)(Layout);