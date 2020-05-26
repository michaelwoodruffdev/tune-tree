import React from 'react';
import styles from './DashboardHeader.module.css';
import IconButton from '../IconButton/IconButton';

export interface DashboardHeaderProps { };

export interface DashboardHeaderState { };

class DashboardHeader extends React.Component<DashboardHeaderProps, DashboardHeaderState> {
    constructor(props: DashboardHeaderProps) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div className={styles.DashboardHeader}>
                <div className={styles.headerLeft}>
                    <img className={styles.logo} src="tunetree-logo.png" alt="" />
                    <h1 className={styles.headerTitle}>TuneTree</h1>
                </div>
                <div className={styles.headerRight}>
                    <IconButton iconInfo="fas fa-share fa-lg" />
                    <IconButton iconInfo="fas fa-cog fa-lg" />
                    <IconButton iconInfo="fas fa-user fa-lg" />
                </div>
            </div>
        );
    }
}

export default DashboardHeader;