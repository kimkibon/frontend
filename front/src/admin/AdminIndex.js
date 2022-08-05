import React, { useEffect } from 'react'
import { Link, Route, Routes, useNavigate } from 'react-router-dom'
import AdminSidebar from '../commons/AdminSidebar'
import AdminBoardReview from './adminHostBoard/AdminBoardReview'
import AdminHostBoardDetail from './adminHostBoard/AdminHostBoardDetail'
import AdminHostBoardList from './adminHostBoard/AdminHostBoardList'
import AdminHostConfirmDetail from './adminHostMember/AdminHostConfirmDetail'
import AdminHostConfirmList from './adminHostMember/AdminHostConfirmList'
import AdminMemberDetail from './adminMember/AdminMemberDetail'
import AdminMemberList from './adminMember/AdminMemberList'
import AdminQnaDetail from './adminQna/AdminQnaDetail'
import AdminQnaList from './adminQna/AdminQnaList'
import AdminReportDetail from './adminReport/AdminReportDetail'
import AdminReportList from './adminReport/AdminReportList'
import AdminAllResList from './adminResList/AdminAllResList'
import AdminResInfo from './adminResList/AdminResInfo'
import ResCancel from '../myPage/reserve/ResCancel';
import Auth from '../login/Auth'

const AdminIndex = () => {
  const navigate = useNavigate();

  useEffect(() => {
    Auth(0, navigate)
  }, [])
  //admin 페이지에 접속하려 했을 경우 권한 검사 
  return (
    <div class="container-fluid">
      <div class="row">


        <div className='col-lg-8'>
          <Link to=''><li>admin index</li></Link>

          <Link to='adminBoardReview'><li>adminBoardReview</li></Link>
          <Link to='adminBoardDetail'><li>adminBoardDetail</li></Link>
          <Link to='adminBoardList'><li>adminBoardList</li></Link>

          <Link to='adminHostConfirmList'><li>adminHostConfirmList</li></Link>
          <Link to='adminHostConfirmDetail'><li>adminHostConfirmDetail</li></Link>

          <Link to='adminMemberList'><li>adminMemberList</li></Link>
          <Link to='adminMemberDetail'><li>adminMemberDetail</li></Link>

          <Link to='adminQnaList'><li>adminQnaList</li></Link>
          <Link to='adminQnaDetail'><li>adminQnaDetail</li></Link>

          <Link to='adminReportList'><li>adminReportList</li></Link>
          <Link to='adminReportDetail'><li>adminReportDetail</li></Link>

          <Link to='adminAllResList'><li>adminAllResList</li></Link>



          <Routes>
            <Route path='/admin' element={<AdminIndex />} />
            <Route path='/adminBoardReview' element={<AdminBoardReview />} />
            <Route path='/adminBoardDetail' element={<AdminHostBoardDetail />} />
            <Route path='/adminBoardList' element={<AdminHostBoardList />} />

            <Route path='/adminHostConfirmList' element={<AdminHostConfirmList />} />
            <Route path='/adminHostConfirmDetail/:MEM_IDX' element={<AdminHostConfirmDetail />} />

            <Route path='/adminMemberList' element={<AdminMemberList />} />
            <Route path='/adminMemberDetail/:MEM_IDX' element={<AdminMemberDetail />} />

            <Route path='/adminQnaList' element={<AdminQnaList />} />
            <Route path='/adminQnaDetail/:QNA_IDX' element={<AdminQnaDetail />} />

            <Route path='/adminReportList' element={<AdminReportList />} />
            <Route path='/adminReportDetail/:REPORT_IDX' element={<AdminReportDetail />} />

            <Route path='/adminAllResList' element={<AdminAllResList />} />
            <Route path='/adminAllResList/adminResInfo/:RES_IDX' element={<AdminResInfo />} />
            <Route path='/adminAllResList/adminResInfo/:RES_IDX/resCancel' element={<ResCancel />} />


          </Routes>
        </div>

        <div class='col-lg-2' />



      </div>
    </div>
  )
}

export default AdminIndex