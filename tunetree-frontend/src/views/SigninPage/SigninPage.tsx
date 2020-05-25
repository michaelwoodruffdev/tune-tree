import React from 'react';
import TextInput from '../../components/TextInput/TextInput';
import Button from '../../components/Button/Button';
import config from '../../config.json';
import styles from './SigninSignupPage.module.css';
import Modal from '../../components/Modal/Modal';
import '../../globalStyles/transitions.css';

export interface SigninPageProps {

}

export interface SigninPageState {
    username: string;
    password: string;
    showModal: boolean;
    modalText: string;
    modalButtonText: string;
    modalClickFunction: () => any
}

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
            modalClickFunction: this.closeModal
        }

        this.setUsername = this.setUsername.bind(this);
        this.setPassword = this.setPassword.bind(this);
        this.signIn = this.signIn.bind(this);
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

    signIn() {
        fetch(`${config.SERVER_URL}/signin`, {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                if (res.status === 200) {
                    return res.json();
                }
                else {
                    return null;
                }
            })
            .then(res => {
                if (res) {
                    localStorage.setItem(config.TOKEN_KEY, res.token);
                    window.location.href = '/dashboard';
                }
                else {
                    this.setState({ modalText: 'Invalid username or password', modalButtonText: 'Continue', showModal: true });
                }
            })
    }

    render() {
        return (
            <div className={styles.SigninSignupPage}>
                <div className={styles.formContainer}>
                    <h1 className={styles.title}>Sign in</h1>
                    <TextInput changeFunction={this.setUsername} placeholder="username or email" />
                    <TextInput changeFunction={this.setPassword} placeholder="password" password />
                    <Button onClickFunction={this.signIn} buttonText="Submit" />
                    <div className={styles.formFooter}>
                        <p className={styles.formFooterP}>Don't have an account? <a href="/signup">Sign Up</a></p>
                        <a className={styles.formFooterA} href="/">Go Back</a>
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