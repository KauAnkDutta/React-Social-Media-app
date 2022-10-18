import React,{useEffect, useState, useContext} from "react";
import '../styles/Rightbar.css';
import {Users} from '../dummyData';
import Online from "./Online";
import {axiosInstance} from '../config';
import {NavLink} from 'react-router-dom';
import {AuthContext} from '../context/AuthContext';
import {Add, Remove, Chat} from '@material-ui/icons';

function Rightbar({username}){
    const [friends, setFriends] = useState([]);
    const {user: currentUser, dispatch} = useContext(AuthContext);
    const [user, setUser] = useState({});
    const [followed, setFollowed] = useState(false);
    const [currentChat, setCurrentChat] = useState(false)
    const PF = "https://react-js-tribe-app.herokuapp.com/images/";


    useEffect(() => {
        const fetchUser = async() => {
            if(username){
                    await axiosInstance.get(`/api/user?username=${username}`)
                    .then((res) => {
                        if(res.status === 200){
                    setUser(res.data)
                    }
                }).catch((error) => {
                    console.log(error)
                })
            }
        }
        fetchUser()
    }, [username])

    useEffect(() => {
        const getFriends = async() => {
            try {
                if(user._id){
                    const friendList = await axiosInstance.get(`/api/get/friends/${user._id}`)
                    setFriends(friendList.data)
                }
                
            } catch (error) {
                console.log(error)
            }
        }
        getFriends();
    }, [user._id])

    useEffect(() => {
        if(currentUser.following.includes(user._id) || currentUser.followers.includes(user._id)){
            setFollowed(true)
        }else{
            setFollowed(false)
        }
    }, [user._id])

    const follow_unfollow_handler = () => {
        try{
            if(followed){
                axiosInstance.put(`/api/user/${user._id}/unfollow`, {userId:currentUser._id})
                dispatch({
                    type: "UNFOLLOW", payload: user._id
                })
                window.location.reload()
            }else{
                axiosInstance.put(`/api/user/${user._id}/follow`, {userId: currentUser._id})
                dispatch({
                    type: "FOLLOW",
                    payload: user._id
                })
                window.location.reload()
            }
        }catch(error){
            console.log(error)
        }
        setFollowed(!followed)
    }

    useEffect(() => {
        const getConversations = async() => {
            try {
               const conversations = await axiosInstance.get(`/api/conversation/${currentUser._id}`) 
               if(user._id !== currentUser._id){
                const exist = conversations.data.some((c) => c.members.includes(user._id))
                setCurrentChat(exist)
               }
            } catch (error) {
                console.log(error)
            }
        }

        getConversations()
    }, [currentUser, user])

    const createChatHandler = async() => {
        const data = {
            senderId: currentUser._id,
            receiverId: user._id
        }
        try {
            await axiosInstance.post(`/api/conversation`, data)
            .then(res => {
                if(res.status === 200){
                    window.location.href = "/messenger";
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    const logoutHandler = () => {
        window.localStorage.removeItem("user")
        window.location.href = `/login`
    }

    const HomeRightBar = () => {
        return(
            <>
                <div className="rightbar_birthday_container">
                    <img src={PF + "gift.png"} className="gift_icon" alt="gift-img" />
                    <span className="birthday_text">
                        <b>Jack Morestan</b> and <b>2 other friends</b> have a birthday today.
                    </span>
                </div>

                <img src={PF + "addvertisement"} alt="Ad-img" className="rightbar_ad_img"/>

                <h4 className="rightbat_title">Online Friends</h4>

                <ul className="rightbar_friends_list">
                    {
                        Users.map((u) => (
                            <Online key={u.id} user={u} />
                        ))
                    }
                </ul>
            </>
        );
    };

    const ProfileRightbar = () => {
        return (
            <>  
                {user.username !== currentUser.username && (
                    <button className="right_follow_button" onClick={follow_unfollow_handler}>
                        {followed? "Unfollow" : "Follow"}
                        {followed? <Remove className="follow_btn"/> : <Add className="follow_btn"/>}
                    </button>
                )}

                {
                    user.username === currentUser.username && (
                        <button onClick={() => logoutHandler()} className="logout_btn">Logout</button>
                    )
                }

                {
                    user._id !== currentUser._id && (
                        <div className="chat_btn_container">
                            {
                                currentChat? <NavLink to={"/messenger"}><Chat className="chatIcon"/></NavLink> : <i onClick={() => createChatHandler()}><Chat className="chatIcon"/></i>
                            }
                        </div>
                    )
                }
                <h4 className="rightbar_title">User information</h4>
                <div className="rightbar_info">
                    <div className="rightbar_info_item">
                        <span className="rightbar_info_key">City:</span>
                        <span className="rightbar_info_value">{user.city}</span>
                    </div>
                    <div className="rightbar_info_item">
                        <span className="rightbar_info_key">From:</span>
                        <span className="rightbar_info_value">{user.from}</span>
                    </div>
                    <div className="rightbar_info_item">
                        <span className="rightbar_info_key">Relationship:</span>
                        <span className="rightbar_info_value">{user.relationship === 1
                            ?"Single"
                            : user.relationship === 2
                            ? "Married"
                            : "-"
                        }</span>
                    </div>

                    <h4 className="rightbar_title">User Friends</h4>

                    <div className="rightbar_followings">
                        {
                            
                            friends.map((friend) => (
                                <NavLink to={`/profile/${friend.username}`} style={{textDecoration:"none"}} key={friend._id}>
                                    <div className="rightbar_following" >
                                        <img src={friend.profilePicture? PF + friend.profilePicture: PF + "noAvatar.png"} alt="following_name" className="rightbar_following_img" />

                                        <span className="rightbar_following_name">{friend.username}</span>
                                    </div>
                                </NavLink>
                            ))
                        }
                    </div>
                </div>
            </>
        )
    }


    return(
        <div className="rightBar">
            <div className="rightbar_wrapper">
                {username? <ProfileRightbar/> : <HomeRightBar/>}
            </div>
        </div>
    )
}

export default Rightbar;