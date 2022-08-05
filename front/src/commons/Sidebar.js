import React, { useEffect, useState } from 'react';
import './sidestyle.css'
import { BsFillAlarmFill, BsFillCalendarCheckFill, BsFillMegaphoneFill, BsFillQuestionCircleFill, BsFillInfoCircleFill, BsFillPeopleFill } from "react-icons/bs";
import { Link, useNavigate } from 'react-router-dom';
import '../../node_modules/bootstrap/dist/js/bootstrap'
import HostSidebar from './HostSidebar';
import Auth from '../login/Auth';
import { Col } from 'react-bootstrap';
import AdminSidebar from './AdminSidebar';
import Logout from '../login/Logout';
import Offside from './Offside';


// react-icons names -> fa로 통일



const Sidebar = () => {

  const mem_id = localStorage.getItem("MEM_ID");
  const navigate = useNavigate();

  const [memberLevel, setMemberLevel] = useState({
    MEM_LEVEL: ''
  });
  console.log(mem_id);

  const { MEM_LEVEL } = memberLevel;


  //level 2 -> 호스트,,,,
  useEffect(() => { // 레벨 4 이하인(일반,호스트,관리자) 접근 가능. MEM_IDX 받아오기
    if (!!localStorage.getItem('MEM_ID')) {
      Auth(4, navigate).then(Res => {
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

      {localStorage.getItem('MEM_ID') !== undefined &&
        <div className='container'>
          <span>안녕하세요. {mem_id}님 </span>
          <Logout />
        </div>
      }
      {((localStorage.getItem('MEM_ID') !== undefined) && (memberLevel.MEM_LEVEL !== 0)) &&
      <Offside/>
    }
      {/* <div class="toggle"><AiOutlineMenu className='fa' onClick={toggleMenu()}/></div> */}
      {MEM_LEVEL === 1 && <HostSidebar />}
      {MEM_LEVEL === 0 && <AdminSidebar />}
    </Col>

  )
}

export default Sidebar;