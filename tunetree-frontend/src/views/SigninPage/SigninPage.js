import React, { Component } from 'react';
import TextInput from '../../components/TextInput/TextInput.js';
import styles from './SigninSignupPage.module.css';
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
                <TextInput changeFunction={this.setUsername} placeholder="username or email"/>
                <TextInput changeFunction={this.setPassword} placeholder="password"/>
                <Button onClickFunction={this.signIn} buttonText="Submit" />
                <div className={styles.formFooter}>
                    <p className={styles.formFooterP}>Don't have an account? <a href="/signup">Sign Up</a></p>
                    <a className={styles.formFooterA} href="/">Go Back</a>
                </div>
            </div>
        );
    }
}
 
export default SigninPage;