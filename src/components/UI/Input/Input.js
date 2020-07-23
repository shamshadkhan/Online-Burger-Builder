import React from 'react';

import classes from './Input.module.css';
import Auxilary from '../../../hoc/Auxilary';

const Input = (props) => {
    let inputElement = null;
    let fieldValid = !props.validity && props.touched;
    switch (props.inputtype) {
        case 'input': inputElement = <input {...props.config} value={props.value} onChange={props.changed} className={fieldValid? classes.Error: ''}/>;          
            break;
        case 'textarea': inputElement = <textarea {...props.config} value={props.value} onChange={props.changed} className={fieldValid? classes.Error: ''}/>;
            break;
        case 'select': inputElement = (
        <select value={props.value} onChange={props.changed} className={fieldValid? classes.Error: ''}>
            {
            props.config.options.map(option => {
                return <option key={option.value} value={option.value}>{option.label}</option>
            })}
        </select>);
            break;
        default: inputElement = <input {...props.config} value={props.value} onChange={props.changed} className={fieldValid? classes.Error: ''}/>;
            break;
    }
    return(
        <Auxilary>
            <div className={classes.Input}>
                <label>{props.label}</label>
                {inputElement}
            </div>
            {
                fieldValid ?  <p className={classes.ErrorMessage}>{props.errormessage}</p>: null
            }
            
        </Auxilary>
    );
}

export default Input;