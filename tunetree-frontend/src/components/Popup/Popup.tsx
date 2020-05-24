import React, { Component } from 'react';
import styles from './Popup.module.css';
import Button from '../Button/Button';

interface Props {
    popupText: string,
    buttonText: string,
    onClickFunction: () => any
}

class Popup extends Component<Props> {
    constructor(props: Props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div className={styles.Popup}>
                <p>{this.props.popupText}</p>
                <Button buttonText={this.props.buttonText} onClickFunction={this.props.onClickFunction} />
            </div>
        );
    }
}

export default Popup;