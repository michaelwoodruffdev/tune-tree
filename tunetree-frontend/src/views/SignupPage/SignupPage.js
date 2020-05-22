import React, { Component } from 'react';
import TextInput from '../../components/TextInput/TextInput.js';
import styles from '../SigninPage/SigninSignupPage.module.css';
import Button from '../../components/Button/Button.js';
import config from '../../config.json';

class SigninPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
        }

        this.setUsername = this.setUsername.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.setConfirmPassword = this.setConfirmPassword.bind(this);
        this.setPassword = this.setPassword.bind(this);

        this.signUp = this.signUp.bind(this);
    }

    setUsername(newValue) {
        this.setState({ username: newValue });
    }

    setEmail(newValue) {
        this.setState({ email: newValue });
    }

    setConfirmPassword(newValue) {
        this.setState({ confirmPassword: newValue });
    }

    setPassword(newValue) {
        this.setState({ password: newValue });
    }

    signUp() {
        if (this.state.password !== this.state.confirmPassword) {
            window.alert('passwords don\'t match');
            return;
        }

        let signupObject = {
            username: this.state.username,
            password: this.state.password,
            email: this.state.email
        }

        fetch(`${config.SERVER_URL}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(signupObject)
        })
            .then(res => {
                if (res.status === 200) {
                    window.alert('account created');
                    window.location.href = 'signin';
                }
                else {
                    window.alert('an error occured');
                }
            });
    }

    render() {
        return (
            <div className={styles.SigninSignupPage}>
                <div className={styles.formContainer}>
                    <h1 className={styles.title}>Sign up</h1>
                    <TextInput changeFunction={this.setUsername} placeholder="username" />
                    <TextInput changeFunction={this.setEmail} placeholder="email (we will never spam)" />
                    <TextInput changeFunction={this.setPassword} placeholder="password" password />
                    <TextInput changeFunction={this.setConfirmPassword} placeholder="confirm password" password />
                    <Button onClickFunction={this.signUp} buttonText="Submit" />
                    <div className={styles.formFooter}>
                        <p className={styles.formFooterP}>Already have an account? <a href="/signin">Sign In</a></p>
                        <a className={styles.formFooterA} href="/">Go Back</a>
                    </div>
                </div>
            </div>
        );
    }
}

export default SigninPage;