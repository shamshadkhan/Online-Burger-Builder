import React, { Component } from 'react';
import * as actionCreators from '../../../store/actions/actions';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

class Logout extends Component {

    componentDidMount = () => {
        this.props.AuthLogout();
    }

    render () {
        return <Redirect to="/"/>
    }
}

const mapDispatchtoProps = dispatch => {
    return {
        AuthLogout : () => dispatch(actionCreators.authLogout())
    }
}

export default connect(null,mapDispatchtoProps)(Logout);