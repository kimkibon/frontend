import React, { useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom';

import MyPage from './MyPage';
import QnaList from './qna/QnaList';
import ReportList from './report/ReportList';
import ReserveListPage from './reserve/ReserveListPage';
import ReviewList from './review/ReviewList';
import HostIndex from './host/HostIndex';
import InsertQna from './qna/InsertQna';
import MemUseList from './reserve/MemUseList';
import InsertReview from './review/InsertReview';
import InsertReport from './report/InsertReport';

import ResCancel from './reserve/ResCancel';
import ResConfirm from './reserve/ResConfirm';
import MemUseListPage from './reserve/MemUseListPage';
import Myreview from './review/Myreview';
import ModifyReview from './review/ModifyReview';
import DeleteReview from './review/DeleteReview';

import Member from './member/Member';
import MemDetail from './member/MemDetail';
import MemChange from './member/MemChange';
import MemModify from './member/MemModify';
import DetailQna from './qna/DetailQna';
import DetailReport from './report/DetailReport';
import Auth from '../login/Auth';
//import Layout from './Layout';

const MyPageIndex = () => {
  const [author, setAuthor] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    Auth(4, navigate).then(Res => {
      setAuthor(Res);
    })
  }, [])
  return (
    <div className="container-fluid">
      <div className="row">

        {/* <div className='col-lg-2'>
          <Sidebar />
        </div> */}

        {/* <Layout>
        <Link to='host'><li>Host</li></Link>
        <Link to=''><li>MyPage</li></Link>
        <Link to='member'><li>member</li></Link>
        <Link to='report'><li>report</li></Link>
        <Link to='qna'><li>qna</li></Link>
        <Link to='ReserveListPage'><li>ReserveListPage</li></Link>
        <Link to='memUseListPage'><li>MemUseListPage</li></Link>
        <Link to='reviewList'><li>reviewList</li></Link>
        </Layout> */}

        <Routes>
          <Route path='/' element={<MyPage />} />

          <Route path='/host/*' element={<HostIndex />} />

          <Route path='/member/*' element={<Member />} />
          <Route path='/member/MemDetail' element={<MemDetail />} />
          <Route path='/member/MemChange' element={<MemChange />} />
          <Route path='/member/MemModify' element={<MemModify />} />

          <Route path='/report' element={<ReportList />} />
          <Route path='/memUseListPage/insertReport' element={<InsertReport />} />
          <Route path='/report/DetailReport/:REPORT_IDX' element={<DetailReport />} />


          <Route path='/qna' element={<QnaList />} />
          <Route path='/insertQna' element={<InsertQna />} />
          <Route path='/qna/DetailQna/:QNA_IDX' element={<DetailQna />} />
          <Route path='/ReserveListPage' element={<ReserveListPage />} />
          <Route path='/ReserveListPage/resCancel' element={<ResCancel />} />
          <Route path='/ReserveListPage/resConfirm' element={<ResConfirm />} />
          <Route path='/memUseListPage' element={<MemUseListPage />} />
          <Route path='/memUseListPage/memUseList' element={<MemUseList />} />
          <Route path='/memUseListPage/myreview' element={<Myreview />} />
          <Route path='/memUseListPage/myreview/ModifyReview' element={<ModifyReview />} />
          <Route path='/memUseListPage/myreview/DeleteReview' element={<DeleteReview />} />
          <Route path='/memUseListPage/insertReview' element={<InsertReview />} />
          <Route path='/reviewList' element={<ReviewList />} />
        </Routes>




      </div>
    </div>
  )
}


export default MyPageIndex