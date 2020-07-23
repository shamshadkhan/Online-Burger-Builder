import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import Checkout from '../../components/Checkout/Checkout';
import Auxilary from '../../hoc/Auxilary';
import Customer from './Customer/Customer';

import classes from './Checkout.module.css';
import { connect } from 'react-redux';

class Order extends Component {

    constructor (props) {
        super(props);
        this.state = {
            totalIngredients :0,
            message : 'Please Build Your Burger to Place Order!!'
        }
    }

    closeCheckout = () => {
        this.props.history.push('/');
    }

    continueCheckout = () => {
        this.props.history.replace('/checkout/customer');
    }

    findIngredientsCount = () => {
        const total = Object.values(this.props.ingredients).reduce((a,b)=>{
            return a+b
        });
        this.setState({totalIngredients:total});
    }

    render () {
        let checkout = (
                <div className={classes.Checkout}>
                    <p>{this.state.message}</p>
                    <p onClick={this.closeCheckout}>Build your Burger here!</p>
                </div>
                );
        if(this.props.ingredients) {
            checkout = (
                <Auxilary> 
                    <Checkout 
                    ingredients={this.props.ingredients} 
                    price={this.props.totalPrice}
                    close={this.closeCheckout}
                    continue={this.continueCheckout}/>                    
                    <Route path={this.props.match.url+'/customer'} component={Customer}/>
                </Auxilary>
            )
        }
        return checkout;
    }
}

const mapStatetoProps = state => {
    return {
        ingredients : state.burgerBuilder.ingredients,
        totalPrice : state.burgerBuilder.totalPrice
    }
}

export default connect(mapStatetoProps)(Order);