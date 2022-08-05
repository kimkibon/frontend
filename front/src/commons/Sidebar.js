import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './sidestyle.css'
import {AiFillInteraction} from "react-icons/ai";
import { BsFillAlarmFill, BsFillCalendarCheckFill, BsFillMegaphoneFill, BsFillQuestionCircleFill,BsFillInfoCircleFill,BsFillPeopleFill  } from "react-icons/bs";
import { Link, useNavigate } from 'react-router-dom';
import '../../node_modules/bootstrap/dist/js/bootstrap'
import HostSidebar from './HostSidebar';
import Auth from '../login/Auth';
import { Col } from 'react-bootstrap';

// react-icons names -> fa로 통일



const Sidebar = () => {

  const mem_id = localStorage.getItem("MEM_ID");
  const navigate = useNavigate();

  const [memberLevel, setMemberLevel] = useState({
    MEM_LEVEL:''
  });
  console.log(mem_id);

  const {MEM_LEVEL} = memberLevel;
  
 
  //level 2 -> 호스트,,,,
  useEffect(() => { // 레벨 4 이하인(일반,호스트,관리자) 접근 가능. MEM_IDX 받아오기
    if(localStorage.getItem('MEM_ID')){
    Auth(4 , navigate).then(Res => {
          setMemberLevel({
            ...memberLevel,
            'MEM_LEVEL': Res.MEM_LEVEL,
            })
          })
        }
  }, []);
  console.log(memberLevel);

  

  return (
    <Col>
        <div className='navigation'>
          <ul className='big_menu1'>
          <li>
              <Link to='/myPage/ReserveListPage'>
                <span className='icon'><BsFillAlarmFill className='fa'/></span>
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
                <span className='icon'><BsFillQuestionCircleFill className='fa'/></span>
                <span className='title'> QNA </span>
              </Link>
              </li>

              <li>
              <Link to="/myPage/report">
                <span className='icon'><BsFillMegaphoneFill className='fa'/></span>
                <span className='title'>REPORT</span>
              </Link>
              </li>

              <li>
              <Link to="/myPage/member/MemDetail">
                <span className='icon'><BsFillInfoCircleFill className='fa'/></span>
                <span className='title'>회원정보보기</span>
              </Link>
              </li>

              <li>
              <Link to="/myPage/member/MemChange">
                <span className='icon'><BsFillPeopleFill className='fa'/></span>
                <span className='title'>호스트전환</span>
              </Link>
          </li>
          
          <li>
              <Link to="/admin">
                <span className='icon'><AiFillInteraction/></span>
                <span className='title'>admin 메뉴들</span>
              </Link>
          </li>
          </ul>

          {/* ----------------------------------------------------------------------------------------- */}
          
          {MEM_LEVEL === 1 && <HostSidebar/>}
        </div>

        {/* <div class="toggle"><AiOutlineMenu className='fa' onClick={toggleMenu()}/></div> */}
         
</Col>

  )
}

export default Sidebar;