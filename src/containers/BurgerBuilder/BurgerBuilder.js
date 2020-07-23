import React, { Component } from 'react';
import Auxilary from '../../hoc/Auxilary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';
import WithErrorHandler from '../../hoc/WithErrorHandler';

import classes from './BurgerBuilder.module.css';

import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/actions';

//use export in class to stripe it out from export default with connect for test
export class BurgerBuilder extends Component {
    state = {
        orderable:false,
        modalStatus:false,
        loading:false,
        customer:null,
        message: 'Something went wrong!!'
    }

    componentDidMount = () => {
        this.props.FetchBurgerInitials();
    }

    continueCheckout = () => {
        this.props.history.push('/checkout');
    }

    openModal = () => {
        if(this.props.isAuth)
            this.setState({modalStatus:true});
        else {
            this.props.SetRedirectPath('/checkout');
            this.props.history.push('/auth');
        }
    }

    cancelModal = () => {
        this.setState({modalStatus:false});
    }

    checkOrderable = () => {
        const orderable = Object.keys(this.props.ingredients).map((ingKey)=>{
            return this.props.ingredients[ingKey];
        }).reduce((sum,el)=> {
            return sum + el;
        },0)
        return orderable>0;
    }

    render() {
        const disabledInfo = {...this.props.ingredients};
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key]<=0
        }
        
        let orderSummary = null
        let burger = <Spinner/>
        let buildingControls = null
        if(!this.props.loading) {
            if(this.props.ingredients) {
                burger = <Burger ingredients={this.props.ingredients}/>
                
                buildingControls = <BuildControls 
                authenticate={this.props.isAuth}
                disabled={disabledInfo} 
                open={this.openModal}
                orderable={this.checkOrderable()}
                totalPrice = {this.props.totalPrice}
                addIngredient={this.props.AddIngredients}
                removeIngredient={this.props.RemoveIngredients}/>
    
                orderSummary = <OrderSummary 
                ingredients={this.props.ingredients}
                totalPrice={this.props.totalPrice}
                ingredientsPrice={this.props.ingredientsPrice}
                close={this.cancelModal}
                continue={this.continueCheckout}/>
            }
            else {
                burger = (
                    <div className={classes.BurgerBuilder}>
                        <p>{this.state.message}<br/>{this.props.error}</p>
                    </div>
                    );
            }
        }

        if(this.state.loading){
            orderSummary = <Spinner/>
        }
        
        return (
            <Auxilary>
                <Modal 
                show={this.state.modalStatus} 
                title="Your Ordered Burger has following ingredients:"
                close={this.cancelModal}>
                    {orderSummary}
                </Modal>
                {burger}
                {buildingControls}
            </Auxilary>
        );
    }
};

const mapStatetoProps = state => {
    return {
        ingredients : state.burgerBuilder.ingredients,
        totalPrice : state.burgerBuilder.totalPrice,
        ingredientsPrice : state.burgerBuilder.ingredientsPrice,
        buildingBurger : state.burgerBuilder.buildingBurger,
        loading : state.burgerBuilder.loading,
        error : state.burgerBuilder.error,
        isAuth : state.authUser.token !== null,
        redirectPath : state.authUser.redirectPath
    }
}

const mapDispatchtoProps = dispatch => {
    // params are passed from child component (Build Controls)
    return {
        AddIngredients : (ingName) => dispatch(actionCreators.addIngredients(ingName)),
        RemoveIngredients : (ingName) => dispatch(actionCreators.removeIngredients(ingName)),
        FetchBurgerInitials : () => dispatch(actionCreators.fetchBurgerInitials()),
        SetRedirectPath : (path) => dispatch(actionCreators.setRedirectPath(path))
    }
}

export default connect(mapStatetoProps,mapDispatchtoProps)(WithErrorHandler(BurgerBuilder,axios));