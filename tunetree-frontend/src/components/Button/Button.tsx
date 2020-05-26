import React, { Component } from 'react';
import styles from './Button.module.css';

export interface ButtonProps {
    onClickFunction?: () => any;
    buttonText: string;
    extraStyle?: string;
}

export interface ButtonState { };

class Button extends Component<ButtonProps, ButtonState> {
    constructor(props: ButtonProps) {
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