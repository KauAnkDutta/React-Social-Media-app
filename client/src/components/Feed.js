import React, {useState, useEffect, useContext} from "react";
import '../styles/Feed.css';
import Share from "./Share";
import Post from "./Post";
import {axiosInstance} from '../config';
import {AuthContext} from '../context/AuthContext';

function Feed({username}){
    const [posts, setPost] = useState([]);
    const {user} = useContext(AuthContext);

    useEffect(() => {
        const fetchPosts = async() => {
            const res = username ? await axiosInstance.get("/api/profile/" + username) : await axiosInstance.get("api/timeline/" + user._id )
                
                

            setPost(res.data.sort((p1, p2) => {
                return new Date(p2.createdAt) - new Date(p1.createdAt);
            }))
        } 

        fetchPosts()
    }, [username, user._id])

    return(
        <div className="feed_section">
            <div className="feed_wrapper">
                {(!username || username === user.username )&& <Share />}
                {posts.map((p) => (
                    <Post post={p} key={p._id}/>
                )) } 
            </div>
        </div>
    )
}

export default Feed;