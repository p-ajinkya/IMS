import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './Dashboard1Styles.css'
import { Link } from "react-router-dom"
import {FaBars, FaTimes,} from "react-icons/fa"
import {BiHome} from "react-icons/bi"
import {BsBox} from "react-icons/bs"
import {MdPresentToAll} from "react-icons/md"
import {SiChainlink} from "react-icons/si"
import {RiProductHuntLine} from "react-icons/ri"
import {GrLocationPin,GrUserManager} from "react-icons/gr"
import { Outlet } from 'react-router-dom'
import Tabledata from '../pages/Tabledata'


const Dashboard1 = () => {
    const[click,setClick] = useState(false);
    const handleClick = () => setClick(!click);
    const navigate = useNavigate();

    useEffect(() => {
        const loginData = JSON.parse(sessionStorage.getItem('loginData'));
        const token = sessionStorage.getItem('token');
        console.log("loginData@@@@@00", loginData);
        if (!loginData && token == null) {
          // localStorage.setItem("token", loginData?.data?.token);
          // const jsonString = JSON.stringify(loginData?.data?.userDetails);
          // localStorage.setItem("userDetails", jsonString);
          // localStorage.setItem("userRole", loginData?.data?.userDetails?.role);
          // if (loginData?.data?.userDetails?.role == "SuperAdmin") {
          //   navigate("/superadmin");
          // } else {
          //   navigate("/budget-summary");
          // }
          navigate("/Login")
        }
      }, []);

  return (
    <div className='dcontainer'>
        <div className='joint'>
            <BiHome size={30}/>
            <h2 style={{paddingLeft:"10px"}}>Dashboard</h2>
        </div>
        <ul className={click? "nav-menu active" : "nav-menu"}>
        
       <div className='align'>
        
            
        <div className='place'>

        <h3 className='light'>Products</h3>

            <div className='con'>
                <BsBox/>
                <a style={{paddingLeft:"0.5rem"}}>Inwards</a>
            </div>
            <div className='con'>
                <MdPresentToAll/>
                <a style={{paddingLeft:"0.5rem"}}>Outwards</a>
            </div>
            <div className='con'>
                <SiChainlink/>
                <a style={{paddingLeft:"0.5rem"}}>Logs</a>
            </div>
            <div className='con'>
                <RiProductHuntLine/>
                <a style={{paddingLeft:"0.5rem"}}>Products</a>
            </div>
        </div>
            
        <div className='place'>
            <h3 className='light'>sites</h3>
            <div className='con'>
                <GrLocationPin/>
                <Link to='/table' style={{paddingLeft:"0.5rem"}}>Sites</Link>
            </div>
        </div>
           
         <div className='place'>
            <h3 className='light'>Users</h3>
            <div className='con'>
                <GrUserManager/>
                <a style={{paddingLeft:"0.5rem"}}>User management</a>
            </div>
         </div>

            </div>
        </ul>
        

        <div className="hamburger" onClick={handleClick}>
             {/* {click ? (condition1) : (condition2)} */}
            {click ? (<FaTimes size={20} style={{color:"black"}}/>) :(<FaBars size={20} style={{color:"black"}}/>)
            }
        </div>
        <Outlet />
    </div>
  )
}

export default Dashboard1