import * as React from 'react';
import styles from './Sidebar.module.css';
import SidebarLinkGroup from './SidebarLinkGroup';
import SidebarPopoutButton from './SidebarPopoutButton';

export interface LinkInfo {
    title: string;
    route: string;
    iconInfo?: string;
}

export interface LinkGroup {
    title: string;
    links: Array<LinkInfo>
}

export interface SidebarProps {
    linkGroups?: Array<LinkGroup>;
    toggleSidebar: () => void;
}
 
export interface SidebarState {
    activeLink: string | null;
    // isCollapsed: boolean
}
 
class Sidebar extends React.Component<SidebarProps, SidebarState> {
    sidebarRef: React.RefObject<HTMLDivElement>;

    constructor(props: SidebarProps) {
        super(props);
        this.state = {
            activeLink: null, 
            // isCollapsed: false
        };

        this.sidebarRef = React.createRef();

        // this.toggleSidebar = this.toggleSidebar.bind(this);
    }

    // toggleSidebar() {
    //     // console.log(this.sidebarRef.current?.style.left!);
    //     if (this.state.isCollapsed) {
    //         this.sidebarRef.current!.style.left = '0rem';
    //         this.setState({ isCollapsed: false });
    //     }
    //     else {
    //         this.sidebarRef.current!.style.left = '-15rem';
    //         this.setState({ isCollapsed: true });
    //     }
    // }

    render() { 
        return (
            <div className={styles.Sidebar} ref={this.sidebarRef}>
                {this.props.linkGroups?.map(linkGroup => (
                    <SidebarLinkGroup activeLink={this.state.activeLink} linkGroup={linkGroup} key={linkGroup.title}/>
                ))}
                <SidebarPopoutButton onClickFunction={this.props.toggleSidebar}/>
            </div>
        );
    }
}
 
export default Sidebar;