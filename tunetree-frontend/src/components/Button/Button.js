import React, { Component } from 'react';
import styles from './Button.module.css';

class Button extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() { 
        return (
            <button onClick={this.props.onClickFunction} className={`${styles.buttonStyle} ${this.props.extraStyle}`}>{this.props.buttonText}</button>
        );
    }
}
 
export default Button;