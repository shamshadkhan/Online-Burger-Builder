import React from 'react';
import Assets from '../../../../assets/assets';

import classes from './Toggle.module.css';

const Toggle = (props) => {
    return (
        <div className={classes.Toggle} onClick={props.clicked}><img src={Assets.menu} alt="img"/></div>
    );
};

export default Toggle;