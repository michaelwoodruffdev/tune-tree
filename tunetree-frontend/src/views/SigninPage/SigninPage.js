import React, { Component } from 'react';
import TextInput from '../../components/TextInput/TextInput.js';
import styles from './SigninPage.module.css';
import Button from '../../components/Button/Button.js';

class SigninPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '', 
            password: ''
        }

        this.setUsername = this.setUsername.bind(this);
        this.setPassword = this.setPassword.bind(this);
    }

    setUsername(newValue) {
        this.setState({ username: newValue });
    }

    setPassword(newValue) {
        this.setState({ password: newValue });
    }

    signIn() {
        console.log('time to sign in');
    }

    render() { 
        return (
            <div className={styles.formContainer}>
                <h1 className={styles.title}>Sign in</h1>
                <TextInput changeFunction={this.setUsername} placeholder="username"/>
                <TextInput changeFunction={this.setPassword} placeholder="password"/>
                <Button extraStyle={styles.buttonStyle} onClickFunction={this.signIn} buttonText="Submit" />
            </div>
        );
    }
}
 
export default SigninPage;