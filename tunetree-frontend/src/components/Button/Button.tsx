import React, { Component } from 'react';
import styles from './Button.module.css';

interface Props {
    onClickFunction?: () => any;
    buttonText: string;
    extraStyle?: string;
}

class Button extends Component<Props> {
    constructor(props: Props) {
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