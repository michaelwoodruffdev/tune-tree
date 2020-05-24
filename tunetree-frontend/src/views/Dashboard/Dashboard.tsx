import React from 'react';
import DashboardHeader from '../../components/DashboardHeader/DashboardHeader';

class Dashboard extends React.Component {
    constructor(props: {}) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div>
                <DashboardHeader />
            </div>
        );
    }
}

export default Dashboard;