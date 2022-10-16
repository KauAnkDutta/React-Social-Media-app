import React from "react";
import '../styles/CloseFrineds.css';
import {NavLink} from 'react-router-dom';

function CloseFriends({user}){
    const PF = "https://react-js-tribe-app.herokuapp.com/images/";

    return(
        <NavLink to={`/profile/${user?.username}`} style={{textDecoration:"none"}}>
            <li className="sidebar_friend">
                <img src={user.profilePicture? PF + user.profilePicture: PF + "noAvatar.png"} alt="name" className="sidebar_friend_img" />

                <span className="sidebar_friend_name">{user?.username}</span>
            </li>
        </NavLink>
    )
}

export default CloseFriends;