import React, { useState , useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const AdminMemberList = () => {

  const [memList, setMemList] = useState([]); // 전체 회원 리스트 db에서 가져오기 

  const [search, setSearch] = useState(""); // 검색 단어

    useEffect(() => { // 전체 회원 리스트이므로, params 생략
        axios({ 
        method : 'post',
        url : '/GareBnB/Admin/memberList.do', 
        contentType:"application/json; charset=UTF-8"
        })
    .then(Response => { 
    console.log(Response.data);
    setMemList(Response.data);
    });
    },[]); 
  
  const onChangeSearch = (e) => { // 검색 버튼 클릭했을 때 검색 기능
    e.preventDefault();
    setSearch(e.target.value);
  }

  const onSearch = (e) => {
    e.preventDefault();
    if (search === null || search === '') { // 검색 단어가 null 이거나 공백이면 전체 리스트 보여줌
      axios({ 
        method : 'post' ,
        url : '/GareBnB/Admin/memberList.do' , 
        contentType:"application/json; charset=UTF-8"
        })

    .then(Response => { 
    console.log(Response.data);
    setMemList(Response.data);
    });

    } else { // 검색 단어가 있으면 이름에 단어 포함된 리스트를 보여줌
      const filterData = memList.filter((list) => 
      list.MEM_ID.includes(search) || list.MEM_NAME.includes(search) ) // [QQQQQQQQQQ] list.MEM_IDX 검색 안 됨 ㅠ_ㅠ
      setMemList(filterData);
    }
    setSearch('')
  }

  return (
    <div>
      <h1>일반 회원 관리</h1> 
      <form onSubmit={e => onSearch(e)}>
      <h2>검색어(ID/이름) : &nbsp;
      <input type = "text" value={search} placeholder = "내용을 입력해 주세요" onChange={onChangeSearch}></input> &nbsp;
      <button type="submit">검색</button></h2></form>
      
      
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
       {memList.map((list)=> {
        return (
          <tbody key={list.MEM_IDX}>
            <tr align="center">
              <Link to = {'/admin/adminMemberDetail/'+list.MEM_IDX} state = {{'MEM_IDX' : list.MEM_IDX}}>
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
  );
}

export default AdminMemberList



