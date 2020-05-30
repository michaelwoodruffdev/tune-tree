import * as React from 'react';
import styles from './UserProfile.module.css';
import Button from '../../components/Button/Button';
import config from '../../config.json';

export interface UserProfileProps {

};

export interface UserProfileState {

};

class UserProfile extends React.Component<UserProfileProps, UserProfileState> {
    imageRef: React.RefObject<HTMLInputElement>;
    profilePicRef: React.RefObject<HTMLImageElement>;

    constructor(props: UserProfileProps) {
        super(props);
        this.state = {};
        this.imageRef = React.createRef();
        this.profilePicRef = React.createRef();

        this.submitProfilePicture = this.submitProfilePicture.bind(this);
        this.getProfilePicture = this.getProfilePicture.bind(this);
    }

    submitProfilePicture() {
        let blobFile;
        if (!this.imageRef.current) {
            blobFile = null;
            window.alert("error with ref?");
        }
        else if (!this.imageRef.current.files) {
            blobFile = null;
            window.alert("no file chosen");
        }
        else {
            blobFile = this.imageRef.current.files[0];
        }
        console.log(blobFile);
        const formData = new FormData();
        formData.append('imageData', blobFile);
        console.log(formData);
        let requestObject = {
            token: localStorage.getItem(config.TOKEN_KEY),
            imageData: formData
        }
        fetch(`${config.SERVER_URL}/update-profile-picture`, {
            method: 'POST',
            credentials: 'include',
            body: formData
        })
            .then(res => res.json())
            .then(res => {
                if (res.error) {
                    window.alert(res.error);
                }
                else {
                    this.getProfilePicture();
                }
            });
    }

    getProfilePicture() {
        let requestObject = {
            username: localStorage.getItem('username')
        }
        fetch(`${config.SERVER_URL}/get-profile-picture`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestObject)
        })
            .then(res => res.json())
            .then(res => {
                console.log(res);
                this.profilePicRef.current!.src = `data:image/png;base64,${res.image.data}`;
            });
    }

    componentDidMount() {
        this.getProfilePicture();
    }

    render() {
        return (
            <div className={styles.UserProfile}>
                <div className={styles.profileHeader}>
                    <div className={styles.profilePicContainer}>
                        <img ref={this.profilePicRef} className={styles.profilePic} />
                    </div>
                    <div className={styles.profileInfo}>
                        <h1 className={styles.username}>Doggy the User</h1>
                    </div>
                </div>
                <input type="file" ref={this.imageRef} />
                <Button buttonText="test" onClickFunction={this.submitProfilePicture} />
            </div>
        );
    }
}

export default UserProfile;