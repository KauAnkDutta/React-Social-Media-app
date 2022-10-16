import React, {useContext, useRef, useState} from 'react';
import '../styles/Share.css';
import {PermMedia, Label, Room, EmojiEmotions, Cancel} from '@material-ui/icons';
import {AuthContext} from '../context/AuthContext';
import {axiosInstance} from '../config';

function Share(){
    const {user} = useContext(AuthContext)
    const PF = "https://react-js-tribe-app.herokuapp.com/images/";
    const desc = useRef()
    const [file, setFile] = useState(null)

    const submitHandler = async(e) => {
        e.preventDefault();
        const newPost = {
            userId: user._id,
            desc: desc.current.value
        }
        if(file){
            const data = new FormData();
            const fileName = Date.now() + file.name;
            data.append("name", fileName);
            data.append("file", file);
            newPost.img = fileName;

            
            try {
                await axiosInstance.post(`/api/upload`, data)
                console.log("formData: ", data)
            } catch (error) {
                console.log(error)
            }
        }
        try {
            await axiosInstance.post(`/api/create/post`, newPost)
            window.location.reload()
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <div className="share">
            <div className="share_container">
                <div className="share_top">
                    <img src={user.profilePicture? PF + user.profilePicture : PF + "noAvatar.png"} alt={user.profilePicture} className='share_profile_pic'/>
                    <input type="text" placeholder={"What's in your mind "+ user.username + "?"} className="share_input" ref={desc}/>
                </div>

                <hr className="share_hr" />
                {file && (
                    <div className="share_Img_Container">
                        <img className="share_Img" src={URL.createObjectURL(file)} alt="share_img" />
                        <Cancel className="share_Cancel_Img" onClick={() => setFile(null)} />
                    </div>
                )}

                <form className="share_bottom" onSubmit={submitHandler}>
                    <div className="share_options">
                        <label htmlFor='file' className="share_option">
                            <PermMedia htmlColor='tomato' className='share_icon'/>
                            <span className="share_icon_text">
                                Photo or Video
                            </span>
                            <input style={{display:"none"}} type="file" id='file' accept='.png, .jpeg, .jpg' onChange={(e) => setFile(e.target.files[0])}/>
                        </label>
                        <div className="share_option">
                            <Label htmlColor='blue' className='share_icon'/>
                            <span className="share_icon_text">
                                Tag
                            </span>
                        </div>
                        <div className="share_option">
                            <Room htmlColor='green' className='share_icon'/>
                            <span className="share_icon_text">
                               Location
                            </span>
                        </div>
                        <div className="share_option">
                            <EmojiEmotions htmlColor='goldenrod' className='share_icon'/>
                            <span className="share_icon_text">
                                Feelings
                            </span>
                        </div>
                    </div>

                    <button className="share_btn" type='submit'>
                        Share
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Share;