import * as React from 'react';
import styles from './SidebarLink.module.css';
import { Link } from './Sidebar';

export interface SidebarLinkProps {
    link: Link;
    activeLink: string | null;
}

export interface SidebarLinkState { };

class SidebarLink extends React.Component<SidebarLinkProps, SidebarLinkState> {
    constructor(props: SidebarLinkProps) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div className={styles.SidebarLink}>
                <i className={`${this.props.link.iconInfo} ${styles.linkIcon}`}></i>
                <p className={styles.title}>{this.props.link.title}</p>
            </div>
        );
    }
}

export default SidebarLink;