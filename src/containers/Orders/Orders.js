import React, { Component } from 'react';
import Order from '../../components/Checkout/Order/Order';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import WithErrorHandler from '../../hoc/WithErrorHandler';
import Pagination from "react-js-pagination";

import classes from './Orders.module.css';

import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/actions';

class Orders extends Component {

    state = {
        message : 'No Orders Available',
        activePage : 1
    }

    componentDidMount = () => {
        this.props.FetchOrders();
    }

    buildBurger = () => {
        this.props.history.push('/');
    }

    handlePageChange(page) {
        this.setState({activePage: page});
        this.props.FetchOrders(page);
    }

    render() {
        let orderList = <Spinner/>
        let pagination = null;
        if(!this.props.loading) {
            if(this.props.orders.data && this.props.orders.data.length>0){
                orderList = this.props.orders.data.map(order => {
                    return <Order 
                    key={order.id} 
                    ingredients={order.ingredients} 
                    customer={order.customer} 
                    totalPrice={parseFloat(order.price)}/>
                })
                pagination = <Pagination
                    activePage={this.state.activePage}
                    itemsCountPerPage={this.props.orders.last_page}
                    totalItemsCount={this.props.orders.total}
                    pageRangeDisplayed={5}
                    onChange={this.handlePageChange.bind(this)}
                />
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
                {pagination}
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
        FetchOrders : (page) => dispatch(actionCreators.fetchOrders(page))
    }
};

export default connect(mapStatetoProps,mapDispatchtoProps)(WithErrorHandler(Orders,axios));