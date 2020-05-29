import * as React from 'react';
import styles from './SidebarLink.module.css';
import { LinkInfo } from './Sidebar';
import { Link } from 'react-router-dom';

export interface SidebarLinkProps {
    link: LinkInfo;
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
            <Link to={this.props.link.route} style={{ textDecoration: 'none' }}>
                <div className={styles.SidebarLink}>
                    <i className={`${this.props.link.iconInfo} ${styles.linkIcon}`}></i>
                    <p className={styles.title}>{this.props.link.title}</p>
                </div>
            </Link>
        );
    }
}

export default SidebarLink;