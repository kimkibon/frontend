import React from 'react'
import './sidestyle.css'
import {AiFillAlert, AiFillDatabase, AiFillCarryOut, AiFillEye, AiFillNotification, AiFillInteraction} from "react-icons/ai";
import { Link } from 'react-router-dom';
import '../../node_modules/bootstrap/dist/js/bootstrap'
// react-icons names -> fa로 통일



const Sidebar = () => {


  return (
    <div className='col'>
      
        <div className='navigation'>
          <ul>
          <li>
              <Link to='/myPage/ReserveListPage'>
                <span className='icon'><AiFillDatabase className='fa'/></span>
                <span className='title'>RESERVATION</span>
              </Link>
            </li>

              <li>
              <Link to="/myPage/memUseListPage">
                <span className='icon'><AiFillCarryOut className='fa' /></span>
                <span className='title'>이용내역</span>
              </Link>
              </li>

              <li>
              <Link to="/myPage/qna">
                <span className='icon'><AiFillNotification/></span>
                <span className='title'> QNA </span>
              </Link>
              </li>

              <li>
              <Link to="/myPage/report">
                <span className='icon'><AiFillAlert className='fa'/></span>
                <span className='title'>REPORT</span>
              </Link>
              </li>

              <li>
              <Link to="/myPage/member/MemDetail">
                <span className='icon'><AiFillEye/></span>
                <span className='title'>회원정보보기</span>
              </Link>
              </li>

              <li>
              <Link to="/myPage/member/MemChange">
                <span className='icon'><AiFillInteraction/></span>
                <span className='title'>TOHOST</span>
              </Link>
          </li>

          <li>
              <Link to="/admin">
                <span className='icon'><AiFillInteraction/></span>
                <span className='title'>admin 메뉴들</span>
              </Link>
          </li>

          <li>
              <Link to="/myPage/host">
                <span className='icon'><AiFillInteraction/></span>
                <span className='title'>host 메뉴들</span>
              </Link>
          </li>
          </ul>
        </div>

        {/* <div class="toggle"><AiOutlineMenu className='fa' onClick={toggleMenu()}/></div> */}
        
              
</div>

  )
}

export default Sidebar;