import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import * as actionCreators from '../../store/actions/actions';

import classes from './Auth.module.css';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import Alertbox from '../../components/UI/Alertbox/Alertbox';
import { Redirect } from 'react-router';
import { validateForm } from '../../utility/utility';

class Auth extends Component {

   constructor(props) {
       super(props);
       this.state = {
            user : {
                name : {
                    label : 'Name',
                    value : '',
                    touched : false,
                    valid : false,
                    validation : {
                        required : true,
                        minLength : 6,
                        message : 'Field Required (min 5 Char)'
                    },
                    config : {
                        type : 'text',
                        placeholder : 'Enter Name'
                    }
                },
                email :  {
                    label : 'Email',
                    value : '',
                    touched : false,
                    valid : false,
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
                password :  {
                    label : 'Password',
                    value : '',
                    touched : false,
                    valid : false,
                    validation : {
                        required : true,
                        minLength : 4
                    },
                    config : {
                        type : 'password',
                        placeholder : 'Enter Password'
                    }
                }
            },
            isSignUp : true,
            formValid : false,
        }
    }

    toggleAuthenticateForm = () => {
        this.setState(prevState => {
            return {
                isSignUp : !prevState.isSignUp
            }
        })
    }  

    onChangeUserInfo = (event,field) => {
        let updatedUser = {...this.state.user};
        let updatedUserField = {...this.state.user[field]};
        updatedUserField.value = event.target.value;
        updatedUserField.touched = true;
        updatedUserField.valid = validateForm(updatedUserField.value,updatedUserField.validation);
        updatedUser[field] = updatedUserField;
        let allFieldValid = true;
        for (const key in updatedUser) {
            if((!this.state.isSignUp && key === 'name')) {
                continue;
            }
            allFieldValid = updatedUser[key].valid && allFieldValid;
        }
        this.setState({user:updatedUser, formValid:allFieldValid});
    }

    continueAuthenticate = () => {
        let data = {};
        if(!this.state.isSignUp) {
            data = {
                email : this.state.user.email.value,
                password : this.state.user.password.value
            }
        }
        else {
            data = {
                name : this.state.user.name.value,
                email : this.state.user.email.value,
                password : this.state.user.password.value
            }
        }
        this.props.AuthenticateUser(data,this.state.isSignUp);
    }

    componentDidMount = () => {
        if(!this.props.buildingBurger && this.props.redirectPath !== "/") {
            this.props.SetRedirectPath();
        }
    }

    render() {
        const inputElementArray = [];
        for (const element in this.state.user) {
            if((!this.state.isSignUp && element === 'name')) {
                continue;
            }
            inputElementArray.push({
                id : element,
                config : this.state.user[element].config
            })
        }
        let alertbox = null;
        let form = inputElementArray.map(input => {
                return <Input
                        key={input.id}
                        value={input.value}
                        inputtype={input.config.type}
                        label={this.state.user[input.id].label} 
                        config={input.config}
                        validity={this.state.user[input.id].valid}
                        touched={this.state.user[input.id].touched}
                        errormessage = {this.state.user[input.id].validation.message}
                        changed={(e) => {this.onChangeUserInfo(e,input.id)}}/>
            });
        let authRedirect = null;
        if(this.props.loading) {
            form = <Spinner/>
        }
        if(this.props.error) {
            alertbox = <Alertbox btnType="Danger" label={this.props.error.status} message={this.props.error.data.message}/>
        }
        else if(this.props.userInfo) {
            const message = this.props.userInfo.data.message ? this.props.userInfo.data.message : 'Success';
            alertbox = <Alertbox btnType="Success" label={this.props.userInfo.status} message={message}/>
        }
        if(this.props.isAuth) {
            authRedirect = <Redirect to={this.props.redirectPath} />
        }
        return (
            <div className={classes.Auth}>
                {authRedirect}
                <div className={classes.AuthForm}>
                    {alertbox}
                    {form}
                    <Button btnType="Ok" clicked={this.continueAuthenticate} disabled={!this.state.formValid}>Submit</Button>
                    <p onClick={this.toggleAuthenticateForm} className={classes.Link}>Click to {this.state.isSignUp? 'SignIn' : 'SignUp'}</p>
                </div>
            </div>
        );
    }
}

const mapStatetoProps = state => {
    return {
        userInfo : state.authUser.user,
        loading : state.authUser.loading,
        error : state.authUser.error,
        redirectPath : state.authUser.redirectPath,
        buildingBurger : state.burgerBuilder.buildingBurger,
        isAuth : state.authUser.token !== null
    }
}

const mapDispatchtoProps = dispatch => {
    return {
        AuthenticateUser : (authData,isSignUp) => dispatch(actionCreators.authenticateUser(authData,isSignUp)),
        SetRedirectPath : () => dispatch(actionCreators.setRedirectPath("/"))
    }
};

export default connect(mapStatetoProps,mapDispatchtoProps)(Auth);