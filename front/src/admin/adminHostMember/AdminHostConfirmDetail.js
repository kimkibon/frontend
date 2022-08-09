import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import SelectFileList from '../../commons/Files/SelectFileList';
import Carousel from 'react-bootstrap/Carousel';
import { Button } from 'react-bootstrap';

const AdminHostConfirmDetail = () => {

  const [url, setUrl] = useState();
  const [file, setFile] = useState([]);
  const { MEM_IDX } = useParams();

  const [getHostMem, setGetHostMem] = useState([]);

  // 이미지 *************

  useEffect(() => { // 해당 MEM_IDX로 나머지 정보 가져옴
    axios({
      method: 'post',
      url: '/GareBnB/Admin/hostConfirmMemberDetail.do',
      contentType: "application/json; charset=UTF-8",
      params: {
        MEM_IDX: MEM_IDX
      }
    })
      .then(Response => {
        setGetHostMem(Response.data);
        // SelectFileList에서 여러 개의 파일을 map으로 가져와서 1개씩 보여줌
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

  const [hostConfirm, setHostConfirm] = useState();
  const hostResSuccess = () => { // 저장 버튼 클릭 시 update sql문 실행됨 (레벨 업데이트 - 승인)

    axios({
      method: 'post',
      url: '/GareBnB/Admin/HostConfirm.do',
      contentType: "apllication/json; charset=UTF-8",
      params: {
        MEM_IDX: getHostMem.MEM_IDX
      }
    })
      .then(Response => {
        setHostConfirm(Response.data);
        alert("승인")
      })
  }

  const [hostDeny, setHostDeny] = useState();
  const hostResFail = () => { // 저장 버튼 클릭 시 update sql문 실행됨 (레벨 업데이트 - 거절)

    axios({
      method: 'post',
      url: '/GareBnB/Admin/HostDeny.do',
      contentType: "apllication/json; charset=UTF-8",
      params: {
        MEM_IDX: getHostMem.MEM_IDX
      }
    })
      .then(Response => {
        setHostDeny(Response.data);
        alert("거절")
      })
  }
  getHostMem['URL'] = url;

  return (
    <div className="container">


      <h2>호스트 회원 등록요청 상세보기</h2>

      <div className="row d-flex justify-content-center align-items-center ">
        <div className="col-md-6">
          <label className="col-4 col-form-label">호스트 사진 및 소개글 관련 사진</label>
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
        <label className="col-2 col-form-label">번호(IDX)</label>
        <div className='col-6 text-center'>
          <input type='text' value={getHostMem.MEM_IDX} className="form-control" readOnly></input></div>
        <div className='col-1'></div>
      </div><br />

      <div className="row d-flex justify-content-center align-items-center ">
        <label className="col-2 col-form-label">아이디</label>
        <div className='col-6 text-center'>
          <input type='text' value={getHostMem.MEM_ID} className="form-control" readOnly></input></div>
        <div className='col-1'></div>
      </div><br />

      <div className="row d-flex justify-content-center align-items-center ">
        <label className="col-2 col-form-label">이름</label>
        <div className='col-6 text-center'>
          <input type='text' value={getHostMem.MEM_NAME} className="form-control" readOnly></input></div>
        <div className='col-1'></div>
      </div><br />

      <div className="row d-flex justify-content-center align-items-center ">
        <label className="col-2 col-form-label">휴대폰 번호</label>
        <div className='col-6 text-center'>
          <input type='text' value={getHostMem.MEM_PHONE} className="form-control" readOnly></input></div>
        <div className='col-1'></div>
      </div><br />

      <div className="row d-flex justify-content-center align-items-center ">
        <label className="col-2 col-form-label">이메일</label>
        <div className='col-6 text-center'>
          <input type='text' value={getHostMem.HOST_EMAIL} className="form-control" readOnly></input></div>
        <div className='col-1'></div>
      </div><br />

      <div className="row d-flex justify-content-center align-items-center ">
        <label className="col-2 col-form-label">주소</label>
        <div className='col-3 text-center'>
          <input type='text' value={getHostMem.HOST_ADDR1} className="form-control" readOnly></input></div>
        <div className='col-3 text-center'>
          <input type='text' value={getHostMem.HOST_ADDR2} className="form-control" readOnly></input></div>
        <div className='col-1'></div>
      </div><br />

      <div className="row d-flex justify-content-center align-items-center ">
        <label className="col-2 col-form-label">계좌번호</label>
        <div className='col-2 text-center'>
          <input type='text' value={getHostMem.HOST_BANK} className="form-control" readOnly></input></div>
        <div className='col-4 text-center'>
          <input type='text' value={getHostMem.HOST_ACCOUNT} className="form-control" readOnly></input></div>
        <div className='col-1'></div>
      </div><br /><br />

      <div className="row d-flex justify-content-center align-items-end">
        <div className='col-md-2'>
          <Button className="btn btn-primary " type="button"
            onClick={hostResSuccess}>
            <Link to='/admin/adminHostConfirmList' style={{ textDecoration: "none", color: "white" }}>승인</Link>
          </Button> &nbsp;&nbsp;
          <Button className="btn btn-success " type="button"
            onClick={hostResFail}>
            <Link to='/admin/adminHostConfirmList' style={{ textDecoration: "none", color: "white" }}>거절</Link>
          </Button> &nbsp;&nbsp;
          <Button className="btn btn-secondary" type="button">
            <Link to='/admin/adminHostConfirmList' style={{ textDecoration: "none", color: "white" }}>취소</Link>
          </Button>
        </div>
      </div>

    </div>
  );
}

export default AdminHostConfirmDetail