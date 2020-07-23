import React, { Component } from 'react';
import Backdrop from '../Backdrop/Backdrop';
import Auxilary from '../../../hoc/Auxilary';

import classes from './Modal.module.css';

class Modal extends Component {

    // shouldComponentUpdate = (nextProps,nextState) => {
    //     return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    // }

    render () {
        const assignedClasses = [classes.Modal];
        if(this.props.show)
            assignedClasses.push(classes.Show);
        return (
            <Auxilary>
            <Backdrop close={this.props.close} show={this.props.show}/>
            <div className={assignedClasses.join(' ')}>
                <div className={classes.ModalHeader}>
                    <p>{this.props.title}</p>
                </div>
                <div className={classes.ModalContent}>
                    {this.props.children}
                </div>   
            </div>
        </Auxilary>
        )
    }
}
export default Modal;