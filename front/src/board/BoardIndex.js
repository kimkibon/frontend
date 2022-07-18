import React from 'react'
import {  Link, Route, Routes } from 'react-router-dom'
import BoardDetail from './boardDetail/BoardDetail'
import ResRequest from './boardDetail/ResRequest'
import ResRequestDetail from './boardDetail/ResRequestDetail'
import BoardList from './boardList/BoardList'

const BoardIndex = () => {
  return (
    <div>
      
        <Link to=''><li>boardList</li></Link>
        <Link to='detail'><li>boardDetail</li></Link>
        <Link to='res'><li>reserve</li></Link>
        <Link to='resDetail'><li>resDetail</li></Link>
        
        <Routes>
        <Route path='/' element={<BoardList/>}/>
        <Route path='/detail' element={<BoardDetail/>}/>
        <Route path='/res' element={<ResRequest/>}/>
        <Route path='/resDetail' element={<ResRequestDetail/>}/>
        </Routes>
   </div>
  )
}

export default BoardIndex