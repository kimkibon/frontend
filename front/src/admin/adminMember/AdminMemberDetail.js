import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';

const AdminMemberList = () => {
  
  const location = useLocation();
  const getIdx = location.state.MEM_IDX; 

  const [getMem, setGetMem] = useState({ // MEM_IDX는 list에서 넘어온 값으로 초기값 지정
    MEM_ID : getIdx,
    MEM_PW : '',
    MEM_LEVEL : '',
    MEM_NAME : '',
    MEM_PHONE : ''
  });
  useEffect(() => { // 해당 MEM_IDX로 나머지 정보 가져옴
        axios({ 
        method : 'post',
        url : '/GareBnB/mypage/selectMemberDetail.do', 
        contentType:"application/json; charset=UTF-8",
        params : { 
            MEM_IDX : getIdx
        }})

    .then(Response => { 
    console.log(Response.data);
    setGetMem(Response.data);
    })
    },[]); 


  const [memDenyModify , setMemDenyModify] = useState();
  const adminModifySuccess = () => { // 저장 버튼 클릭 시 update sql문 실행됨 (레벨 업데이트 - 정지)
    axios({
    method : 'post',
    url : '/GareBnB/Admin/memberDeny.do',
    contentType:"apllication/json; charset=UTF-8",
    params : {
      MEM_IDX : getMem.MEM_IDX 
    } })
  .then(Response => {
    console.log(Response.data);
    setMemDenyModify(Response.data);
  })
  }

  const [checked, setChecked] = useState(false); // 체크 여부 (true : 체크, false : 해제)

  const checkedHandler = () => { // !!!!!!!! 체크 박스 기능 수정해야함 !!!!!!!!
    setChecked(!checked);
  }

  // [QQQQQQQ] 정지된 회원 체크 박스 해제(레벨 업데이트(1 or 2) 기능) 추가??????

  return (
    <article>
      <h1>일반 회원 상세보기</h1>
      <ul>
      <li>번호(IDX) : {getMem.MEM_IDX}</li>
      <li>아이디 :{getMem.MEM_ID} </li>
      <li>비밀번호 : {getMem.MEM_PW} </li>
      <li>이름 : {getMem.MEM_NAME} </li>
      <li>휴대폰 번호 : {getMem.MEM_PHONE}</li>
      <li>회원상태 : <input type="checkbox" onChange={checkedHandler}></input> 회원정지 </li><br/>
      <button type="submit" onClick={adminModifySuccess}>수정완료</button>  &emsp; &emsp; 
      <button><Link to = '/admin/adminMemberList'>취소</Link></button></ul>
      </article>
  );
    }

export default AdminMemberList


