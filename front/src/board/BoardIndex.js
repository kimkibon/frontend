import React from 'react'
import { Route, Routes } from 'react-router-dom'
import BoardDetail from './boardDetail/BoardDetail'
import ResRequest from './boardDetail/ResRequest'
import BoardList from './boardList/BoardList'

const BoardIndex = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<BoardList />} />
        <Route path='/detail' element={<BoardDetail />} />
        <Route path='/res' element={<ResRequest />} />
      </Routes>
    </div>
  )
}

export default BoardIndex