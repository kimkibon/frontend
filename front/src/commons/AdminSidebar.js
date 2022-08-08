import React from 'react'
import './sidestyle.css'
import { AiFillAlert, AiFillDatabase, AiFillCarryOut, AiFillEye, AiFillNotification, AiFillInteraction } from "react-icons/ai";
import { Link } from 'react-router-dom';
import 'bootstrap'
// react-icons names -> fa로 통일



const AdminSidebar = () => {
  //045003869

  return (

    <div className='navigation mt-2'>
      <ul>
        {/* <li>
          <Link to='/Admin'>
            <span className='icon'><AiFillDatabase className='fa' /></span>
            <span className='title'>INDEX</span>
          </Link>
        </li> */}

        <li>
          <Link to="/Admin/adminMemberList">
            <span className='icon'><AiFillCarryOut className='fa' /></span>
            <span className='title'>회원관리</span>
          </Link>
        </li>

        <li>
          <Link to="/Admin/adminHostConfirmList">
            <span className='icon'><AiFillNotification className='fa'/></span>
            <span className='title'>호스트 등록요청 </span>
          </Link>
        </li>


        <li>
          <Link to="/Admin/adminBoardList">
            <span className='icon'><AiFillAlert className='fa' /></span>
            <span className='title'>게시글관리</span>
          </Link>
        </li>


        <li>
          <Link to="/Admin/adminAllResList">
            <span className='icon'><AiFillAlert className='fa' /></span>
            <span className='title'>예약관리</span>
          </Link>
        </li>


        <li>
          <Link to="/Admin/adminQnaList">
            <span className='icon'><AiFillEye className='fa'/></span>
            <span className='title'>QNA 관리</span>
          </Link>
        </li>

        <li>
          <Link to="/Admin/adminReportList">
            <span className='icon'><AiFillInteraction className='fa'/></span>
            <span className='title'>신고 관리</span>
          </Link>
        </li>
      </ul>
      {/* <div className="toggle"><AiOutlineMenu className='fa' onClick={toggleMenu()}/></div> */}
    </div>




  )
}

export default AdminSidebar;