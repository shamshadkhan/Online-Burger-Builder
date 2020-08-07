import React, { Component } from 'react';
import {Route,Switch, Redirect, withRouter} from 'react-router-dom';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';
import { connect } from 'react-redux';
import * as actionCreators from './store/actions/actions';
import AsynComponent from './hoc/AsyncComponent';
import AuthContext from './hoc/AuthContext';

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
  state = {
    isLoading : true
  }

  async componentDidMount() {
    await this.props.IsLoggedIn();
    this.setState({isLoading:false});
  }

  render () {
    let route = null;
    if(!this.state.isLoading){
      route = (
        <Switch>
          <Route path="/auth" component={asyncAuth}/>
          <Route path="/" exact component={BurgerBuilder}/>
          <Redirect to="/"/>
        </Switch>
      )
      
      if(this.props.isAuth) {
        route = (
          <Switch>
            <Route path="/checkout" component={asyncCheckout}/>
            <Route path="/orders" component={asyncOrders}/>
            <Route path="/auth" component={asyncAuth}/>
            <Route path="/logout" component={Logout}/>
            <Route path="/" exact component={BurgerBuilder}/>
            <Redirect to="/"/>
          </Switch>
        )
      }
    }
    return (
      <div>
        <AuthContext.Provider value={{isAuth:this.props.isAuth}}>
          <Layout>
            {route}
          </Layout>
        </AuthContext.Provider>
      </div>
    );
  }
}

const mapStatetoProps = state => {
  return {
    isAuth : state.authUser.token !== null
  }
}

const mapDispatchtoProps = dispatch => {
  return {
    IsLoggedIn : () => dispatch(actionCreators.isLoggedIn())
  }
}

export default withRouter(connect(mapStatetoProps,mapDispatchtoProps)(App));
