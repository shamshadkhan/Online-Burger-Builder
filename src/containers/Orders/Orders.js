import React, { Component } from 'react';
import Order from '../../components/Checkout/Order/Order';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import WithErrorHandler from '../../hoc/WithErrorHandler';

import classes from './Orders.module.css';

import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/actions';

class Orders extends Component {

    state = {
        message : 'No Orders Available'
    }

    componentDidMount = () => {
        this.props.FetchOrders();
    }

    buildBurger = () => {
        this.props.history.push('/');
    }

    render() {
        let orderList = <Spinner/>
        if(!this.props.loading) {
            if(this.props.orders.length>0){
                orderList = this.props.orders.map(order => {
                    return <Order 
                    key={order.id} 
                    ingredients={order.ingredients} 
                    customer={order.customer} 
                    totalPrice={order.price}/>
                })
            } 
            else {
                orderList = (
                    <div className={classes.Order}>
                        <p>{this.state.message}<br/>{this.props.error}</p>
                        <p onClick={this.buildBurger}>Build your Burger here!</p>
                    </div>
                    );
            }
        }
        return (
            <div className={classes.Orders}>
                {orderList}
            </div>
        )
    }
}

const mapStatetoProps = state => {
    return {
        orders : state.burgerOrder.orders,
        loading : state.burgerOrder.loading,
        error : state.burgerOrder.error,
    }
};

const mapDispatchtoProps = dispatch => {
    return {
        FetchOrders : () => dispatch(actionCreators.fetchOrders())
    }
};

export default connect(mapStatetoProps,mapDispatchtoProps)(WithErrorHandler(Orders,axios));