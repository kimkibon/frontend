import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';

const AdminMemberList = () => {

  const [memList, setMemList] = useState([]); // 전체 회원 리스트 db에서 가져오기 
  const [search, setSearch] = useState(""); // 검색 단어

  useEffect(() => { // 전체 회원 리스트이므로, params 생략
    axios({
      method: 'post',
      url: '/GareBnB/Admin/memberList.do',
      contentType: "application/json; charset=UTF-8"
    })
      .then(Response => {
        setMemList(Response.data);
      });
  }, []);

  const onChangeSearch = (e) => { // 검색 버튼 클릭했을 때 검색 기능
    e.preventDefault();
    setSearch(e.target.value);
  }

  const onSearch = (e) => {
    e.preventDefault();
    if (search === null || search === '') { // 검색 단어가 null 이거나 공백이면 전체 리스트 보여줌
      axios({
        method: 'post',
        url: '/GareBnB/Admin/memberList.do',
        contentType: "application/json; charset=UTF-8"
      })
        .then(Response => {
          setMemList(Response.data);
        });
    } else { // 검색 단어가 있으면 이름에 단어 포함된 리스트를 보여줌
      const filterData = memList.filter((list) =>
        list.MEM_ID.includes(search) || list.MEM_NAME.includes(search)) // [QQQ] list.MEM_IDX 검색 안 됨 ㅠ_ㅠ
      setMemList(filterData);
    }
  }

  const reset = () => { // 검색 초기화
    setSearch('');
  }

  const handleKeyPress = (e) => { // 비밀번호 입력 후, 엔터키를 누르면 로그인 함수 실행
    if (e.key === 'Enter') {
      onSearch(e);
    }
  }

  return (
    <div className='container'>
      <hr />
      <h3>회원 관리</h3>
      <hr />

      {/* 검색창 기능(ID와 이름으로 검색 가능) */}
      <form onSubmit={e => onSearch(e)}>
        <div className="row d-flex justify-content-center align-items-center">
          <label className="col-2 col-form-label">검색어 (아이디 / 이름)</label>
          <div className='col-5 text-center'>
            <input className="form-control" type="text" value={search} placeholder="검색어 입력"
              onChange={onChangeSearch} onKeyPress={handleKeyPress}></input></div> &nbsp;
          <div className='col-2'>
            <Button className="btn btn-primary " type="submit">검색</Button> &nbsp;
            <Button className="btn btn-secondary " type="submit" onClick={reset}>초기화</Button><br /></div>
        </div></form>
      <br />

      <Table striped width="900px" height="30px" className="table table-hover">
        <thead>
          <tr align='center'>
            <td width="20%">번호(IDX)</td>
            <td width="20%">이름</td>
            <td width="30%">아이디</td>
            <td width="30%">휴대폰 번호</td>
          </tr>
        </thead>

        {memList[0] !== undefined && memList.map((list) => {
          return (
            <tbody>
              <tr align='center' onClick={() => { window.location.href = '/admin/adminMemberDetail/' + list.MEM_IDX }}>
                <td> {list.MEM_IDX}</td>
                <td>{list.MEM_NAME}</td>
                <td>{list.MEM_ID}</td>
                <td>{list.MEM_PHONE}</td>
              </tr>
            </tbody>
          )
        })}
      </Table>
    </div>
  );
}

export default AdminMemberList



