import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import ImageUploadBox from '../myBoard/component/ImageUploadBox';
import { Modal, Button } from 'react-bootstrap';
import HostAddress from '../../member/HostAddress';
import ModifyHost from './ModifyHost';

// 회원정보 보기 - 수정(HostInfo -> 수정하기 버튼 눌러야 페이지 확인 가능)

const HostModify = () => {

  const location = useLocation();
  const mem = location.state.mem;   // HostInfo의 member 정보를 HostModify로 넘겨줌 (mem)
  const hostfile = location.state.file; // hostfile : HostInfo의 사진 정보

  const [insertModal, setInsertModal] = React.useState(false);
  const [showAddrModal, setShowAddrModal] = React.useState(false);
  const [insertFiles, setInsertFiles] = useState(hostfile);

  const [hostModify, setHostModify] = useState({ // hostModify 초기값으로 mem의 값 지정
    MEM_ID: mem.MEM_ID,
    MEM_IDX: mem.MEM_IDX,
    MEM_PW: mem.MEM_PW,
    MEM_NAME: mem.MEM_NAME,
    MEM_PHONE: mem.MEM_PHONE,
    HOST_EMAIL: mem.HOST_EMAIL,
    HOST_POST: mem.HOST_POST,
    HOST_ADDR1: mem.HOST_ADDR1,
    HOST_ADDR2: mem.HOST_ADDR2,
    HOST_INTRO: mem.HOST_INTRO,
    HOST_BANK: mem.HOST_BANK,
    HOST_ACCOUNT: mem.HOST_ACCOUNT
  });

  const { MEM_ID, MEM_IDX, MEM_PW, MEM_NAME, MEM_PHONE, HOST_EMAIL,
    HOST_POST, HOST_ADDR1, HOST_ADDR2, HOST_INTRO, HOST_BANK, HOST_ACCOUNT } = hostModify;


  const onChange = (e) => { // 수정하면 복사된 hostModify name & value가 setHostModify 입력됨 
    const { name, value } = e.target;
    setHostModify({
      ...hostModify,
      [name]: value
    });
  };

  const setAddrInfo = (data) => { // 주소 검색
    setHostModify({
      ...hostModify,
      'HOST_ADDR1': data.HOST_ADDR1,
      'HOST_POST': data.HOST_POST
    })
    setShowAddrModal(false)
  }

  const getImages = (image) => {   // 미리보기로 만들어진 이미지를 저장 
    setInsertFiles(image);
  }


  const updateOnClick = () => { // 유효성 검사

    if (hostModify.HOST_EMAIL === '') {
      alert('이메일을 입력해주세요.')
    } else {
      if (hostModify.HOST_POST === '') {
        alert('우편번호를 입력해주세요..')
      } else {
        if (hostModify.HOST_ADDR1 === '') {
          alert('주소를 입력해주세요.')
        } else {
          if (hostModify.HOST_ADDR2 === '') {
            alert('상세주소를 입력해주세요.')
          } else {
            if (hostModify.HOST_JUMIN1 === '') {
              alert('주민등록번호 앞자리를 입력해주세요.')
            } else {
              if (hostModify.HOST_JUMIN2 === '') {
                alert('주민등록번호 뒷자리(1자리)를 입력해주세요.')
              } else {
                if (hostModify.HOST_INTRO === '') {
                  alert('소개글을 입력해주세요.')
                } else {
                  if (hostModify.HOST_BANK === '') {
                    alert('은행명을 입력해주세요.')
                  } else {
                    if (hostModify.HOST_ACCOUNT === '') {
                      alert('계좌번호를 입력해주세요.')
                    } else {
                      setInsertModal(true);
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }


  return (
    <div className="container">

      <h2>회원정보 수정(HOST)</h2><br />
      <h5>이름, 비밀번호, 휴대폰번호는 일반회원 페이지에서 수정하실 수 있습니다.</h5><br />


      <div className="row d-flex justify-content-center align-items-center ">
        <div className="col-md-8">
          <label className="col-md-4 col-form-label">호스트 사진 및 소개글 관련 사진</label>
          {/* 사진 첨부 */}
          <ImageUploadBox getImages={getImages} beforeImages={hostfile} />
        </div></div><br />

      <div className="row d-flex justify-content-end align-items-end ">
        <label className="col-md-2 col-form-label">아이디</label>
        <div className='col-md-5'>
          <input type='text' value={MEM_ID} className="form-control" readOnly></input>
        </div>
        <div className='col-md-3'></div>
      </div><br />

      <div className="row d-flex justify-content-end align-items-end ">
        <label className="col-md-2 col-form-label">이름</label>
        <div className='col-md-5 text-center'>
          <input type='text' name='MEM_NAME' value={MEM_NAME} className="form-control" readOnly></input></div>
        <div className='col-md-3'></div>
      </div><br />

      <div className="row d-flex justify-content-end align-items-end ">
        <label className="col-md-2 col-form-label">비밀번호</label>
        <div className='col-md-5 text-center'>
          <input type='text' name='MEM_PW' value={MEM_PW} className="form-control" readOnly></input></div>
        <div className='col-md-3'></div>
      </div><br />

      <div className="row d-flex justify-content-end align-items-end ">
        <label className="col-md-2 col-form-label">휴대폰 번호</label>
        <div className='col-md-5 text-center'>
          <input type='text' name='MEM_PHONE' value={MEM_PHONE} className="form-control" readOnly></input></div>
        <div className='col-md-3'></div>
      </div><br />

      <div className="row d-flex justify-content-end align-items-end ">
        <label className="col-md-2 col-form-label">이메일</label>
        <div className='col-md-5 text-center'>
          <input type='text' name='HOST_EMAIL' value={HOST_EMAIL} className="form-control" onChange={onChange}></input></div>
        <div className='col-md-3'></div>
      </div><br />

      <div className="row d-flex justify-content-end align-items-end ">
        <label className="col-md-2 col-form-label">우편번호</label>
        <div className='col-md-5 text-center'>
          <input type='text' name='HOST_POST' value={HOST_POST} className="form-control" onChange={onChange}></input></div>
        <div className='col-md-3'>
          <Button variant="btn btn-outline-primary" onClick={() => setShowAddrModal(true)}>우편번호 찾기</Button> </div>
      </div><br />

      <div className="row d-flex justify-content-end align-items-end ">
        <label className="col-md-2 col-form-label">기본주소</label>
        <div className='col-md-5 text-center'>
          <input type='text' name='HOST_ADDR1' value={HOST_ADDR1} className="form-control" onChange={onChange}></input></div>
        <div className='col-md-3'></div>
      </div><br />

      <div className="row d-flex justify-content-end align-items-end ">
        <label className="col-md-2 col-form-label">상세주소</label>
        <div className='col-md-5 text-center'>
          <input type='text' name='HOST_ADDR2' value={HOST_ADDR2} className="form-control" onChange={onChange}></input></div>
        <div className='col-md-3'></div>
      </div><br />

      <div className="row d-flex justify-content-end align-items-center ">
        <label className="col-md-2 col-form-label">소개글</label>
        <div className='col-md-5 text-center'>
          <textarea className="form-control" id="exampleTextarea" name='HOST_INTRO' value={HOST_INTRO} onChange={onChange} rows="3"></textarea></div>
        <div className='col-md-3'></div>
      </div><br />

      <div className="row d-flex justify-content-end align-items-end ">
        <label className="col-md-2 col-form-label">은행명</label>
        <div className='col-md-5 text-center'>
          <select className="form-select" id="exampleSelect1" onChange={onChange} name="HOST_BANK" value={HOST_BANK}>
            <option>은행명을 선택하세요</option>
            <option>신한</option>
            <option>국민</option>
            <option>우리</option>
            <option>하나</option>
            <option>농협</option>
          </select></div>
        <div className='col-md-3'></div>
      </div><br />

      <div className="row d-flex justify-content-end align-items-end ">
        <label className="col-md-2 col-form-label">계좌번호</label>
        <div className='col-md-5 text-center'>
          <input type='text' name='HOST_ACCOUNT' value={HOST_ACCOUNT} className="form-control" onChange={onChange}></input></div>
        <div className='col-md-3'></div>
      </div><br /><br />

      <div className="row d-flex justify-content-center align-items-end">
        <div className='col-md-3'>
          <Button className="btn btn-primary " type="button"
            onClick={(e) => {
              e.preventDefault();
              updateOnClick();
            }}>
            수정완료</Button> &emsp;&emsp;&emsp;
          <Button className="btn btn-secondary" type="button">
            <Link to={'../hostInfo'} style={{ textDecoration: "none", color: "white" }}>취소</Link>
          </Button>
        </div>
      </div>

      {/* 입력확인창 모달로 띄우기 !  */}
      <ModifyHost
        show={insertModal}
        onHide={() => setInsertModal(false)}
        props={{
          'hostModify': hostModify,
          'updateFiles': insertFiles,
          'fileType': '1',
        }} />

      {/* 주소 검색 모달 */}
      <Modal
        show={showAddrModal}
        onHide={() => setShowAddrModal(false)}>
        <HostAddress
          setAddrInfo={setAddrInfo} />
      </Modal>

    </div>
  )
}


export default HostModify