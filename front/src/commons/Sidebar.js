import React from 'react'
import './sidestyle.css'
import {AiFillAlert, AiFillDatabase, AiFillCarryOut, AiFillEye, AiFillNotification, AiFillInteraction} from "react-icons/ai";
// react-icons names -> fa로 통일


const Sidebar = () => {


  return (
    <div>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
  
    <head>
    <meta name="viewport" content="sidth=device-sidth, initial-scale=1.0"></meta>
    <title> Menu </title>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.min.js" integrity="sha384-QJHtvGhmr9XOIpI6YVutG+2QOK9T+ZnN4kzFN1RtK3zEFEIsxhlmWl5/YESvpZ13" crossorigin="anonymous"></script>
    <link rel="stylesheet" type="text/css" href="style.css"></link>
    </head>

    <body>
        <div className='navigation'>
          <ul>
          <li>
              <a href='/myPage/ReserveListPage'>
                <span className='icon'><AiFillDatabase className='fa'/></span>
                <span className='title'>RESERVATION</span>
              </a>
            </li>

              <li>
              <a href="/myPage/memUseListPage">
                <span className='icon'><AiFillCarryOut className='fa' /></span>
                <span className='title'>이용내역</span>
              </a>
              </li>

              <li>
              <a href="/myPage/qna">
                <span className='icon'><AiFillNotification/></span>
                <span className='title'> QNA </span>
              </a>
              </li>

              <li>
              <a href="/myPage/report">
                <span className='icon'><AiFillAlert className='fa'/></span>
                <span className='title'>REPORT</span>
              </a>
              </li>

              <li>
              <a href="/myPage/member/MemDetail">
                <span className='icon'><AiFillEye/></span>
                <span className='title'>회원정보보기</span>
              </a>
              </li>

              <li>
              <a href="/myPage/member/MemChange">
                <span className='icon'><AiFillInteraction/></span>
                <span className='title'>TOHOST</span>
              </a>
          </li>

          <li>
              <a href="/admin">
                <span className='icon'><AiFillInteraction/></span>
                <span className='title'>admin 메뉴들</span>
              </a>
          </li>

          <li>
              <a href="/myPage/host">
                <span className='icon'><AiFillInteraction/></span>
                <span className='title'>host 메뉴들</span>
              </a>
          </li>
          </ul>
        </div>

        {/* <div class="toggle"><AiOutlineMenu className='fa' onClick={toggleMenu()}/></div> */}
        
          

    </body>
    
</div>

  )
}

export default Sidebar;