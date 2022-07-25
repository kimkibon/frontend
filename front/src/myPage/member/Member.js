import React from 'react'
import { Link, Route, Routes } from "react-router-dom";
import MemDetail from './MemDetail';
import MemChange from './MemChange';




const Member = () => {

    return (
<div>
        <h1> MEMBER </h1>
        <ul>
            <li><Link to="./MemDetail">회원정보 보기</Link></li>
            <li><Link to="./MemChange">호스트 전환하기</Link> </li>
        </ul>

        <Routes>
        <Route path='./MemDetail' element={<MemDetail/>}/>
        <Route path='./MemChange' element={<MemChange/>}/>

        </Routes>

</div>
    )
}
export default Member