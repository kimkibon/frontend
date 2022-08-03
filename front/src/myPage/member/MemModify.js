import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, Link } from 'react-router-dom';
import Modal from '../member/Modal';

// 회원정보 보기 - 수정

const MemModify = () => {

  const [password, setPassword] = useState(''); // '수정할 비밀번호'
  const [passwordCheck, setPasswordCheck] = useState(''); // '수정할 비밀번호 확인'
  const [passwordError, setPasswordError] = useState(false); // 수정된 비밀번호 불일치 할 때 에러
  
  const [PhoneOK, setPhoneOK] = useState("0"); //미인증:0 인증:1 폰인증 됐는지?
  const [InputVerifyCode, setInputVerifyCode] = useState(""); //입력한 인증번호
  const [RealVerifyCode, setRealVerifyCode] = useState(""); //서버에서 넘어온 VerifyCode

  const location = useLocation();
  const mem = location.state.mem;   // MemDetail의 member 정보를 MemModify로 넘겨줌 (mem)

  const [memModify , setMemModify] = useState ({ // memModify 초기값으로 mem의 값 지정
    MEM_ID : mem.MEM_ID,
    MEM_PW : mem.MEM_PW, 
    MEM_NAME : mem.MEM_NAME, 
    MEM_PHONE : mem.MEM_PHONE
  });

  const { MEM_PW, MEM_NAME, MEM_PHONE } = memModify;

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



const onSubmit = (e) => {
  e.preventDefault();
  if (password !== passwordCheck) { // 수정할 비밀번호와 수정할 비밀번호 확인이 다를 때
    return setPasswordError(true) // 에러 띄움
  } else {
    if(password.length <8){ // 수정할 비밀번호가 8자 미만일 때
      alert("비밀번호를 8자 이상 입력해주세요.")
    } else {
    console.log(password);
    setMemModify( {
      ...memModify, 
      'MEM_PW' : password // password == passwordcheck면 password를 MEM_PW에 넣기
    });
    return setModalOpen(false)     
  }
}
}

const onChangePassword = (e) => {
   setPassword(e.target.value);
};

const onChangePasswordChk = (e) => {
  setPasswordCheck(e.target.value);
  setPasswordError(e.target.value !== password);
}

const getInputVerifyCode = (e) =>{ // 인증번호 
  setInputVerifyCode(e.target.value);
};

const send = () =>{
  axios({
    method : 'post',
    url : '/GareBnB/PhoneNumberCheck.do' ,
    contentType : "application/json;charset=UTF-8",
    params : {
      'to' : MEM_PHONE
    }
  }).then(Response =>{
    console.log(Response.data)
    console.log(Response.data.value)
    setRealVerifyCode(Response.data)
  }).catch(err=>{
    console.log(err);
    alert("에러")
  })
}  

const verify = () =>{
  if (InputVerifyCode == RealVerifyCode){
    alert("인증이 완료되었습니다.")
    setPhoneOK(1)
    console.log(PhoneOK)
  }
  else{
    alert("인증에 실패하였습니다.")
    console.log(RealVerifyCode)
    console.log(InputVerifyCode)
  }
}

const ModifySuccess = () => { // 아래 유효성 검사를 진행
  if(MEM_NAME===''){
    alert ('이름을 입력해주세요.')
  } else {
    if(MEM_PW===''){
      alert('비밀번호 수정하기를 통해 비밀번호를 입력해주세요.')
    } else {
      if(MEM_PW.length <8){
        alert('비밀번호를 8자 이상 입력해주세요.')
      } else {
      if(MEM_PHONE ===''){
        alert('휴대폰 번호 인증하기를 통해 휴대폰 번호를 입력해주세요')
      } else {
          // 수정완료 버튼 클릭 시 update sql문 실행됨
            axios({
            method : 'post',
            url : '/GareBnB/mypage/memModify.do',
            contentType:"apllication/json; charset=UTF-8",
            params : {
              MEM_ID : mem.MEM_ID,
              MEM_PW : MEM_PW,
              MEM_NAME : MEM_NAME,
              MEM_PHONE : MEM_PHONE
            }})
          .then(Response => {
            alert('수정완료에 성공하였습니다');
            window.location.href = '../member/MemDetail'; // 수정완료 성공 알림창 확인 버튼 클릭 시 회원정보 보기 페이지로 이동됨
          })}}}}}

  return (
    <div>
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
      <button onClick={onSubmit}>확인</button> &emsp; &emsp;
      <button onClick={()=>setModalOpen(false)}>취소</button>
      </Modal>

      <li>휴대폰 번호 : <input name = "MEM_PHONE" onChange={onChange} defaultValue={MEM_PHONE}/> 
      <button onClick={send}>휴대폰 인증하기</button></li>
      <li>인증 번호 : <input name = "Verify" onChange={getInputVerifyCode} value={InputVerifyCode}/> 
      <button onClick={verify}>인증 확인</button></li>
      <button type="submit" onClick={ModifySuccess}>수정완료</button>  &emsp; &emsp; 
      <button><Link to = '../member/MemDetail'>취소</Link></button>
      </ul>
      
     </div>
  )
  }

export default MemModify