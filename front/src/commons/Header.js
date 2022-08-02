import React from 'react'
import { Link } from 'react-router-dom'
import Logout from '../login/Logout'
import logoImage from './images/logo/GareBnBlog.png';
import './style.css'

const header = () => {
  const mem_id = localStorage.getItem("MEM_ID");//로컬스토리지에서 로그인한 계정의 아이디 전달

  return (
    <div className='header'>
  <nav className="navbar navbar-expand-lg navbar-light">
  <div className="container-fluid">
    <Link to ='/'><img src={logoImage} alt="Gare" className="img-logo" /></Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor03" aria-controls="navbarColor03" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
  </div>   
    
  {/* -- 홈으로 가기 -- */}
    <div className="collapse navbar-collapse" id="navbarColor03" >
      <ul className="navbar-nav me-auto">
        <li className="nav-item">
          <Link className="nav-link active" to="/">Home
            <span className="visually-hidden">(current)</span> 
          </Link>
        </li>
      </ul>


      <div className="collapse navbar-collapse" id="navbarColor03" >
      <ul className="navbar-nav me-auto">
        <li className="nav-item">
          <Link className="nav-link active" to="/myPage">myPage
            <span className="visually-hidden">(current)</span> 
          </Link>
        </li>
      </ul>

      {/* -- 로그인하기 모양 -- */}
      {mem_id == null ?<div className="menu-icon ml-auto" >
          <Link to="/login"><svg xmlns="http://www.w3.org/2000/svg" width="80"
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
              </svg></Link>
      </div> : <Logout/>}
      </div>
    </div>
    
  
  </nav>

    </div>
  )
}


export default header