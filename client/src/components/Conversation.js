import React, {useState, useEffect} from 'react';
import '../styles/Conversation.css';
import {axiosInstance} from '../config';

function Conversation({conversation, currentUser}){
    const [user, setUser] =  useState(null);
    const PF = "https://react-js-tribe-app.herokuapp.com/images/"

    useEffect(() => {
        const friendId = conversation.members.find(m => m !== currentUser._id )
        
        const getUser = async() => {
            try{
                const res = await axiosInstance.get(`/api/user?userId=${friendId}`)
                setUser(res.data)
            }catch(error){
                console.log(error)
            }
        }
        getUser();
        
    }, [currentUser, conversation])

    return(
        <div className="conversation">
            <img src={user?.profilePicture ? PF + user.profilePicture: PF + "noAvatar.png"} alt={user?.profilePicture} className="convo_image" />
            <span className="convo_name">{user?.username}</span>
        </div>
    )
}

export default Conversation;