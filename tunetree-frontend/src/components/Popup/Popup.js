import React, { Component } from 'react';
import styles from './Popup.module.css';
import Button from '../Button/Button.js';

class Popup extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() { 
        return (
            <div className={styles.Popup}>
                <p>{this.props.popupText}</p>
                <Button buttonText={this.props.buttonText} onClickFunction={this.props.onClickFunction}/>
            </div>
        );
    }
}
 
export default Popup;