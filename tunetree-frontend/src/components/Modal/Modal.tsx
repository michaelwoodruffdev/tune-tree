import React, { Component } from 'react';
import styles from './Modal.module.css';
import Button from '../Button/Button';
import { CSSTransition } from 'react-transition-group';
import '../../globalStyles/transitions.css';

export interface ModalProps {
    modalText: string;
    onClickFunction: (decision?: boolean) => any;
    buttonText?: string;
    yesNoModal?: boolean;
    noText?: string;
}

export interface ModalState {
    transitionIn: boolean;
}

class Modal extends Component<ModalProps, ModalState> {
    nodeRef: React.RefObject<HTMLDivElement>;

    constructor(props: ModalProps) {
        super(props);
        this.state = {
            transitionIn: false
        }

        this.nodeRef = React.createRef();
    }

    componentDidMount() {
        this.setState({ transitionIn: true });
    }
    componentWillUnmount() {
        this.setState({ transitionIn: false });
    }

    render() {
        return (
            <CSSTransition in={this.state.transitionIn} timeout={200} classNames="fadein" unmountOnExit nodeRef={this.nodeRef}>
                <div className={styles.Modal} ref={this.nodeRef}>
                    <div className={styles.modalBox}>
                        <p className={styles.modalText}>{this.props.modalText}</p>
                        {
                            this.props.yesNoModal ?
                                <div className={styles.buttonsRow}>
                                    <Button buttonText={this.props.noText || "Cancel"} onClickFunction={() => this.props.onClickFunction(false)} extraStyle={styles.cancelButton}/>
                                    <Button buttonText={this.props.buttonText || "Confirm"} onClickFunction={() => this.props.onClickFunction(true)} />
                                </div>
                                :
                                <Button buttonText={this.props.buttonText || "Continue"} onClickFunction={this.props.onClickFunction} extraStyle={styles.buttonStyle} />
                        }
                    </div>
                </div>
            </CSSTransition>
        );
    }
}

export default Modal;