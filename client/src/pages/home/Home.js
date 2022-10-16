import React from 'react'
import TopBar from '../../components/TopBar';
import Sidebar from '../../components/Sidebar';
import Feed from '../../components/Feed';
import Rightbar from '../../components/Rightbar';

import '../home/Home.css'

function Home(){

    return(
        <>
            <TopBar/>
            <div className="homeContainer">
                <Sidebar/>
                <Feed/>
                <Rightbar/>
            </div>
        </>
    )
}

export default Home;