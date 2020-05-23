import React, { Component } from 'react';
import styles from './TextInput.module.css';

interface Props {
    password?: boolean;
    placeholder?: string;
    changeFunction: (newValue: string) => any
}

class TextInput extends Component<Props> {
    constructor(props: Props) {
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
