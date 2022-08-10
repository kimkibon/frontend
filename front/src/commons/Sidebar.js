import React, { useEffect, useState } from 'react';
import './sidestyle.css'
import { useNavigate } from 'react-router-dom';
import '../../node_modules/bootstrap/dist/js/bootstrap'
import HostSidebar from './HostSidebar';
import Auth from '../login/Auth';
import { Col } from 'react-bootstrap';
import AdminSidebar from './AdminSidebar';
import Offside from './Offside';


// react-icons names -> fa로 통일



const Sidebar = () => {

  const mem_id = localStorage.getItem("MEM_ID");
  const navigate = useNavigate();

  const [memberLevel, setMemberLevel] = useState({
    MEM_LEVEL: ''
  });

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
  }, [mem_id]);



  return (

    <Col>
      {((localStorage.getItem('MEM_ID') !== undefined) && (memberLevel.MEM_LEVEL !== 0)) &&
        <Offside />
      }
      {/* <div className="toggle"><AiOutlineMenu className='fa' onClick={toggleMenu()}/></div> */}
      {MEM_LEVEL === 1 && <HostSidebar />}
      {MEM_LEVEL === 0 && <AdminSidebar />}
    </Col>

  )
}

export default Sidebar;