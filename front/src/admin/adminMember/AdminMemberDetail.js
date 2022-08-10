import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import SelectFileList from '../../commons/Files/SelectFileList';
import Carousel from 'react-bootstrap/Carousel';
import { Button } from 'react-bootstrap';

const AdminMemberDetail = () => {

  const [mem_LEV, setMem_LEV] = useState('');
  const [file, setFile] = useState([]);
  const { MEM_IDX } = useParams();

  const [getMem, setGetMem] = useState([]);

  const MEM_LEVEL = (state) => {
    switch (state) {
      case 0: return '관리자'
      case 1: return '호스트 회원'
      case 2: return '일반 회원'
      case 3: return '호스트 대기 회원'
      case 4: return '호스트 거절됨'
      case 5: return '정지 회원'
      case 6: return '탈퇴 회원'
    }
  }

  useEffect(() => { // 해당 MEM_IDX로 나머지 정보 가져옴
    axios({
      method: 'post',
      url: '/GareBnB/Admin/MemDetail.do',
      contentType: "application/json; charset=UTF-8",
      params: {
        MEM_IDX: MEM_IDX
      }
    })
      .then(Response => {
        setGetMem(Response.data);
        setMem_LEV(Response.data.MEM_LEVEL);
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
  }, []);

  const [memDenyModify, setMemDenyModify] = useState();
  const adminModifySuccess = () => { // 저장 버튼 클릭 시 update sql문 실행됨 (레벨 업데이트 - 정지) // 정지는 영정 
    axios({
      method: 'post',
      url: '/GareBnB/Admin/memberDeny.do',
      contentType: "apllication/json; charset=UTF-8",
      params: {
        MEM_IDX: getMem.MEM_IDX
      }
    })
      .then(Response => {
        setMemDenyModify(Response.data);
      })
  }

  const onClick = () => { // 회원 정지 업데이트 클릭하면 멤버 레벨 : 5로 띄워줌 (확인 버튼 눌러야 DB에 적용됨)
    setMem_LEV(5)
  }

  return (
    <div className="container">

      <div className="container px-4 px-lg-5 my-5 h-100" >
        <h2>{getMem.MEM_ID} 회원 상세보기</h2><br />

        <h4>일반 회원 정보</h4>
        <br />
        <div className="row d-flex justify-content-center align-items-center ">
          <label className="col-md-3 col-form-label">번호(IDX)</label>
          <div className='col-md-5 text-center'>
            <input type='text' value={getMem.MEM_IDX} className="form-control" readOnly></input></div>
          <div className='col-md-4'></div>
        </div><br />

        <div className="row d-flex justify-content-center align-items-center ">
          <label className="col-md-3 col-form-label">아이디</label>
          <div className='col-md-5 text-center'>
            <input type='text' value={getMem.MEM_ID} className="form-control" readOnly></input></div>
          <div className='col-md-4'></div>
        </div><br />

        <div className="row d-flex justify-content-center align-items-center ">
          <label className="col-md-3 col-form-label">이름</label>
          <div className='col-md-5 text-center'>
            <input type='text' value={getMem.MEM_NAME} className="form-control" readOnly></input></div>
          <div className='col-md-4'></div>
        </div><br />

        <div className="row d-flex justify-content-center align-items-center ">
          <label className="col-md-3 col-form-label">휴대폰 번호</label>
          <div className='col-md-5 text-center'>
            <input type='text' value={getMem.MEM_PHONE} className="form-control" readOnly></input></div>
          <div className='col-md-4'></div>
        </div><br />

        <div className="row d-flex justify-content-center align-items-center ">
          <label className="col-md-3 col-form-label">level</label>
          <div className='col-md-5 text-center'>
            <input type='text' value={MEM_LEVEL(mem_LEV)} className="form-control" readOnly></input></div>
          <div className='col-md-4'>
            <Button variant="btn btn-outline-primary" onClick={onClick}>회원정지</Button> </div>
        </div><br /><br />

        <h4>호스트 회원 정보</h4>
        <br />
        <div className="row d-flex justify-content-start align-items-center ">
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
          </div></div><br /><br />

        <div className="row d-flex justify-content-center align-items-center">
          <label className="col-md-3 col-form-label">이메일</label>
          <div className='col-md-5 text-center'>
            <input type='text' value={getMem.HOST_EMAIL} className="form-control" readOnly></input></div>
          <div className='col-md-4'></div>
        </div><br />

        <div className="row d-flex justify-content-center align-items-center">
          <label className="col-md-3 col-form-label">우편번호</label>
          <div className='col-md-5 text-center'>
            <input type='text' value={getMem.HOST_POST} className="form-control" readOnly></input></div>
          <div className='col-md-4'></div>
        </div><br />

        <div className="row d-flex justify-content-center align-items-center">
          <label className="col-md-3 col-form-label">기본주소</label>
          <div className='col-md-5 text-center'>
            <input type='text' value={getMem.HOST_ADDR1} className="form-control" readOnly></input></div>
          <div className='col-md-4'></div>
        </div><br />

        <div className="row d-flex justify-content-center align-items-center">
          <label className="col-md-3 col-form-label">상세주소</label>
          <div className='col-md-5 text-center'>
            <input type='text' value={getMem.HOST_ADDR2} className="form-control" readOnly></input></div>
          <div className='col-md-4'></div>
        </div><br />

        <div className="row d-flex justify-content-stretch align-items-center ">
          <label className="col-md-3 col-form-label">주민 등록 번호</label>

          <div className='col-md-3 text-center'>
            <input type='text' name='HOST_JUMIN1' placeholder="******"
              value={getMem.HOST_JUMIN1} className="form-control" readOnly></input></div> -

          <div className='col-md-1 text-center'>
            <input type='text' name='HOST_JUMIN2' placeholder="*"
              value={getMem.HOST_JUMIN2} className="form-control" readOnly></input></div>  ******

          <div className='col-md-5'></div>
        </div><br />

        <div className="row d-flex justify-content-end align-items-center ">
          <label className="col-md-3 col-form-label">소개글</label>
          <div className='col-md-5 text-center'>
            <textarea className="form-control" id="exampleTextarea" name='HOST_INTRO' placeholder="본인 소개글 (경력, 자격증, 포부, 자기소개 등)"
              value={getMem.HOST_INTRO} readOnly rows="4"></textarea></div>
          <div className='col-md-4'></div>
        </div><br />

        <div className="row d-flex justify-content-center align-items-center">
          <label className="col-md-3 col-form-label">은행명</label>
          <div className='col-md-5 text-center'>
            <input type='text' value={getMem.HOST_BANK} className="form-control" readOnly></input></div>
          <div className='col-md-4'></div>
        </div><br />

        <div className="row d-flex justify-content-center align-items-center">
          <label className="col-md-3 col-form-label">계좌번호</label>
          <div className='col-md-5 text-center'>
            <input type='text' value={getMem.HOST_ACCOUNT} className="form-control" readOnly></input></div>
          <div className='col-md-4'></div>
        </div><br /><br />

        <div className="row d-flex justify-content-center align-items-end">
          <div className='col-md-6'>
            <Button className="btn btn-primary " type="button"
              onClick={adminModifySuccess}>
              <Link to='/admin/adminMemberList' style={{ textDecoration: "none", color: "white" }}>확인</Link>
            </Button> &emsp;&emsp;&emsp;
            <Button className="btn btn-secondary" type="button">
              <Link to='/admin/adminMemberList' style={{ textDecoration: "none", color: "white" }}>취소</Link>
            </Button>
          </div>
        </div>

      </div></div>
  );
}

export default AdminMemberDetail

