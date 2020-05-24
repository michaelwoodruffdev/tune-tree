import * as React from 'react';
import styles from './SidebarLinkGroup.module.css';
import { LinkGroup } from './Sidebar';
import SidebarLink from './SidebarLink';

export interface SidebarLinkGroupProps {
    activeLink: string | null;
    linkGroup: LinkGroup;
}

export interface SidebarLinkGroupState {

}

class SidebarLinkGroup extends React.Component<SidebarLinkGroupProps, SidebarLinkGroupState> {
    constructor(props: SidebarLinkGroupProps) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div className={styles.SidebarLinkGroup}>
                {this.props.linkGroup.title && <p className={styles.title}>{this.props.linkGroup.title}</p>}
                {this.props.linkGroup.links.map(link => (
                    <SidebarLink link={link} activeLink={this.props.activeLink} key={link.title}/>
                ))}
            </div>
        );
    }
}

export default SidebarLinkGroup;