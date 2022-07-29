import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import FindId from './findInfo/FindId'
import FindIdResult from './findInfo/FindIdResult'
import FindPw from './findInfo/FindPw'
import FindPwResult from './findInfo/FindPwResult'
import Login from './LoginPage'
import Logintest from './logintest'
import { Navigate, useNavigate } from 'react-router-dom';


const LoginIndex = () => {
  

  return (
    <div>
   
   <Link to='LoginPage'><li>LoginPage</li></Link>
    <Link to='findId'><li>findId</li></Link>
    <Link to='findIdResult'><li>findIdResult</li></Link>
    <Link to='findPw'><li>findPw</li></Link>
    <Link to='findPwResult'><li>findPwResult</li></Link>
   
    <Routes>
    <Route path='/loginPage' element = {<Login/>}/>
    <Route path='/findId' element = {<FindId/>}/>
    <Route path='/findPw' element ={<FindPw/>}/>
    <Route path='/findIdResult' element ={<FindIdResult/>}/>
    <Route path='/findPwResult' element ={<FindPwResult/>}/>
    </Routes>
    </div>
  )
}

export default LoginIndex