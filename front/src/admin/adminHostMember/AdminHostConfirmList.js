import React, { useState , useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AdminHostList = () => {

  const [hostResList, setHostResList] = useState([]); // 전체 회원 리스트 db에서 가져오기 

    useEffect(() => { // 전체 회원 리스트이므로, params 생략
        axios({ 
        method : 'post',
        url : '/GareBnB/Admin/hostConfirmList.do', 
        contentType:"application/json; charset=UTF-8"
        })
    .then(Response => { 
    console.log(Response.data);
    setHostResList(Response.data);
    });
    },[]); 

  return (
    <div>
      <h1>호스트 등록 요청 리스트</h1> 
    <table border="3">
      <thead>
            <tr align="center">
            <td width = "100">번호(IDX)</td>
            <td width = "200">이름</td>
            <td width = "200">아이디</td>
            <td width = "200">비밀번호</td>
            <td width = "200">휴대폰번호</td>
          </tr>
      </thead>
     {hostResList.map((list)=> {
      return (
        <tbody key={list.MEM_IDX}>
          <tr align="center">
            <Link to = {'/admin/AdminHostConfirmDetail/'+list.MEM_IDX} state = {{'MEM_IDX' : list.MEM_IDX}}>
            <td>{list.MEM_IDX}</td></Link>
            <td>{list.MEM_NAME}</td>
            <td>{list.MEM_ID}</td>
            <td>{list.MEM_PW}</td>
            <td>{list.MEM_PHONE}</td>
          </tr></tbody>

      )
     })}
     </table>
  </div>
  )
}

export default AdminHostList