import * as React from 'react';
import styles from './Home.module.css';

export interface HomeProps {
    
}
 
export interface HomeState {
    
}
 
class Home extends React.Component<HomeProps, HomeState> {
    constructor(props: HomeProps) {
        super(props);
        this.state = { };
    }
    render() { 
        return (
            <div className={styles.Home}>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi nobis, a ab iste sed consequuntur sapiente quisquam numquam! Repellat, soluta.
            </div>
        );
    }
}
 
export default Home;