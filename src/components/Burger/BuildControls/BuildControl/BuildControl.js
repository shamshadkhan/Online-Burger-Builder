import React from 'react';

import classes from './BuildControl.module.css';

const BuildControl = (props) => {
    return (
        <div className={classes.BuildControl}>
            <div className={classes.Label}><img src={props.img} alt="img"/>{props.label}</div>
            <div className={classes.Buttons}>
                <button className={classes.More} onClick={props.addIng}>+</button>
                <button className={classes.Less} onClick={props.removeIng} disabled={props.disable}>-</button>
            </div>
        </div>
    );
};

export default BuildControl;