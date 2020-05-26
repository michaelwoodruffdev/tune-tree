import React from 'react';
import TextInput from '../../components/TextInput/TextInput';
import Button from '../../components/Button/Button';
import config from '../../config.json';
import styles from './SigninSignupPage.module.css';
import Modal from '../../components/Modal/Modal';
import '../../globalStyles/transitions.css';
import { Redirect } from 'react-router-dom';

export interface SigninPageProps {};

export interface SigninPageState {
    username: string;
    password: string;
    showModal: boolean;
    modalText: string;
    modalButtonText: string;
    modalClickFunction: () => any;
    toDashboard: boolean;
    toSignup: boolean;
    toLanding: boolean;
};

class SigninPage extends React.Component<SigninPageProps, SigninPageState> {
    constructor(props: SigninPageProps) {
        super(props);
        this.closeModal = this.closeModal.bind(this);
        this.state = {
            username: '',
            password: '',
            showModal: false,
            modalText: '',
            modalButtonText: '',
            modalClickFunction: this.closeModal, 
            toDashboard: false, 
            toSignup: false, 
            toLanding: false
        }

        this.setUsername = this.setUsername.bind(this);
        this.setPassword = this.setPassword.bind(this);
        this.signIn = this.signIn.bind(this);
        this.redirectToSignup = this.redirectToSignup.bind(this);
        this.redirectToLanding = this.redirectToLanding.bind(this);
    }

    closeModal() {
        this.setState({ showModal: false });
    }

    setUsername(newValue: string) {
        this.setState({ username: newValue });
    }

    setPassword(newValue: string) {
        this.setState({ password: newValue });
    }

    redirectToSignup() {
        this.setState({ toSignup: true });
    }

    redirectToLanding() {
        this.setState({ toLanding: true });
    }

    signIn() {
        fetch(`${config.SERVER_URL}/signin`, {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(res => {
                if (res.error) {
                    this.setState({ showModal: true, modalText: res.error, modalClickFunction: this.closeModal });
                    return;
                }
                else {
                    localStorage.setItem(config.TOKEN_KEY, res.token);
                    this.setState({ toDashboard: true });
                }
            })
    }

    render() {
        if (this.state.toDashboard) {
            return <Redirect to='/dashboard' />
        }
        if (this.state.toSignup) {
            return <Redirect to="/signup" />
        }
        if(this.state.toLanding) {
            return <Redirect to="/" />
        }

        return (
            <div className={styles.SigninSignupPage}>
                <div className={styles.formContainer}>
                    <h1 className={styles.title}>Sign in</h1>
                    <TextInput changeFunction={this.setUsername} placeholder="username or email" />
                    <TextInput changeFunction={this.setPassword} placeholder="password" password />
                    <Button onClickFunction={this.signIn} buttonText="Submit" />
                    <div className={styles.formFooter}>
                        <p className={styles.formFooterP}>Don't have an account? <p className={styles.formFooterA} onClick={this.redirectToSignup}>Sign Up</p></p>
                        <p className={styles.formFooterA} onClick={this.redirectToLanding}>Go Back</p>
                    </div>
                    {
                        this.state.showModal &&
                        <Modal modalText={this.state.modalText} buttonText={this.state.modalButtonText} onClickFunction={this.state.modalClickFunction} />
                    }
                </div>
            </div>
        );
    }
}

export default SigninPage;