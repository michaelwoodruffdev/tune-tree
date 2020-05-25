import React, { Component } from 'react';
import TextInput from '../../components/TextInput/TextInput';
import Button from '../../components/Button/Button';
import config from '../../config.json';
import styles from '../SigninPage/SigninSignupPage.module.css';
import Modal from '../../components/Modal/Modal';
import { Redirect } from 'react-router-dom';

interface State {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    showModal: boolean;
    modalText: string;
    modalButtonText: string;
    modalClickFunction: () => any;
    toSignin: boolean;
    toLanding: boolean;
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
            modalClickFunction: () => { },
            toSignin: false,
            toLanding: false
        }

        this.setUsername = this.setUsername.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.setConfirmPassword = this.setConfirmPassword.bind(this);
        this.setPassword = this.setPassword.bind(this);
        this.signUp = this.signUp.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.redirectToSignin = this.redirectToSignin.bind(this);
        this.redirectToLanding = this.redirectToLanding.bind(this);
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
            .then(res => res.json())
            .then(res => {
                if (res.error) {
                    this.setState({ showModal: true, modalText: res.error, modalClickFunction: this.closeModal });
                }
                else {
                    this.setState({ showModal: true, modalText: 'Signup successful', modalClickFunction: this.redirectToSignin });
                }
            });
    }

    redirectToLanding() {
        this.setState({ toLanding: true });
    }

    redirectToSignin() {
        this.setState({ toSignin: true });
    }

    render() {
        if (this.state.toSignin) {
            return <Redirect to="/signin" />
        }
        if (this.state.toLanding) {
            return <Redirect to="/" />
        }

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
                        <p className={styles.formFooterP}>Already have an account? <a className={styles.formFooterA} onClick={this.redirectToSignin}>Sign In</a>
                        </p>
                        <a className={styles.formFooterA} onClick={this.redirectToLanding}>Go Back</a>
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