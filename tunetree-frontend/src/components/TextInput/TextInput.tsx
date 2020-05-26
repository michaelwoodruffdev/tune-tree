import React, { Component } from 'react';
import styles from './TextInput.module.css';

export interface TextInputProps {
    password?: boolean;
    placeholder?: string;
    changeFunction: (newValue: string) => any
}

export interface TextInputState { };

class TextInput extends Component<TextInputProps, TextInputState> {
    constructor(props: TextInputProps) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <input className={styles.textInput} type={this.props.password ? 'password' : 'text'} onChange={evt => this.props.changeFunction(evt.target.value)} placeholder={this.props.placeholder}></input>
        );
    }
}

export default TextInput;
