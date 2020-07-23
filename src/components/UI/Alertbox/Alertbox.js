import React from 'react';

import classes from './Alertbox.module.css';

const Alertbox = (props) => {

    const assignedClasses = [classes.Alertbox];
    if(props.btnType)
        assignedClasses.push(classes[props.btnType]);
    return (
        <div className={assignedClasses.join(' ')}>
            <strong>{props.label}</strong> {props.message}
        </div>
    );
}

export default Alertbox;