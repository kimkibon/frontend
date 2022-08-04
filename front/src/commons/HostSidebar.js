import React from 'react'
import './sidestyle.css'
import {AiFillAlert, AiFillDatabase, AiFillCarryOut, AiFillEye, AiFillNotification, AiFillInteraction, AiOutlineDown} from "react-icons/ai";
import { Link } from 'react-router-dom';
import 'bootstrap'
// react-icons names -> fa로 통일



const HostSidebar = () => {


  return (
    <div className='col'>
      
        <div className='navigation'>                   
          <ul className='big_menu2'>
          
          <label className='hostmenu' htmlFor='hostmenu'>
            <span className='icon'><AiOutlineDown/></span>
            <span className='title'>
              host 메뉴
            </span>
            </label>
          <input id="hostmenu" type="checkbox"></input> 
        

            <ul className="small_menu">
              <li>
                <Link to="host/myPage">
                  <span className='icon'><AiFillInteraction/></span>
                  <span className='title'>호스트 메뉴</span>
                </Link>
              </li>

              <li>
                <Link to="/myPage/host/hostBoardList">
                  <span className='icon'><AiFillInteraction/></span>
                  <span className='title'>내 게시글</span>
                </Link>
              </li>
              
              <li>
                <Link to="/myPage/host/hostReserve">
                  <span className='icon'><AiFillInteraction/></span>
                  <span className='title'>예약내역</span>
                </Link>
              </li>  

              <li>
                <Link to="/myPage/host/hostUseList">
                  <span className='icon'><AiFillInteraction/></span>
                  <span className='title'>이용내역</span>
                </Link>
              </li>

              <li>
                <Link to="/myPage/host/hostInfo">
                  <span className='icon'><AiFillInteraction/></span>
                  <span className='title'>회원정보보기</span>
                </Link>
              </li>

            </ul>
        </ul>
        </div>
        
              
</div>

  )
}

export default HostSidebar;