import React from 'react'
import { Route, Routes,Link } from 'react-router-dom';
import Member from './member/Member';
import Sidebar from '../commons/Sidebar';
import MyPage from './MyPage';
import QnaList from './qna/QnaList';
import ReportList from './report/ReportList';
import ReserveList from './reserve/ReserveList';
import ReviewList from './review/ReviewList';
const MyPageIndex = () => {
  return (
    <div>
        <Sidebar/>
        <Link to=''><li>MyPage</li></Link>
        <Link to='member'><li>member</li></Link>
        <Link to='report'><li>report</li></Link>
        <Link to='qna'><li>qna</li></Link>
        <Link to='reserveList'><li>reserveList</li></Link>
        <Link to='reviewList'><li>reviewList</li></Link>

    <Routes>
        <Route path='/' element={<MyPage/>}/>
        <Route path='/member' element={<Member/>}/>
        <Route path='/report' element={<ReportList/>}/>
        <Route path='/qna' element={<QnaList/>}/>
        <Route path='/reserveList' element={<ReserveList/>}/>
        <Route path='/reviewList' element={<ReviewList/>}/>
    </Routes>
    
    </div>
  )
}

export default MyPageIndex