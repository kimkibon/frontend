import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, Link } from 'react-router-dom';


// 회원정보 보기 - 수정

const HostModify = () => {

  const location = useLocation();
  const mem = location.state.mem;   // HostInfo의 member 정보를 HostModify로 넘겨줌 (mem)
console.log(mem)

  const [hostModify , setHostModify] = useState ({ // hostModify 초기값으로 mem의 값 지정
    MEM_ID : mem.MEM_ID,
    MEM_IDX : mem.MEM_IDX,
    MEM_PW : mem.MEM_PW, 
    MEM_NAME : mem.MEM_NAME, 
    MEM_PHONE : mem.MEM_PHONE,
    HOST_EMAIL : mem.HOST_EMAIL,
    HOST_POST : mem.HOST_POST,
    HOST_ADDR1 : mem.HOST_ADDR1,
    HOST_ADDR2 : mem.HOST_ADDR2,
    HOST_INTRO : mem.HOST_INTRO,
    HOST_BANK : mem.HOST_BANK,
    HOST_ACCOUNT : mem.HOST_ACCOUNT
  });

  const { MEM_ID, MEM_IDX, MEM_PW, MEM_NAME, MEM_PHONE, HOST_EMAIL,
    HOST_POST, HOST_ADDR1, HOST_ADDR2, HOST_INTRO, HOST_BANK, HOST_ACCOUNT} = hostModify;


  const HostModifySuccess= () => { // 수정완료 버튼 클릭 시 update sql문 실행됨
    axios({
    method : 'post',
    url : '/GareBnB/mypage/hostModify.do',
    contentType:"apllication/json; charset=UTF-8",
    params : {
      MEM_IDX : MEM_IDX,
      HOST_EMAIL : HOST_EMAIL,
      HOST_POST : HOST_POST,
      HOST_ADDR1 : HOST_ADDR1,
      HOST_ADDR2 : HOST_ADDR2,
      HOST_INTRO : HOST_INTRO,
      HOST_BANK : HOST_BANK,
      HOST_ACCOUNT : HOST_ACCOUNT
    } })
  .then(Response => {
    alert('수정완료 성공');
    window.location.href = '../hostInfo'; // 수정완료 성공 알림창 확인 버튼 클릭 시 회원정보 보기 페이지로 이동됨
  })
  }

  const onChange = (e) => { // 수정하면 복사된 hostModify name & value가 setHostModify 입력됨 
    const {name, value} = e.target;
    setHostModify( {
      ...hostModify, 
      [name] : value
    });
    console.log(hostModify)
  };


  return (
    <article>
      <h1>회원정보 수정</h1>
      <h3>이름, 비밀번호, 휴대폰번호는 일반회원 페이지에서 수정하실 수 있습니다.</h3>
      
      <ul>
      <li>아이디 : {MEM_ID} </li>
      <li>이름 : {MEM_NAME} </li>
      <li>비밀번호 : {MEM_PW} </li>
      <li>휴대폰 번호 : {MEM_PHONE}</li>
      <li>이메일 : <input name="HOST_EMAIL" value={HOST_EMAIL} onChange={onChange}></input></li>
      <li>우편번호 : <input name="HOST_POST" value={HOST_POST} onChange={onChange}></input></li>
      <li>기본주소 : <input name="HOST_ADDR1" value={HOST_ADDR1} onChange={onChange}></input></li>
      <li>상세주소 : <input name="HOST_ADDR2" value={HOST_ADDR2} onChange={onChange}></input></li>
      <li>소개글 : <input name="HOST_INTRO" value={HOST_INTRO} onChange={onChange}></input></li>
      <li>은행 : <input name="HOST_BANK" value={HOST_BANK} onChange={onChange}></input></li>
      <li>계좌번호 : <input name="HOST_ACCOUNT" value={HOST_ACCOUNT} onChange={onChange}></input></li>
      <button type="submit" onClick={HostModifySuccess}>수정완료</button>  &emsp; &emsp; 
      <button><Link to = '../hostInfo'>취소</Link></button>
      </ul>
      
     </article>
  )
  }

export default HostModify