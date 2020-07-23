import React from 'react';

import classes from './Button.module.css';

const Button = (props) => {
    const assignedClasses = [classes.Button];
    if(props.btnType)
        assignedClasses.push(classes[props.btnType]);

    return (
    <button className={assignedClasses.join(' ')} onClick={props.clicked} disabled={props.disabled}>{props.children}</button>
    );
};

export default Button;