import React, { Component } from 'react';
import styles from './TextInput.module.css';

class TextInput extends Component {
    constructor(props) {
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
