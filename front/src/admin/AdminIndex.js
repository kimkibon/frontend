import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import AdminBoardReview from './adminHostBoard/AdminBoardReview'
import AdminHostBoardDetail from './adminHostBoard/AdminHostBoardDetail'
import AdminHostBoardList from './adminHostBoard/AdminHostBoardList'
import AdminHostDetail from './adminHostMember/AdminHostDetail'
import AdminHostList from './adminHostMember/AdminHostList'
import AdminMemberDetail from './adminMember/AdminMemberDetail'
import AdminMemberList from './adminMember/AdminMemberList'
import AdminQnaDetail from './adminQna/AdminQnaDetail'
import AdminQnaList from './adminQna/AdminQnaList'
import AdminReportDetail from './adminReport/AdminReportDetail'
import AdminReportList from './adminReport/AdminReportList'

const AdminIndex = () => {
  return (
    <div>
      <Link to=''><li>admin index</li></Link>
      
      <Link to='adminBoardReview'><li>adminBoardReview</li></Link>
      <Link to='adminBoardDetail'><li>adminBoardDetail</li></Link>
      <Link to='adminBoardList'><li>adminBoardList</li></Link>

      <Link to='adminHostList'><li>adminHostList</li></Link>
      <Link to='adminHostDetail'><li>adminHostDetail</li></Link>

      <Link to='adminMemberList'><li>adminMemberList</li></Link>
      <Link to='adminMemberDetail'><li>adminMemberDetail</li></Link>

      <Link to='adminQnaList'><li>adminQnaList</li></Link>
      <Link to='adminQnaDetail'><li>adminQnaDetail</li></Link>

      <Link to='adminReportList'><li>adminReportList</li></Link>
      <Link to='adminReportDetail'><li>adminReportDetail</li></Link>

      <Routes>
        <Route path='/admin' element={<AdminIndex/>}/>
        <Route path='/adminBoardReview' element={<AdminBoardReview/>}/>
        <Route path='/adminBoardDetail' element={<AdminHostBoardDetail/>}/>
        <Route path='/adminBoardList' element={<AdminHostBoardList/>}/>

        <Route path='/adminHostList' element={<AdminHostList/>}/>
        <Route path='/adminHostDetail' element={<AdminHostDetail/>}/>

        <Route path='/adminMemberList' element={<AdminMemberList/>}/>
        <Route path='/adminMemberDetail' element={<AdminMemberDetail/>}/>

        <Route path='/adminQnaList' element={<AdminQnaList/>}/>
        <Route path='/adminQnaDetail' element={<AdminQnaDetail/>}/>

        <Route path='/adminReportList' element={<AdminReportList/>}/>
        <Route path='/adminReportDetail' element={<AdminReportDetail/>}/>

      </Routes>
      
    </div>
  )
}

export default AdminIndex