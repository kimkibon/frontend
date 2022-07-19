import React from 'react'
import { Route, Routes,Link } from 'react-router-dom';
import Member from './member/Member';
import Sidebar from '../commons/Sidebar';
import MyPage from './MyPage';
import QnaList from './qna/QnaList';
import ReportList from './report/ReportList';
import ReserveList from './reserve/ReserveList';
import ReviewList from './review/ReviewList';
import HostIndex from './host/HostIndex';
import InsertQna from './qna/InsertQna';
import MemUseList from './reserve/MemUseList';
import HostDetail from './reserve/HostDetail';
import InsertReview from './review/InsertReview';
import InsertReport from './report/InsertReport';
import MemModify from './member/MemModify';
import MemChange from './member/MemChange';
import MemDelete from './member/MemDelete';

const MyPageIndex = () => {
  return (
    <div>
        <Sidebar/>
        <Link to='host'><li>Host</li></Link>
        <Link to=''><li>MyPage</li></Link>
        <Link to='member'><li>member</li></Link>
        <Link to='report'><li>report</li></Link>
        <Link to='qna'><li>qna</li></Link>
        <Link to='reserveList'><li>reserveList</li></Link>
        <Link to='reviewList'><li>reviewList</li></Link>

    <Routes>
        <Route path='/' element={<MyPage/>}/>

        <Route path='/host/*' element={<HostIndex/>}/>

        <Route path='/member' element={<Member/>}/>
        <Route path='/MemberModify' element={<MemModify/>}/>
        <Route path='/MemberChange' element={<MemChange/>}/>
        <Route path='/MemberDelete' element={<MemDelete/>}/>

        <Route path='/report' element={<ReportList/>}/>
        <Route path='/insertReport' element={<InsertReport/>}/>


        <Route path='/qna' element={<QnaList/>}/>
        <Route path='/insertQna' element={<InsertQna/>}/>

        <Route path='/reserveList' element={<ReserveList/>}/>
        <Route path='/useList' element={<MemUseList/>}/>
        <Route path='/hostDetail' element={<HostDetail/>}/>

        <Route path='/insertReview' element={<InsertReview/>}/>
        <Route path='/reviewList' element={<ReviewList/>}/>
    </Routes>
    
    </div>
  )
}

export default MyPageIndex