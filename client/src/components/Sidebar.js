import React, {useContext} from "react";
import '../styles/Sidebar.css';
import {RssFeed, Chat, PlayCircleFilledOutlined, Group, Bookmark, HelpOutline, WorkOutline, Event, School} from '@material-ui/icons';
import CloseFriends from "./CloseFrineds";
import {AuthContext} from '../context/AuthContext';


function Sidebar(){
    const {suggestions} = useContext(AuthContext);
    

    return(
        <div className="sideBar">
            <div className="sidebar_Wrapper">
                <ul className="sidebar_List">
                    <li className="sidebar_list_items">
                        <RssFeed className="sidebar_icon"/>
                        <span className="sidebar_list_item_text">Feed</span>
                    </li>

                    <li className="sidebar_list_items">
                        <Chat className="sidebar_icon"/>
                        <span className="sidebar_list_item_text">Chats</span>
                    </li>

                    <li className="sidebar_list_items">
                        <PlayCircleFilledOutlined className="sidebar_icon"/>
                        <span className="sidebar_list_item_text">Videos</span>
                    </li>

                    <li className="sidebar_list_items">
                        <Group className="sidebar_icon"/>
                        <span className="sidebar_list_item_text">Groups</span>
                    </li>

                    <li className="sidebar_list_items">
                        <Bookmark className="sidebar_icon"/>
                        <span className="sidebar_list_item_text">Bookmarks</span>
                    </li>

                    <li className="sidebar_list_items">
                        <HelpOutline className="sidebar_icon"/>
                        <span className="sidebar_list_item_text">Questions</span>
                    </li>

                    <li className="sidebar_list_items">
                        <WorkOutline className="sidebar_icon"/>
                        <span className="sidebar_list_item_text">Jobs</span>
                    </li>

                    <li className="sidebar_list_items">
                        <Event className="sidebar_icon"/>
                        <span className="sidebar_list_item_text">Events</span>
                    </li>

                    <li className="sidebar_list_items">
                        <School className="sidebar_icon"/>
                        <span className="sidebar_list_item_text">Courses</span>
                    </li>
                </ul>
                <button className="sidebar_button">Show More</button>

                <hr className="sidebar_hr" />
                <ul className="sidebar_friend_list">
                    {suggestions?.map((u) => (
                        <CloseFriends key={u._id} user={u}/>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Sidebar;