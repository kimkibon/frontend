import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HostInfo from './hostMember/HostInfo'
import HostModify from './hostMember/HostModify'
import HostReport from './hostReport/HostReport'
import HostDetailReport from './hostReport/HostDetailReport'
import HostInsertReport from './hostReport/HostInsertReport'
import HostReserveList from './hostReserve/HostReserveList'
import HostUseList from './hostReserve/HostUseList'
import HostBoardForm from './myBoard/HostBoardForm'
import HostBoardList from './myBoard/HostBoardList'
import HostBoardModifyForm from './myBoard/HostBoardModifyForm'

const HostIndex = () => {
  return (
    <div>
        {/* <Link to=''><li>host index</li></Link>
        <Link to='hostDelete'><li>host delete</li></Link>
        <Link to='hostInfo'><li>host info</li></Link>
        <Link to='hostModify'><li>host modify</li></Link>
        <Link to='hostReport'><li>host Report</li></Link>
        <Link to='hostReserve'><li>host예약내역</li></Link>
        <Link to='hostUseList'><li>host이용내역</li></Link>
        <Link to='hostBoardList'><li>host BoardList</li></Link>
        <Link to='hostBoardForm'><li>host BoardForm</li></Link>
        <Link to='hostBoardModify'><li>hostBoardModify</li></Link> */}
        

        <Routes>
            {/* <Route path='/host' element={<HostIndex/>}/> */}
            <Route path='/hostInfo' element={<HostInfo/>}/>
            <Route path='/hostModify' element={<HostModify/>}/>
            <Route path='/hostReport' element={<HostReport/>}/>
            <Route path='/hostReport/HostDetailReport/:REPORT_IDX' element={<HostDetailReport/>}/>
            <Route path='/hostUseList/HostInsertReport' element={<HostInsertReport/>}/>
            <Route path='/hostReserve/HostInsertReport' element={<HostInsertReport/>}/>
            <Route path='/hostReserve' element={<HostReserveList/>}/>
            <Route path='/hostUseList' element={<HostUseList/>}/>
            <Route path='/hostBoardList' element={<HostBoardList/>}/>
            <Route path='/hostBoardForm' element={<HostBoardForm/>}/>
            <Route path='/hostBoardModify' element={<HostBoardModifyForm/>}/>
        </Routes>
    </div>
  )
}

export default HostIndex