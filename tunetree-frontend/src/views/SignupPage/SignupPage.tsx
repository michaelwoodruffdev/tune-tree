import React, { Component } from 'react';
import TextInput from '../../components/TextInput/TextInput';
import Button from '../../components/Button/Button';
import config from '../../config.json';
import styles from '../SigninPage/SigninSignupPage.module.css';
import Modal from '../../components/Modal/Modal';

interface State {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    showModal: boolean;
    modalText: string;
    modalButtonText: string; 
    modalClickFunction: () => any;
}

class SigninPage extends Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            showModal: false,
            modalText: '',
            modalButtonText: '',
            modalClickFunction: () => { }
        }

        this.setUsername = this.setUsername.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.setConfirmPassword = this.setConfirmPassword.bind(this);
        this.setPassword = this.setPassword.bind(this);
        this.signUp = this.signUp.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.testYesNoModal = this.testYesNoModal.bind(this);
    }

    closeModal() {
        this.setState({ showModal: false });
    }

    setUsername(newValue: string) {
        this.setState({ username: newValue });
    }

    setEmail(newValue: string) {
        this.setState({ email: newValue });
    }

    setConfirmPassword(newValue: string) {
        this.setState({ confirmPassword: newValue });
    }

    setPassword(newValue: string) {
        this.setState({ password: newValue });
    }

    testYesNoModal() {

    }

    signUp() {
        if (this.state.password !== this.state.confirmPassword) {
            this.setState({ showModal: true, modalText: 'Passwords don\'t match', modalButtonText: 'Continue', modalClickFunction: this.closeModal });
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
                {
                    this.state.showModal &&
                    <Modal modalText={this.state.modalText} onClickFunction={this.state.modalClickFunction} />
                }
            </div>
        );
    }
}

export default SigninPage;