import React from 'react';
import styles from './IconButton.module.css';

interface IconButtonProps {
    onClickFunction?: () => any;
    iconInfo: string;
    extraStyle?: string;
}

class IconButton extends React.Component<IconButtonProps> {
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