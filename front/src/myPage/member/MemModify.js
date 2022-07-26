import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, Link } from 'react-router-dom';
import Modal from '../member/Modal';

// 회원정보 보기 - 수정

const MemModify = () => {

  const location = useLocation();
  const mem = location.state.mem;   // MemDetail의 member 정보를 MemModify로 넘겨줌 (mem)

  const [memModify , setMemModify] = useState ({ // memModify 초기값으로 mem의 값 지정
    MEM_ID : mem.MEM_ID,
    MEM_PW : mem.MEM_PW, 
    MEM_NAME : mem.MEM_NAME, 
    MEM_PHONE : mem.MEM_PHONE
  });

  const { MEM_PW, MEM_NAME, MEM_PHONE } = memModify;

  const ModifySuccess = () => { // 수정완료 버튼 클릭 시 update sql문 실행됨
    axios({
    method : 'post',
    url : '/GareBnB/mypage/memModify.do',
    contentType:"apllication/json; charset=UTF-8",
    params : {
      MEM_ID : mem.MEM_ID,
      MEM_PW : MEM_PW,
      MEM_NAME : MEM_NAME,
      MEM_PHONE : MEM_PHONE
    } })
  .then(Response => {
    console.log(Response.data); // [QQQQQQQQQQ] 왜 콘솔에 안 뜨지????????
    setMemModify(Response.data);
    alert('수정완료 성공');
    window.location.href = '../member/MemDetail'; // 수정완료 성공 알림창 확인 버튼 클릭 시 회원정보 보기 페이지로 이동됨
  })
  }

  const onChange = (e) => { // 수정하면 복사된 memModify에 name & value가 setMemModify에 입력됨 
    const {name, value} = e.target;
    setMemModify( {
      ...memModify, 
      [name] : value
    });
  };

  const [modalOpen, setModalOpen] = useState(false); //  모달 오픈 상태 (true: 열림, false : 닫힘) - 비밀번호 입력하는 모달
  const openModal = () => {
        setModalOpen(true);
      };
  const closeModal = () => {
        setModalOpen(false);
      };

const [password, setPassword] = useState(''); // '수정할 비밀번호'
const [passwordCheck, setPasswordCheck] = useState(''); // '수정할 비밀번호 확인'
const [passwordError, setPasswordError] = useState(false); // 수정된 비밀번호 불일치 할 때 에러


const onSubmit = (e) => {
  e.preventDefault();
  if (password !== passwordCheck) { // 수정할 비밀번호와 수정할 비밀번호 확인이 다를 때
    return setPasswordError(true) // 에러 띄움
  } else {
    console.log(password);
    setMemModify( {
      ...memModify, 
      'MEM_PW' : password
    });
    return setModalOpen(false)

  }
  // password == passwordcheck면 password를 MEM_PW에 넣기
}


const onChangePassword = (e) => {
   setPassword(e.target.value);
};

const onChangePasswordChk = (e) => {
  setPasswordCheck(e.target.value);
  setPasswordError(e.target.value !== password);
}
  return (
    <article>
      <h1>회원정보 수정</h1>
      
      <ul>
      <li>아이디 : {mem.MEM_ID} </li>
      <li>이름 : <input name = "MEM_NAME" onChange={onChange} defaultValue={MEM_NAME} /> </li>
      <li>비밀번호 : <input type="password" value= {MEM_PW} readOnly />
      <button onClick={openModal}>비밀번호 수정하기</button> </li>
      
 
      <Modal open = {modalOpen} close= {closeModal}>
      <h3>수정할 비밀번호 : <input id='PW' type="password" value={password} onChange={onChangePassword}></input></h3>
      <h3>수정할 비밀번호 확인 :<input type="password" value={passwordCheck} onChange={onChangePasswordChk}></input></h3>
      {passwordError && <div style={{color:'red'}}>비밀번호가 일치하지 않습니다.</div>}
      <button onClick={onSubmit}>확인</button> &nbsp; &nbsp; &nbsp; &nbsp;
      <button onClick={()=>setModalOpen(false)}>취소</button>
      </Modal>

     
      <li>휴대폰 번호 : <input name = "MEM_PHONE" onChange={onChange} defaultValue={MEM_PHONE}/> </li>
      <button type="submit" onClick={ModifySuccess}>수정완료</button>  &emsp; &emsp; 
      <button><Link to = '../member/MemDetail'>취소</Link></button>
      </ul>
      
     </article>
  )
  }

export default MemModify