import React, {useState, useEffect, useContext} from "react";
import '../profile/Profile.css';
import TopBar from "../../components/TopBar";
import Sidebar from "../../components/Sidebar";
import Feed from "../../components/Feed";
import Rightbar from "../../components/Rightbar";
import {axiosInstance} from '../../config';
import {useParams} from 'react-router-dom';
import {Cancel, InsertPhotoOutlined, PhotoCamera} from '@material-ui/icons';
import {AuthContext} from '../../context/AuthContext';

function Profile(){
    const PF = "https://react-js-tribe-app.herokuapp.com/images/"
    const {user: currentUser, dispatch} = useContext(AuthContext)
    const [user, setUser] = useState({})
    const username = useParams().username;
    const [file, setFile] = useState(null)
    const [dp, setDp] = useState(null)

    useEffect(() => {
        const fetchUser = async() => {
            await axiosInstance.get(`/api/user?username=${username}`)
            .then((res) => {
                if(res.status === 200){
                   setUser(res.data)
                }
            }).catch((error) => {
                console.log(error)
            })
        }
        fetchUser()
    }, [username])

    const uploadHandler = async() => {
        if(file && user._id === currentUser._id){
            const userUpdate = {
                userId: currentUser._id
            }
            if(file){
                const data = new FormData();
                const fileName = Date.now() + file.name;
                data.append("name", fileName);
                data.append("file", file);
                userUpdate.coverPicture = fileName; 
                dispatch({
                    type: "ADDCOVERPICTURE",
                    payload: fileName,
                })
                
                try {
                    await axiosInstance.post(`/api/upload`, data)
                } catch (error) {
                    console.log(error)
                }
            }
            try {
                await axiosInstance.put(`/api/user/${currentUser._id}`, userUpdate)
                
                window.location.reload()
            } catch (error) {
                console.log(error)
            }
        }
    }

    const uploadDpHandler = async() => {
        if(dp && user._id === currentUser._id){
            const userUpdate = {
                userId: currentUser._id
            }
            if(dp){
                const data = new FormData();
                const fileName = Date.now() + dp.name;
                data.append("name", fileName);
                data.append("file", dp);
                userUpdate.profilePicture = fileName; 
                dispatch({
                    type: "ADDPROFILEPICTURE",
                    payload: fileName,
                })
                
                try {
                    await axiosInstance.post(`/api/upload`, data)
                    console.log("formData: ", data)
                } catch (error) {
                    console.log(error)
                }
            }
            try {
                await axiosInstance.put(`/api/user/${currentUser._id}`, userUpdate)
                window.location.reload()
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <>
            <TopBar/>
            <div className="Profile">
                <Sidebar/>
                <div className="profile_right">
                    <div className="profile_right_top">
                        <div className="profile_cover">
                            <img src={user.coverPicture? PF + user.coverPicture: PF + "noCover.png"} alt={user.coverPicture} className={user.coverPicture? "profile_cover_img": "no_cover_image"}/>
                            
                            {user._id === currentUser._id && (
                                <label className="upload_cover_img" htmlFor="file">
                                    <InsertPhotoOutlined className="upload_icon"/>
                                    <span className="upload_cover_tex">Upload</span>
                                    <input style={{display:"none"}} type="file" id='file' accept='.png, .jpeg, .jpg' onChange={(e) => setFile(e.target.files[0])}/>
                                </label>
                            )}
                            

                            <img src={user.profilePicture? PF + user.profilePicture : PF + "noAvatar.png"} alt="profile-pic" className="profile_user_img"/>
                            {user._id === currentUser._id &&(
                                <label htmlFor="dp">
                                    <PhotoCamera className="upload_dp_icon"/>
                                    <input style={{display:"none"}} type="file" id='dp' accept='.png, .jpeg, .jpg' onChange={(e) => setDp(e.target.files[0])}/>
                                </label>
                            )}
                            
                        </div>

                        {dp && (
                            <div className="cover_Img_Container">
                                <img className="cov_Img" src={URL.createObjectURL(dp)} alt="coverImage" />
                                <Cancel className="cover_Cancel_Img" onClick={() => setDp(null)} />
                                <button className="upload_btn" onClick={() => uploadDpHandler()}>Add Picture</button>
                            </div>
                        )}

                        {file && (
                            <div className="cover_Img_Container">
                                <img className="cov_Img" src={URL.createObjectURL(file)} alt="*" />
                                <Cancel className="cover_Cancel_Img" onClick={() => setFile(null)} />
                                <button className="upload_btn" onClick={() => uploadHandler()}>Add Cover</button>
                            </div>
                        )} 

                        <div className="profile_info">
                            <h4 className="profile_info_name">{user.username}</h4>
                            <span className="profile_info_desc">{user.desc}</span>
                        </div>  
                    </div>
                    <div className="profile_right_bottom">
                        <Feed username= {username}/>
                        <Rightbar username = {username}/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile;