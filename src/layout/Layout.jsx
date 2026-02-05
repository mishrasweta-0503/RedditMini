//what this compoenent does
//always show sidebar
//render whatever route is active inside main content

import React,{useState} from 'react';
import { Outlet } from "react-router-dom";
import Sidebar from '../components/Sidebar.jsx';
import Searchbar from '../components/Searchbar.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import Reddit_Mini from '../assets/Reddit_Mini.png'; 

export default function Layout(){
    const [isSidebarOpen,setIsSidebarOpen] = useState(true);
    function openSidebar(){
        setIsSidebarOpen(prev => !prev);
    }
    function closeSidebar(){
        setIsSidebarOpen(false)
    }
    return(
        <>  
            <header className="app-header">
                <img src={Reddit_Mini} alt="Reddit logo" />
                <Searchbar />
            </header>
            <div className='layout'>
                <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar}/> {/*persistent navigation UI */}
                <button className={`menu-btn ${isSidebarOpen ? "btn-shifted" : "btn-left"}`} onClick={openSidebar}><FontAwesomeIcon icon={faBars}/></button>
                <main className="main-content">
                    <Outlet /> {/*placeholder for whichever route is active */}
                </main>
            </div>
        </>
    )
}