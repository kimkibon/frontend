// 회원정보 보기 (수정하기 버튼), (회원 탈퇴) 도 같은 페이지에 보여야 함)
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import SelectFileList from '../../../commons/Files/SelectFileList';
import Auth from '../../../login/Auth';
import { Button, Modal } from 'react-bootstrap';


const HostInfo = () => {
  const navigate = useNavigate();
  const [author, setAuthor] = useState();
  const [hostDetail, sethostDetail] = useState([]);
  const [file, setFile] = useState([]);
  const [memDelete, setmemDelete] = useState([]); // 탈퇴 회원으로 레벨 업데이트 
  const [show, setShow] = useState(false);

  const onDeleteMem = (mem_id) => {
    axios({
      method: 'post',
      url: '/GareBnB/mypage/memDelete.do',
      contentType: "application/json; charset=UTF-8",
      params: {
        MEM_ID: mem_id
      }
    })
      .then(Response => {
        setmemDelete(Response.data);
      })
  };

  const handleShow = () => { // 모달창 열림
    setShow(true);
  }
  const handleClose = () => { // 모달창 닫힘
    setShow(false);
  }


  const [originPW, setOriginPw] = useState(""); // 탈퇴할 때 입력하는 비밀번호 

  const PWCHECK = () => {
    if (originPW === hostDetail.MEM_PW) { // 비밀번호와 입력한 비밀번호가 일치하면 회원 탈퇴 페이지로 이동
      alert("탈퇴가 완료되었습니다")
      onDeleteMem(hostDetail.MEM_ID) // 탈퇴 진행 (레벨 6으로 업데이트)
      window.location.href = '../index/' // 메인 페이지로 이동 

    } else {
      alert("비밀번호가 일치하지 않습니다")
    }
  }

  // 회원정보 보여주기
  useEffect(() => {
    Auth(1, navigate).then(Response => {
      setAuthor(Response)
      axios({
        method: 'post',
        url: '/GareBnB/host/myPage/hostInfo.do',
        contentType: "application/json; charset=UTF-8",
        params: {
          MEM_ID: localStorage.getItem("MEM_ID"),
          MEM_IDX: Response.MEM_IDX
        }
      })
        .then(Response => {
          console.log(Response.data);
          sethostDetail(Response.data);
          SelectFileList('1', Response.data.MEM_IDX, '0').then(Response => {
            Response.map(base64 => {
              base64.URL = "data:image/;base64," + base64.URL //바이너리 변환된 이미지를 출력하기 위해 주석을 달아줌
            })
            Response.sort(function (a, b) {
              return a.FILE_LEVEL - b.FILE_LEVEL
            })
            setFile(Response);
          });
        })
    }) //auth
  }, []);


  return (
    <div>
      <div className="container">
        <hr />
        <h3>회원정보 보기(HOST)</h3>
        <hr /><br />

        <div className="row d-flex justify-content-center align-items-center ">
          <div className="col-md-8">
            <label className="col-md-4 col-form-label">호스트 사진 및 소개글 관련 사진</label>
            <Carousel>
              {file.map(url => {
                return (
                  <Carousel.Item key={url.FILE_LEVEL}>
                    <img
                      className="d-block w-100"
                      src={url.URL}
                      width='700px'
                      height='400px'
                      alt=""
                    />
                    {/* fileList 에서 받아온 정보를 표시.  */}
                  </Carousel.Item>
                )
              })}
            </Carousel>
          </div></div><br />

        <div className="row d-flex justify-content-center align-items-center ">
          <label className="col-md-3 col-form-label">아이디</label>
          <div className='col-md-5 text-center'>
            <input type='text' value={hostDetail.MEM_ID} className="form-control" readOnly></input></div>
        </div><br />

        <div className="row d-flex justify-content-center align-items-center">
          <label className="col-md-3 col-form-label">이름</label>
          <div className='col-md-5 text-center'>
            <input type='text' value={hostDetail.MEM_NAME} className="form-control" readOnly></input></div>
        </div><br />

        <div className="row d-flex justify-content-center align-items-center">
          <label className="col-md-3 col-form-label">비밀번호</label>
          <div className='col-md-5 text-center'>
            <input type='text' value={hostDetail.MEM_PW} className="form-control" readOnly></input></div>
        </div><br />

        <div className="row d-flex justify-content-center align-items-center">
          <label className="col-md-3 col-form-label">휴대폰 번호</label>
          <div className='col-md-5 text-center'>
            <input type='text' value={hostDetail.MEM_PHONE} className="form-control" readOnly></input></div>
        </div><br />

        <div className="row d-flex justify-content-center align-items-center">
          <label className="col-md-3 col-form-label">이메일</label>
          <div className='col-md-5 text-center'>
            <input type='text' value={hostDetail.HOST_EMAIL} className="form-control" readOnly></input></div>
        </div><br />

        <div className="row d-flex justify-content-center align-items-center">
          <label className="col-md-3 col-form-label">우편번호</label>
          <div className='col-md-5 text-center'>
            <input type='text' value={hostDetail.HOST_POST} className="form-control" readOnly></input></div>
        </div><br />

        <div className="row d-flex justify-content-center align-items-center">
          <label className="col-md-3 col-form-label">기본주소</label>
          <div className='col-md-5 text-center'>
            <input type='text' value={hostDetail.HOST_ADDR1} className="form-control" readOnly></input></div>
        </div><br />

        <div className="row d-flex justify-content-center align-items-center">
          <label className="col-md-3 col-form-label">상세주소</label>
          <div className='col-md-5 text-center'>
            <input type='text' value={hostDetail.HOST_ADDR2} className="form-control" readOnly></input></div>
        </div><br />

        <div className="row d-flex justify-content-center align-items-center">
          <label className="col-md-3 col-form-label">소개글</label>
          <div className='col-md-5 text-center'>
            <textarea type='textarea' value={hostDetail.HOST_INTRO} className="form-control" rows="4" readOnly></textarea></div>
        </div><br />

        <div className="row d-flex justify-content-center align-items-center">
          <label className="col-md-3 col-form-label">은행명</label>
          <div className='col-md-5 text-center'>
            <input type='text' value={hostDetail.HOST_BANK} className="form-control" readOnly></input></div>
        </div><br />

        <div className="row d-flex justify-content-center align-items-center">
          <label className="col-md-3 col-form-label">계좌번호</label>
          <div className='col-md-5 text-center'>
            <input type='text' value={hostDetail.HOST_ACCOUNT} className="form-control" readOnly></input></div>
        </div><br /><br />

        {/* 주민등록번호는 회원정보에 띄우지 않았음..! */}

        <div className="row">
          <div className="row d-flex justify-content-center align-items-center">
            <div className='col-md-1'>
              <Button className="btn btn-primary " type="button">
                <Link to={'../HostModify'} style={{ textDecoration: "none", color: "white" }} state={{ mem: hostDetail, file: file }}>수정</Link>
              </Button> &nbsp;

            </div></div>
          <div className="row d-flex justify-content-end align-items-end">
            <div className='col-md-2'>
              <button type="button" className="btn btn-link" style={{ color: "lightgray" }} onClick={handleShow}>탈퇴</button>
            </div></div>
        </div>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>정말로 탈퇴하시겠습니까?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div style={{ color: 'red' }}>
              탈퇴 후에는 해당 아이디로 다시 가입할 수 없으며, <br /> 아이디와 데이터는 복구할 수 없습니다. <br />
              일반 회원도 탈퇴 처리되므로, 신중한 선택 부탁드립니다. <br /></div><br />
            <div>
              <h5>비밀번호 재확인</h5></div>
            <input type="password" placeholder='비밀번호를 입력하세요' onChange={e => setOriginPw(e.target.value)} className="form-control">
            </input>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>취소</Button>
            <Button variant="light" onClick={PWCHECK}>탈퇴</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  )
}

export default HostInfo 