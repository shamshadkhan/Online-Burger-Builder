import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import WithErorHandler from '../../../hoc/WithErrorHandler';

import classes from './Customer.module.css';

import { connect } from 'react-redux';
import * as actionCreators from '../../../store/actions/actions';
import { Redirect } from 'react-router';
import { validateForm } from '../../../utility/utility';


class Customer extends Component {

    constructor (props) {
        super(props);
        this.state = {
            message : 'Please Build Your Burger to Place Order!!',
            formValid : false,
            customer: {
                name : {
                    label : 'Name:',
                    value : '',
                    valid : false,
                    touched : false,
                    validation : {
                        required : true,
                        minLength : 5,
                        message : 'Field Required (min 5 Char)'
                    },
                    config : {
                        type : 'text',
                        placeholder : 'Enter Name'
                    }
                },
                email :  {
                    label : 'Email:',
                    value : '',
                    valid : false,
                    touched : false,
                    validation : {
                        required : true,
                        minLength : 10,
                        emailPattern : true,
                        message : 'Field Required (min 10 Char), Pattern (xxx@xx.xx)'
                    },
                    config : {
                        type : 'email',
                        placeholder : 'Enter Email'
                    }
                },
                region :  {
                    label : 'Region:',
                    value : 'Europe',
                    valid : true,
                    touched : false,
                    validation : {},
                    config : {
                        type : 'select',
                        options : [
                            {value : 'Europe' , label:'Europe'},
                            {value : 'Asia' , label:'Asia'},
                            {value : 'North America' , label:'North America'},
                            {value : 'South America' , label:'South America'},
                            {value : 'Antartica' , label:'Antartica'},
                            {value : 'Australia' , label:'Australia'},
                        ]
                    }
                },
                address :  {
                    label : 'Address:',
                    value : '',
                    valid : false,
                    touched : false,
                    validation : {
                        required : true,
                        minLength : 10,
                        message : 'Field Required (min 10 Char)'
                    },
                    config : {
                        type : 'textarea',
                        placeholder : 'Enter Address'
                    }
                }
            },
        }
    }

    onChangeCustomerInfo = (event,field) => {
        let updatedCustomer = {...this.state.customer};
        let updatedCustomerField = {...this.state.customer[field]};
        updatedCustomerField.value = event.target.value;
        updatedCustomerField.touched = true;
        updatedCustomerField.valid = validateForm(updatedCustomerField.value,updatedCustomerField.validation);
        updatedCustomer[field] = updatedCustomerField;
        let allFieldValid = true;
        for (const key in updatedCustomer) {
            allFieldValid = updatedCustomer[key].valid && allFieldValid;
        }
        this.setState({customer:updatedCustomer, formValid:allFieldValid});
    }

    closeCheckout = () => {
        this.props.history.push('/');
    }

    continueCheckout = () => {        
        this.setState({loading:true});
        let customer = {};
        for (const key in this.state.customer) {
            customer[key] = this.state.customer[key].value;
        }
        const data = {
            ingredients : this.props.ingredients,
            price: this.props.totalPrice,
            customer:customer,
            user_id: parseInt(localStorage.getItem('userId'))
        }
        this.props.FetchBurgerInitials();
        this.props.PurchaseOrders(data);
    }

    render(){
        const inputElementsArray = [];
        for (const element in this.state.customer) {
            inputElementsArray.push({
                id: element,
                config : this.state.customer[element].config
            })
        }
        
        const redirect = this.props.purchase ? <Redirect to="/orders"/> : null
        const inputElements = inputElementsArray.map(input => {
            return <Input 
            key={input.id}
            value={input.value}
            inputtype={input.config.type}
            label={this.state.customer[input.id].label} 
            config={input.config}
            validity={this.state.customer[input.id].valid}
            touched={this.state.customer[input.id].touched}
            errormessage = {this.state.customer[input.id].validation.message}
            changed={(e) => {this.onChangeCustomerInfo(e,input.id)}}/>
        })
        return (
            <div className={classes.Customer}>
                {this.props.loading ? <Spinner/> : null}
                {redirect}
                <div className={classes.CustomerForm}>
                    <h1>Customer Information</h1>
                    {inputElements}
                    <Button btnType="Cancel" clicked={this.closeCheckout}>Close</Button>
                    <Button btnType="Ok" clicked={this.continueCheckout} disabled={!this.state.formValid}>Order</Button>
                </div>
            </div>
        )

    }
}

const mapStatetoProps = state => {
    return {
        ingredients : state.burgerBuilder.ingredients,
        totalPrice : state.burgerBuilder.totalPrice,
        loading : state.burgerOrder.loading,
        purchase: state.burgerOrder.purchase
    }
};

const mapDispatchtoProps = dispatch => {
    return {
        PurchaseOrders : (orders) => dispatch(actionCreators.purchaseOrders(orders)),
        FetchBurgerInitials : () => dispatch(actionCreators.fetchBurgerInitials()),
    }
}


export default connect(mapStatetoProps,mapDispatchtoProps)(WithErorHandler(Customer,axios));