import React from 'react'
import { Link } from 'react-router-dom'
import { BsFillAlarmFill, BsFillCalendarCheckFill, BsFillMegaphoneFill, BsFillQuestionCircleFill, BsFillInfoCircleFill, BsFillPeopleFill } from "react-icons/bs";
import './sidestyle.css'


const Offside = () => {
  return (
<div className='navigation'>
        <ul className='big_menu1'>

            <div>
              <li>
                <Link to='/myPage/ReserveListPage'>
                  <span className='icon'><BsFillAlarmFill className='fa' /></span>
                  <span className='title'>RESERVATION</span>
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

              <li>
                <Link to="/myPage/member/MemChange">
                  <span className='icon'><BsFillPeopleFill className='fa' /></span>
                  <span className='title'>호스트전환</span>
                </Link>
              </li>
            </div>
          
        </ul>
      </div>  )
}

export default Offside