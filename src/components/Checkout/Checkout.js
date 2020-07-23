import React from 'react';
import Burger from '../Burger/Burger';
import Button from '../UI/Button/Button';

import classes from './Checkout.module.css';

const Checkout = (props) => {
    return (
        <div className={classes.Checkout}>
            <div className={classes.Summary}>
            <h1>Here is your Order: <span>{props.price.toFixed(2)}</span></h1>
            <Burger ingredients={props.ingredients} />
            <Button btnType="Cancel" clicked={props.close}>Cancel</Button>
            <Button btnType="Ok" clicked={props.continue}>Continue</Button>
            </div>
        </div>
    )
}

export default Checkout;