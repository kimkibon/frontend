import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import FindId from './findInfo/FindId'
import FindIdResult from './findInfo/FindIdResult'
import FindPw from './findInfo/FindPw'
import FindPwResult from './findInfo/FindPwResult'
import Login from './LoginPage'



const LoginIndex = () => {
  

  return (
   
  
   
    <Routes>
    <Route path='/' element={<Login/>}/>
    <Route path='/loginPage' element = {<Login/>}/>
    <Route path='/findId' element = {<FindId/>}/>
    <Route path='/findPw' element ={<FindPw/>}/>
    <Route path='/findIdResult' element ={<FindIdResult/>}/>
    <Route path='/findPwResult' element ={<FindPwResult/>}/>
    </Routes>
   
  )
}

export default LoginIndex