import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const Burger = (props) => {
    const inputIngredients = Object.keys(props.ingredients);
    let outputIngredients= inputIngredients.map((ingKey) => {
        let quantityIng = [...Array(props.ingredients[ingKey])];
        return quantityIng.map((item,i)=> {
            return <BurgerIngredient key={ingKey+i} type={ingKey}  />
        })
    }).reduce((arr,el) => { 
        return arr.concat(el)
    },[]);
    
    if(outputIngredients.length===0)
        outputIngredients = <p>Start Adding Ingredients</p>
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {outputIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
}

export default Burger;