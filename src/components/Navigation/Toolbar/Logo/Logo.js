import React from 'react';

import classes from './Logo.module.css';
import Assets from '../../../../assets/assets';

const Logo = (props) => {
    return (
        <div className={classes.Logo}>
            <img src={Assets.logo} alt="img"/>
        </div>
    );
};

export default Logo;