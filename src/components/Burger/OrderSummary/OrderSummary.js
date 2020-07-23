import React from 'react';
import Assets from '../../../assets/assets';
import Button from '../../UI/Button/Button';

import classes from './OrderSummary.module.css';

const OrderSummary = (props) => {
    const orderList = Object.keys(props.ingredients).map(ingKey=> {
        return (
            props.ingredients[ingKey]?
            <li 
            key={ingKey}>
                <span><img src={Assets[ingKey]} alt="img"/>{ingKey}:</span>
                <span>{props.ingredients[ingKey]} x {props.ingredientsPrice[ingKey]}</span>
            </li>
            :null
        )
    })
    return (
        <div className={classes.OrderSummary}>
            <ul>
                <li>
                    <span><img src={Assets.bread} alt="img"/>Burger:</span>
                    <span>1 x 4</span>
                </li>
                {orderList}
                <li>
                    <span>Total:</span>
                    <span>{props.totalPrice.toFixed(2)}</span>
                </li>
            </ul>
            <div className={classes.OrderFooter}>
                <Button btnType="Cancel" clicked={props.close}>Close</Button>
                <Button btnType="Ok" clicked={props.continue}>Continue</Button>
            </div>
        </div>
    );
};

export default OrderSummary;
