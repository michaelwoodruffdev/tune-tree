import * as React from 'react';
import styles from './UserProfile.module.css';

export interface UserProfileProps {

};

export interface UserProfileState { 

};

class UserProfile extends React.Component<UserProfileProps, UserProfileState> {
    constructor(props: UserProfileProps) {
        super(props);
        this.state = { };
    }

    render() {
        return (
            <div className={styles.UserProfile}>
                Hello Profile Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti laboriosam alias impedit quas eos sapiente esse modi optio atque adipisci.
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nostrum vero rerum ipsa natus dolorem culpa, nisi nemo a voluptatibus modi possimus voluptate. Dignissimos, eos. Quam perspiciatis itaque similique tempore nulla non. Aut rem eum totam reiciendis illo quas incidunt repellat dignissimos blanditiis aperiam ducimus necessitatibus explicabo, inventore minus quae mollitia. Vero quisquam, iure dolorum temporibus ullam accusantium autem dignissimos facere rerum, hic necessitatibus. Nostrum sequi sint labore repellendus adipisci molestias mollitia tempora voluptates ut accusamus, alias eveniet ab, quisquam, doloremque soluta quae numquam cupiditate officia! Necessitatibus, atque! Officiis iste accusantium expedita vero doloribus amet veritatis sapiente non, odit assumenda ducimus voluptatum excepturi quae dicta similique dolor maxime necessitatibus molestias fugiat sint. Minima consectetur saepe officia perspiciatis quaerat maxime vitae soluta tempora, corrupti dolore. Iste atque nulla hic repellat quod! Odio veniam, delectus, doloribus nesciunt molestiae dolorum laboriosam eveniet temporibus aspernatur sunt voluptate corrupti quisquam architecto ad recusandae dolor expedita. Ipsum, sit suscipit quos modi illo dolor harum laborum reprehenderit nihil voluptatem repellendus quibusdam blanditiis neque cupiditate? Nam veniam quasi ducimus. Totam dignissimos excepturi libero deserunt veniam ea, quod delectus. Atque, corporis, voluptates et iste magni laborum a, nostrum omnis rem hic aliquid minus delectus harum numquam exercitationem dolorum. Quidem provident harum doloremque quas illo quis tempore ducimus sint optio. Ullam rem quaerat sunt reprehenderit error adipisci hic incidunt debitis laudantium commodi. Quibusdam accusamus amet ab numquam eveniet esse corrupti voluptas, dolores reiciendis commodi. Sapiente perferendis omnis aliquam perspiciatis asperiores voluptas dolores voluptate ipsum. Error, eius expedita voluptates perferendis similique distinctio reiciendis quos soluta dolor. Consequatur iusto explicabo, laudantium saepe cupiditate maxime, vero itaque excepturi incidunt ea nulla quod temporibus porro eum? Quod, minus natus earum eveniet ratione laborum deserunt incidunt similique facere tempora obcaecati autem, doloremque, corporis assumenda. Quam quia maiores voluptas sed, fugiat mollitia officia aperiam possimus deserunt esse velit, cum quo, molestias consequuntur impedit repudiandae. Aperiam itaque quasi debitis culpa sunt cumque recusandae aliquam ex natus necessitatibus, quod atque. Dolor voluptatum corrupti quia est, asperiores fuga? Voluptate harum quidem blanditiis labore repellat recusandae, modi, ea reprehenderit quod aliquam sunt quae placeat maxime sed ex nihil quisquam totam perferendis quaerat in minus mollitia? Optio voluptas reiciendis, rem esse modi, illum aspernatur in eligendi, ea adipisci nihil cum atque ut laboriosam alias architecto ab quibusdam excepturi eum iste non. Tenetur, odio cupiditate. Quod accusamus deleniti, ipsam molestiae accusantium ab aliquam perspiciatis reiciendis quia obcaecati quisquam! Quis doloremque sint expedita alias.
            </div>
        );
    }
}

export default UserProfile;