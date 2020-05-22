import React, { Component } from 'react';
import styles from './LandingPage.module.css';
import Button from '../../components/Button/Button.js';
import { Link } from 'react-router-dom';

class LandingPage extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div className={styles.landingPage}>
                <div className={styles.title}>
                    <img className={styles.titleLogo} src="tunetree-logo.png" alt="logo" />
                    <h1 className={styles.titleH1}>TuneTree</h1>
                    <h3 className={styles.titleH3}>See where your sounds will go</h3>
                </div>
                <div className={styles.infoBox}>
                    <p className={styles.infoBoxP}>TuneTree lets you collaborate with other musicians, piece by piece, until a tree of creativity is formed. You can see all the directions others have taken your sound, as well as take inspiration from others sounds. Get started today!</p>
                </div>
                <div className={styles.buttonRow}>
                    <Link to="/signin">
                        <Button buttonText="Sign In" />
                    </Link>
                    <Link to="/signup">
                        <Button buttonText="Sign Up" />
                    </Link>
                </div>
                <div className={styles.linkRow}>
                    <a href="http://www.github.com/michaelwoodruffdev/tune-tree">Visti Github</a> | <a href="http://www.github.com/michaelwoodruffdev/tune-tree">Continue as Guest</a>
                </div>
            </div>
        );
    }
}

export default LandingPage;