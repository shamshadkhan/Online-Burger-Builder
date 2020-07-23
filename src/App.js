import React, { Component } from 'react';
import {Route,Switch, Redirect} from 'react-router-dom';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';
import { connect } from 'react-redux';
import * as actionCreators from './store/actions/actions';
import AsynComponent from './hoc/AsyncComponent';

const asyncCheckout = AsynComponent(()=>{
  return import('./containers/Checkout/Checkout');
})

const asyncOrders = AsynComponent(()=>{
  return import('./containers/Orders/Orders');
})

const asyncAuth = AsynComponent(()=>{
  return import('./containers/Auth/Auth');
})

class App extends Component {

  componentDidMount = () => {
    this.props.IsLoggedIn();
  }

  render () {
    let route = (
      <Switch>
        <Route path="/auth" exact component={asyncAuth}/>
        <Route path="/" exact component={BurgerBuilder}/>
        <Redirect to="/"/>
      </Switch>
    )
    
    if(this.props.isAuth) {
      route = (
        <Switch>
          <Route path="/orders" component={asyncOrders}/>
          <Route path="/checkout" component={asyncCheckout}/>
          <Route path="/auth" exact component={asyncAuth}/>
          <Route path="/logout" exact component={Logout}/>
          <Route path="/" exact component={BurgerBuilder}/>
          <Redirect to="/"/>
        </Switch>
      )
    }
    return (
      <div>
        <Layout>
          {route}
          {/* <Switch>
            <Route path="/orders" component={Orders}/>
            <Route path="/checkout" component={Checkout}/>
            <Route path="/auth" exact component={Auth}/>
            <Route path="/logout" exact component={Logout}/>
            <Route path="/" exact component={BurgerBuilder}/>
            <Redirect to="/"/>
          </Switch> */}
        </Layout>
      </div>
    );
  }
}

const mapStatetoProps = state => {
  return {
    isAuth : state.authUser.token !== null
  }
}

const mapDispatchtoProps = dispath => {
  return {
    IsLoggedIn : () => dispath(actionCreators.isLoggedIn())
  }
}

export default connect(mapStatetoProps,mapDispatchtoProps)(App);
