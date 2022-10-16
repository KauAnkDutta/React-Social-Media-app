import React, {useContext, useEffect} from 'react';
import Home from './pages/home/Home';
import Profile from './pages/profile/Profile';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import {AuthContext} from './context/AuthContext';
import Messenger from './pages/messenger/Messenger';
import {axiosInstance} from './config';


function App(){
  const {user,friends, dispatch} = useContext(AuthContext)

  useEffect(() => {
    const getFriends = async() => {
        try {
            if(user?._id){
              const friendList = await axiosInstance.get(`/api/get/friends/${user._id}`)
              dispatch({type:"ADDFRIENDS", payload:friendList.data})
            }
            
        } catch (error) {
          console.log(error)
        }
    }
    getFriends();
  }, [user])

  const filter_arr = (arr1, arr2) => {
    let res = [];
    res = arr1?.filter(el => {
        return !arr2?.find(element => {
            return element?._id === el?._id
        })
    })

    return res;
  }

  useEffect(() => {
        const get_suggestions = async() =>{
          try {
            if(user){
                const all_users = await axiosInstance.get(`/api/getAllUsers/${user?._id}`)
                
                if(all_users.data){
                  dispatch({type:"SHOWSUGGESTIONS", payload: filter_arr(all_users.data, friends)})
                }
            }
          } catch (error) {
            console.log(error)
          }
        }
    
        get_suggestions();
  }, [user, friends])
  

  return(
    <BrowserRouter>
        <Routes>
          <Route path={`/`} element={user? <Home />: <Register />} />
          <Route path={`/login`} element={user? <Navigate to={`/`}/> : <Login /> } />
          <Route path={`/register`} element={<Register />}/>
          <Route path={`/profile/:username`} element={<Profile />}/>
          <Route path={`/messenger`} element={!user ? <Home />: <Messenger />}/>
        </Routes>
    </BrowserRouter>
  )
}

export default App;