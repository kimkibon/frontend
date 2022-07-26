import React from 'react'
import { Link } from 'react-router-dom'
import Logout from '../login/Logout'
import './commons.css'

const header = () => {
  return (
    <div className='header'>
      <Link to='/'><h1>header-메인화면으로</h1></Link>

      <Logout/>
      

    </div>
  )
}


export default header