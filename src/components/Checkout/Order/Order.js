import React from 'react';
import Assets from '../../../assets/assets';

import classes from './Order.module.css';

const Order = (props) => {
    const ingredients = JSON.parse(props.ingredients);
    const customers = JSON.parse(props.customer);
    const order = Object.keys(ingredients).map(ingKey => {
        return (
            ingredients[ingKey] ? (
            <li key={ingKey}>
                <span><img src={Assets[ingKey]} alt="img"/>{ingKey}:</span>
                <span>({ingredients[ingKey]})</span>
            </li>
            ) : null
        )
    })

    let customer = Object.keys(customers).map(ingKey => {
        return (
            customers[ingKey] ? (
            <li key={ingKey}>
                <span><img src={Assets[ingKey]} alt="img"/>: {customers[ingKey]}</span>
            </li>
            ) : ""
        )
    });
    let customerLength = customer.reduce((arr,el)=> {
        return arr+el;
    },''); 
    if(customerLength ==="")
    {
        customer = <p style={{textAlign:'center'}}>No Customer Information Found</p>;
    }
    return (
        <div className={classes.Order}>
            <h1><span>{customers.name}'s Order</span> <span>{props.totalPrice.toFixed(2)} USD</span></h1>
            <div className={classes.OrderDetail}>                
                <ul className={classes.Item}>
                    <li>
                        <span><img src={Assets.bread} alt="img"/>Burger:</span>
                        <span>(1)</span>
                    </li>
                    {order}
                    <li>
                        <span>Total:</span>
                        <span>{props.totalPrice.toFixed(2)}</span>
                    </li>
                </ul>
                <div className={classes.CustomerDetail}>
                    <ul>
                        {customer}
                    </ul>
                </div>  
            </div>
        </div>
    )
}

export default Order;
