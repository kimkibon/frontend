import React, { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
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
    <div className="container-fluid">

          <Routes>
            <Route path='/admin' element={<AdminIndex />} />
            <Route path='/adminBoardList' element={<AdminHostBoardList />} />

            <Route path='/adminHostConfirmList' element={<AdminHostConfirmList />} />
            <Route path='/adminHostConfirmDetail/:MEM_IDX' element={<AdminHostConfirmDetail />} />

            <Route path='/adminMemberList' element={<AdminMemberList />} />
            <Route path='/adminMemberDetail/:MEM_IDX' element={<AdminMemberDetail />} />

            <Route path='/adminQnaList' element={<AdminQnaList />} />
            <Route path='/adminQnaList/adminQnaDetail/:QNA_IDX' element={<AdminQnaDetail />} />

            <Route path='/adminReportList' element={<AdminReportList />} />
            <Route path='/adminReportDetail/:REPORT_IDX' element={<AdminReportDetail />} />

            <Route path='/adminAllResList' element={<AdminAllResList />} />
            <Route path='/adminAllResList/adminResInfo/:RES_IDX' element={<AdminResInfo />} />
            <Route path='/adminAllResList/adminResInfo/:RES_IDX/resCancel' element={<ResCancel />} />


          </Routes>

    </div>
  )
}

export default AdminIndex