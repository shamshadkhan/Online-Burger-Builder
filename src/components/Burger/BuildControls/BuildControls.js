import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import Assets from '../../../assets/assets';

import classes from './BuildControls.module.css';

const controls = [
    {label:"Salad",type:"salad"},
    {label:"Cheese",type:"cheese"},
    {label:"Bacon",type:"bacon"},
    {label:"Meat",type:"meat"}
]

const BuildControls = (props) => {
    return(
        <div className={classes.BuildControls}>
            <p className={classes.Price}>
                Current Price:<strong>{props.totalPrice.toFixed(2)}</strong>
            </p>
            {
                controls.map((item)=> {
                    return <BuildControl 
                    disable={props.disabled[item.type]}
                    key={item.label} 
                    img={Assets[item.type]}
                    label={item.label} 
                    addIng={()=>props.addIngredient(item.type)}
                    removeIng={()=>props.removeIngredient(item.type)}/>
                })
            }
            <button disabled={!props.orderable} className={classes.OrderButton} onClick={props.open}>{props.authenticate ? 'ORDER NOW' : 'SIGNUP FOR ORDER'} </button>
        </div>
    );
};

export default BuildControls;