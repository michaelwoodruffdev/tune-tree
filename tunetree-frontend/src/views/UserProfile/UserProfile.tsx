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

    constructor(props: UserProfileProps) {
        super(props);
        this.state = {};
        this.imageRef = React.createRef();

        this.submitProfilePicture = this.submitProfilePicture.bind(this);
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
                window.alert(res.error);
            });
    }

    render() {
        return (
            <div className={styles.UserProfile}>
                <input type="file" ref={this.imageRef} />
                <Button buttonText="test" onClickFunction={this.submitProfilePicture} />
            </div>
        );
    }
}

export default UserProfile;