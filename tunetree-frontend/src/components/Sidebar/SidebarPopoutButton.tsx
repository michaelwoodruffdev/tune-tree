import * as React from 'react';
import styles from './SidebarPopoutButton.module.css';

export interface SidebarPopoutButtonProps {
    onClickFunction: () => any
}

export interface SidebarPopoutButtonState { };

class SidebarPopoutButton extends React.Component<SidebarPopoutButtonProps, SidebarPopoutButtonState> {
    constructor(props: SidebarPopoutButtonProps) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div className={styles.SidebarPopoutButton} onClick={this.props.onClickFunction}>
                <i className={`fas fa-bars fa-2x ${styles.popoutIcon}`}></i>
            </div>
        );
    }
}

export default SidebarPopoutButton;