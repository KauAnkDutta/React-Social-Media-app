import React from 'react';
import '../styles/Online.css';

function Online({user}){
    const PF = "https://react-js-tribe-app.herokuapp.com/images/";

    return (
        <li className="rightbar_online_friends">
            <div className="online_frnd_img_container">
                <img src={PF + user.profilePicture} alt="profile-pic" className="online_user_pic"/>

                <span className="online"></span>
            </div>

            <span className="online_user">
                {user.username}
            </span>
        </li>
    )
}

export default Online;