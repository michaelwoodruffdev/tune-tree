import React from 'react';
import DashboardHeader from '../../components/DashboardHeader/DashboardHeader';
import Sidebar from '../../components/Sidebar/Sidebar';
import config from '../../config.json';

export interface DashboardProps { };

export interface DashboardState { };

class Dashboard extends React.Component<DashboardProps, DashboardState> {
    constructor(props: DashboardProps) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div>
                <DashboardHeader />
                <Sidebar linkGroups={config.SIDEBAR_LINK_GROUPS} />
            </div>
        );
    }
}

export default Dashboard;