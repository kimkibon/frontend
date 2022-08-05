import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IoPersonOutline, IoPerson } from "react-icons/io5";
import Logout from '../login/Logout';
import logoImage from './images/logo/GareBnBlog.png';
import './style.css';

const Header = () => {
  const [loginId , setLoginId] = useState(localStorage.getItem("MEM_ID"));  //로컬스토리지에서 로그인한 계정의 아이디 전달

  useEffect(()=>{
    setLoginId(localStorage.getItem("MEM_ID"));
  },[localStorage.getItem("MEM_ID")])

  const LogIn = () => {

    return (
      <>

        <div className="nav-item dropdown">
          <a className="nav-link show" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">
            <span className='icon'><IoPerson className='logIcon' /></span>
            </a>
          <div className="dropdown-menu" data-popper-placement="bottom-start" style={{ margin: 0 }} >
            <Link to='/myPage'>
              <div className="dropdown-item">myPage</div>
            </Link>
            <div className="dropdown-divider"></div>
            <div className="dropdown-item" ><Logout/></div>
          </div>
        </div>

        <div className='headerLogin'>
          안녕하세요.
        </div>
        {loginId}&nbsp;
        <div className='headerLogin'>
          님
        </div>
        <div className='btn btn-danger'>
        <Logout />
        </div>
      </>
    )

  }

  return (

    <div className="container-fluid">

      {/* 헤더부분 */}
      <div className='header'>

        <Link to='/'>
          <img src={logoImage} alt="Gare" className="img-logo" />
        </Link>

      </div>

      {/* navbar */}
      <div className='h-navbar'>
        <nav className="navbar navbar-expand-lg navbar-light">

          {/* 오프캔버스 추가
          <div>
            <Offside/>
          </div> */}


          {/* -- 홈으로 가기 -- */}
          <div className="collapse navbar-collapse justify-content-end">
            {/* <ul className="navbar-nav" >
                  <li className="nav-item" >
                    <Link className="nav-link active" to="/">Home
                      <span className="visually-hidden">(current)</span> 
                    </Link>
                  </li>
                </ul> */}

            {/* 마이페이지 */}
            {/* <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link className="nav-link active" to="/myPage">myPage
                      <span className="visually-hidden">(current)</span> 
                    </Link>
                  </li>
                </ul> */}
          </div>


          {/* 로그인하기 -> 여부에,, */}
          {loginId === null ? <div className="menu-icon ml-auto" >
            <Link to="/login">
              {/* <svg xmlns="http://www.w3.org/2000/svg" width="80"
                            height="20" viewBox="0 0 18 20">
                            <g id="Account" transform="translate(1 1)">
                                <path id="Path_86" data-name="Path 86"
                                    d="M20,21V19a4,4,0,0,0-4-4H8a4,4,0,0,0-4,4v2"
                                    transform="translate(-4 -3)" fill="none" stroke="#000"
                                    strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                                <circle id="Ellipse_9" data-name="Ellipse 9" cx="4" cy="4" r="4"
                                    transform="translate(4)" fill="#fff" stroke="#000"
                                    strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                            </g>
                        </svg> */}
              <span className='icon'><IoPersonOutline className='logIcon' /></span>
              <button className='btn btn-primary'>LogIn</button>
            </Link>
          </div> : <LogIn />}

        </nav>
      </div>
    </div>

  )
}


export default Header