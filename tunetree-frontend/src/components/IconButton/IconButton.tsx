import React from 'react';
import styles from './IconButton.module.css';

export interface IconButtonProps {
    onClickFunction?: () => any;
    iconInfo: string;
    extraStyle?: string;
}

export interface IconButtonState { };

class IconButton extends React.Component<IconButtonProps, IconButtonState> {
    constructor(props: IconButtonProps) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <i className={`${this.props.iconInfo} ${styles.IconButton} ${this.props.extraStyle}`} onClick={this.props.onClickFunction}></i>
        );
    }
}

export default IconButton;