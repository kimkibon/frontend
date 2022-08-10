import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, Link } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';

// 회원정보 보기 -> 수정

const MemModify = () => {

  const [password, setPassword] = useState(''); // '수정할 비밀번호'
  const [passwordCheck, setPasswordCheck] = useState(''); // '수정할 비밀번호 확인'
  const [passwordError, setPasswordError] = useState(false); // 수정된 비밀번호 불일치 할 때 에러

  const [modifyPhoneOK, setModifyPhoneOK] = useState("1"); // 미인증:0 인증:1 폰인증 됐는지?
  const [InputVerifyCode, setInputVerifyCode] = useState(""); // 입력한 인증번호
  const [RealVerifyCode, setRealVerifyCode] = useState(""); // 서버에서 넘어온 VerifyCode

  const [show, setShow] = useState(false);

  const location = useLocation();
  const mem = location.state.mem;   // MemDetail의 member 정보를 MemModify로 넘겨줌 (mem)

  const [memModify, setMemModify] = useState({ // memModify 초기값으로 mem의 값 지정
    MEM_ID: mem.MEM_ID,
    MEM_PW: mem.MEM_PW,
    MEM_NAME: mem.MEM_NAME,
    MEM_PHONE: mem.MEM_PHONE
  });

  const { MEM_PW, MEM_NAME, MEM_PHONE } = memModify;

  const onChange = (e) => { // 수정하면 복사된 memModify에 name & value가 setMemModify에 입력됨 
    const { name, value } = e.target;
    setMemModify({
      ...memModify,
      [name]: value
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== passwordCheck) { // 수정할 비밀번호와 수정할 비밀번호 확인이 다를 때
      return setPasswordError(true) // 에러 띄움
    } else {
      if (password.length < 8) { // 수정할 비밀번호가 8자 미만일 때
        alert("비밀번호를 8자 이상 입력해주세요.")
      } else {
        setMemModify({
          ...memModify,
          'MEM_PW': password // password == passwordcheck면 password를 MEM_PW에 넣기
        });
        return handleClose()
      }
    }
  }

  const onChangePassword = (e) => { // 수정할 비밀번호
    setPassword(e.target.value);
  };

  const onChangePasswordChk = (e) => { // 수정할 비밀번호 확인
    setPasswordCheck(e.target.value);
    setPasswordError(e.target.value !== password);
  }

  const getInputVerifyCode = (e) => { // 인증번호 
    setInputVerifyCode(e.target.value);
  };


  const send = () => { // 휴대폰 인증하기 버튼 눌렀을 때
    axios({
      method: 'post',
      url: '/GareBnB/PhoneNumberCheck.do',
      contentType: "application/json;charset=UTF-8",
      params: {
        'to': MEM_PHONE
      }
    }).then(Response => {
      setRealVerifyCode(Response.data)
    }).catch(err => {
      console.log(err);
      alert("에러")
    })
  }

  const onChangePhone = (e) => { // 휴대폰 번호 바뀌면 미인증 상태로 변경됨 => 휴대폰 인증 진행해야함
    setModifyPhoneOK(0)
  }

  const modifyVerify = () => { // 인증확인 버튼 눌렀을 때
    if (modifyPhoneOK == 0) {
      alert("인증에 실패하였습니다. 인증을 다시 시도해주세요")
    } else {
      if (InputVerifyCode == RealVerifyCode) { // 입력할 인증번호 == 서버에서 온 인증번호면 인증 ok
        alert("인증이 완료되었습니다.")
        setModifyPhoneOK(1)
      } else {
        alert("인증에 실패하였습니다.")
      }
    }
  }

  const handleShow = () => { // 모달창 열림
    setShow(true);
  }
  const handleClose = () => { // 모달창 닫힘
    setShow(false);
  }

  const ModifySuccess = () => { // 아래 유효성 검사를 진행
    if (MEM_NAME === '') {
      alert('이름을 입력해주세요.')
    } else {
      if (MEM_PW === '') {
        alert('비밀번호 수정하기를 통해 비밀번호를 입력해주세요.')
      } else {
        if (MEM_PW.length < 8) {
          alert('비밀번호를 8자 이상 입력해주세요.')
        } else {
          if (modifyPhoneOK == 0) {
            alert("휴대폰 번호 인증을 진행해 주세요")
          } else {
            // 수정완료 버튼 클릭 시 update sql문 실행됨
            axios({
              method: 'post',
              url: '/GareBnB/mypage/memModify.do',
              contentType: "apllication/json; charset=UTF-8",
              params: {
                MEM_ID: mem.MEM_ID,
                MEM_PW: MEM_PW,
                MEM_NAME: MEM_NAME,
                MEM_PHONE: MEM_PHONE
              }
            })
              .then(Response => {
                alert('수정완료에 성공하였습니다');
                window.location.href = '../member/MemDetail'; // 수정완료 성공 알림창 확인 버튼 클릭 시 회원정보 보기 페이지로 이동됨
              })
          }
        }
      }
    }
  }

  return (
    <div className="container">

        <h2>회원정보 수정</h2><br /><br />

        <div className="row d-flex justify-content-end align-items-end ">
          <label className="col-md-2 col-form-label">아이디</label>
          <div className='col-md-4'>
            <input type='text' value={memModify.MEM_ID} className="form-control" readOnly></input>
          </div>
          <div className='col-md-4'></div>
        </div><br />

        <div className="row d-flex justify-content-end align-items-end ">
          <label className="col-md-2 col-form-label">이름</label>
          <div className='col-md-4 text-center'>
            <input type='text' name='MEM_NAME' value={memModify.MEM_NAME} className="form-control" onChange={onChange}></input></div>
          <div className='col-md-4'></div>
        </div><br />

        <div className="row d-flex justify-content-end align-items-end ">
          <label className="col-md-2 col-form-label">비밀번호</label>
          <div className='col-md-4 text-center'>
            <input type='password' value={memModify.MEM_PW} className="form-control"></input>
          </div>
          <div className='col-md-4'>
            <Button variant="btn btn-outline-primary" onClick={handleShow}>비밀번호 수정</Button> </div>
        </div><br />

        <div className="row d-flex justify-content-end align-items-end ">
          <label className="col-md-2 col-form-label">휴대폰 번호</label>
          <div className='col-md-4 text-center'>
            <input type='text' name='MEM_PHONE' value={memModify.MEM_PHONE} className="form-control"
              onChange={(e) => {
                onChange(e)
                onChangePhone(e)
              }}></input></div>
          <div className='col-4'>
            <Button variant="btn btn-outline-primary" onClick={send}>휴대폰 인증</Button> </div>
        </div><br />

        <div className="row d-flex justify-content-end align-items-end ">
          <label className="col-md-2 col-form-label">인증 번호</label>
          <div className='col-md-4 text-center'>
            <input type='text' name='Verify' onChange={getInputVerifyCode} value={InputVerifyCode} className="form-control">
            </input></div>
          <div className='col-md-4'>
            <Button variant="btn btn-outline-primary" onClick={modifyVerify}>인증 확인</Button> </div>
        </div>
      <br /><br />

      <div className="row d-flex justify-content-center align-items-end">
        <div className='col-md-3'>
          <Button className="btn btn-primary " type="button" onClick={ModifySuccess}>수정완료</Button> &nbsp;
          <Button type="button" className="btn btn-secondary" ariant="secondary">
            <Link to='../member/MemDetail' style={{ textDecoration: "none", color: "white" }}>취소</Link>
          </Button>
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>비밀번호 수정 확인</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>확인 버튼을 클릭하시면 비밀번호가 변경됩니다.</h5>
          수정할 비밀번호<input id='PW' type="password" name='password' defaulutValue={password} onChange={onChangePassword} className="form-control"></input>
          수정할 비밀번호 확인<input type="password" name='passwordcheck' defaulutValue={passwordCheck} onChange={onChangePasswordChk} className="form-control"></input>
          {passwordError && <div style={{ color: 'red' }}>비밀번호가 일치하지 않습니다.</div>}

        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary"
            onClick={onSubmit}>확인</Button>
          <Button variant="secondary" onClick={handleClose}>취소</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default MemModify