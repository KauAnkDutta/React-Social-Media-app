import React, {useContext} from "react";
import '../styles/InboxItems.css'; 
import {get_sender_name} from '../ExtraFunctions';
import {AuthContext} from '../context/AuthContext';


export default function InboxItems({empty, notification}){
    const {friends} = useContext(AuthContext)

    return(
        <div className ="inbox_container">
            {
                empty? (
                    <span className='no_notification'>No New Notification</span>
                ):(
                    <span className="notification_text"> {notification?.quan} Messages from {get_sender_name(notification?.senderId, friends)}</span>  
                )
            }
        </div>
    )
}

