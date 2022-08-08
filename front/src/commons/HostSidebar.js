import React from 'react'
import './sidestyle.css'
import { BsFillAlarmFill, BsFillCalendarCheckFill, BsFillInfoCircleFill, BsFillHddStackFill, BsFillQuestionCircleFill, BsFillMegaphoneFill } from "react-icons/bs";
import { Link } from 'react-router-dom';
import 'bootstrap'
import { AiFillInteraction, AiOutlineDown } from 'react-icons/ai';
// react-icons names -> fa로 통일



const HostSidebar = () => {


  return (
      
        <div className='navigation'>                   
          <ul className='big_menu2'>
          <li>
                <Link to='/myPage/ReserveListPage'>
                  <span className='icon'><BsFillAlarmFill className='fa' /></span>
                  <span className='title'>예약내역</span>
                </Link>
              </li>

              <li>
                <Link to="/myPage/memUseListPage">
                  <span className='icon'><BsFillCalendarCheckFill className='fa' /></span>
                  <span className='title'>이용내역</span>
                </Link>
              </li>

              <li>
                <Link to="/myPage/qna">
                  <span className='icon'><BsFillQuestionCircleFill className='fa' /></span>
                  <span className='title'> QNA </span>
                </Link>
              </li>

              <li>
                <Link to="/myPage/report">
                  <span className='icon'><BsFillMegaphoneFill className='fa' /></span>
                  <span className='title'>REPORT</span>
                </Link>
              </li>

              <li>
                <Link to="/myPage/member/MemDetail">
                  <span className='icon'><BsFillInfoCircleFill className='fa' /></span>
                  <span className='title'>회원정보보기</span>
                </Link>
              </li>

          <label className='hostmenu' htmlFor='hostmenu'>
            <span className='icon'><AiOutlineDown className='fa'/></span>
            <span className='title'>
              &nbsp; host 메뉴
            </span>
            </label>
          <input id="hostmenu" type="checkbox"></input> 
        
            <ul className="small_menu">
              {/* <li>
                <Link to="host/myPage">
                  <span className='icon'><AiFillInteraction className='fa'/></span>
                  <span className='title'>호스트 메뉴</span>
                </Link>
              </li> */}

              <li>
                <Link to="/myPage/host/hostBoardList">
                  <span className='icon'><BsFillHddStackFill className='fa'/></span>
                  <span className='title'>내 게시글</span>
                </Link>
              </li>
              
              <li>
                <Link to="/myPage/host/hostReserve">
                  <span className='icon'><BsFillAlarmFill className='fa'/></span>
                  <span className='title'>예약내역</span>
                </Link>
              </li>  

              <li>
                <Link to="/myPage/host/hostUseList">
                  <span className='icon'><BsFillCalendarCheckFill className='fa'/></span>
                  <span className='title'>이용내역</span>
                </Link>
              </li>

              <li>
                <Link to="/myPage/host/hostInfo">
                  <span className='icon'><BsFillInfoCircleFill className='fa'/></span>
                  <span className='title'>회원정보보기</span>
                </Link>
              </li>

              {/* <li>
                <Link to="/myPage/host/hostBoardForm">
                  <span className='icon'><BsFillInfoCircleFill className='fa'/></span> 
                  <span className='title'>게시글 작성</span>
                </Link>
              </li> */}

              {/* <li>
                <Link to="/myPage/host/hostBoardModify">
                  <span className='icon'><BsFillInfoCircleFill className='fa'/></span> 
                  <span className='title'>hostBoardModify</span>
                </Link>
              </li> */}

            </ul>
        </ul>
        </div>
        
              

  )
}

export default HostSidebar;