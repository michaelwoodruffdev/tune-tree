import React from 'react';
import DashboardHeader from '../../components/DashboardHeader/DashboardHeader';
import Sidebar from '../../components/Sidebar/Sidebar';
import config from '../../config.json';
import UserProfile from '../UserProfile/UserProfile';
import { Route, Switch } from 'react-router-dom';
import styles from './Dashboard.module.css';
import Home from '../Home/Home';

export interface DashboardProps {
    match: any;
};

export interface DashboardState {
    isSidebarCollapsed: boolean;
};

class Dashboard extends React.Component<DashboardProps, DashboardState> {
    sidebarAndContentRef: React.RefObject<HTMLDivElement>;

    constructor(props: DashboardProps) {
        super(props);
        this.state = {
            isSidebarCollapsed: false
        }

        this.sidebarAndContentRef = React.createRef();

        this.toggleSidebar = this.toggleSidebar.bind(this);
    }

    toggleSidebar() {
        console.log('time to toggle');
        if (this.state.isSidebarCollapsed) {
            this.sidebarAndContentRef.current!.style.left = '0rem';
            this.sidebarAndContentRef.current!.style.width = '100%';
            this.setState({ isSidebarCollapsed: false });
        }
        else {
            this.sidebarAndContentRef.current!.style.left = '-15rem';
            this.sidebarAndContentRef.current!.style.width = 'calc(100% + 15rem)';
            this.setState({ isSidebarCollapsed: true });
        }
    }

    render() {
        return (
            <div>
                <DashboardHeader />
                <div className={styles.sidebarAndContent} ref={this.sidebarAndContentRef}>
                    <Sidebar linkGroups={config.SIDEBAR_LINK_GROUPS} toggleSidebar={this.toggleSidebar} />
                    <div className={styles.mainContent}>
                        <Switch>
                            <Route exact path={`${this.props.match.path}/profile`} component={UserProfile} />
                            <Route exact path={`${this.props.match.path}/home`} component={Home} />
                        </Switch>
                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard;