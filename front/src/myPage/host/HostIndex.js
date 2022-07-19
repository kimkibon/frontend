import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import HostDelete from './hostMember/HostDelete'
import HostReport from './hostReport/HostReport'
import HostReserveList from './hostReserve/HostReserveList'
import HostBoardForm from './myBoard/HostBoardForm'
import HostBoardList from './myBoard/HostBoardList'

const HostIndex = () => {
  return (
    <div>
        <Link to=''><li>host index</li></Link>
        <Link to='hostDelete'><li>host delete</li></Link>
        <Link to='hostReport'><li>host Report</li></Link>
        <Link to='hostReserve'><li>host Reserve</li></Link>
        <Link to='hostBoardList'><li>host BoardList</li></Link>
        <Link to='hostBoardForm'><li>host BoardForm</li></Link>
        

        <Routes>
            <Route path='/host' element={<HostIndex/>}/>
            <Route path='/hostDelete' element={<HostDelete/>}/>
            <Route path='/hostReport' element={<HostReport/>}/>
            <Route path='/hostReserve' element={<HostReserveList/>}/>
            <Route path='/hostBoardList' element={<HostBoardList/>}/>
            <Route path='/hostBoardForm' element={<HostBoardForm/>}/>
        </Routes>
    </div>
  )
}

export default HostIndex