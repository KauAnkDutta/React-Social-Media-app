import React, {useState, useEffect, useContext} from 'react';
import '../styles/Post.css';
import {MoreVert} from '@material-ui/icons';
import Thumb from '../images/Thumb.png';
import disThumb from '../images/disThumb.png';
import love from '../images/love.png';
import {axiosInstance} from '../config';
import {NavLink} from 'react-router-dom';
import {AuthContext} from '../context/AuthContext';
import Moment from 'react-moment';
import { LazyLoadImage} from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';


function Post({post}){
    const[like, setLike] = useState(post.like.length)
    const[isLiked, setIsLiked] = useState(false)
    const[user, setUser] = useState({})
    const{user: currentUser} = useContext(AuthContext)
    const PF = "https://react-js-tribe-app.herokuapp.com/images/" 

    const likeHandler = () => {
        try {
            axiosInstance.put("/api/userpost/" + post._id + "/likedislike", {userId: currentUser._id})
        } catch (error) {
            console.log(error)
        }
        setLike(isLiked? like -1 : like + 1);
        setIsLiked(!isLiked);
    }

    useEffect(() => {
        setIsLiked(post.like.includes(currentUser._id))
    }, [currentUser._id, post.like])

    useEffect(() => {
        const fetchUser = async() => {
            const res = await axiosInstance.get(`/api/user?userId=${post.userId}`)

            setUser(res.data)
        } 

        fetchUser()
    }, [post.userId])


    return(
        <div className="post_main_container">
            <div className="post_wrapper">
                <div className="post_top">
                    <div className="post_top_left">
                        <NavLink to={`/profile/${user.username}`}>
                            <img src={user.profilePicture? PF + user.profilePicture : PF + "noAvatar.png"} alt={user.profilePicture} className='post_profile_image'/>
                        </NavLink>

                        <span className="post_user_name">
                            {user.username}
                        </span>

                        <span className="post_time">
                            <Moment fromNow>{post.createdAt}</Moment>
                        </span>
                    </div>

                    <div className="post_top_right">
                        <MoreVert className='post_top_right_icon'/>
                    </div>
                </div>

                <div className="post_center">
                    <span className="post_center_text">
                        {post.desc}
                    </span>

                    <LazyLoadImage src={ PF + post.img} alt="post-img" className='post_center_img' placeholderSrc={PF + "/photo.png"} effect='blur'/>
                </div>

                <div className="post_bottom">
                    <div className="post_bottom_left">
                        {
                            isLiked? 
                            <img src={disThumb} alt="like" className='post_bottom_icon' onClick={likeHandler}/>
                            :
                            <img src={Thumb} alt="like" className='post_bottom_icon' onClick={likeHandler}/>
                        }
                        <img src={love} alt="favorite" className='post_bottom_icon'/>
                        <span className="post_like_count">
                            {like} likes
                        </span>
                    </div>

                    <div className="post_bottom_right">
                        <span className="post_comment_count">
                            {post.comment} comments
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post
