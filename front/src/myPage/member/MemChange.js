import React, { useState, useEffect } from 'react'
import { Modal, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import ImageUploadBox from '../host/myBoard/component/ImageUploadBox';
import HostAddress from './HostAddress';
import InsertHost from './InsertHost';
import Auth from '../../login/Auth';

const MemChange = () => {
  const [insertModal, setInsertModal] = React.useState(false);
  const [showAddrModal, setShowAddrModal] = React.useState(false);
  const [insertFiles, setInsertFiles] = useState([]);
  const Navigate = useNavigate();

  const [insertHost, setInsertHost] = useState({
    MEM_IDX: '',
    HOST_EMAIL: '',
    HOST_POST: '',
    HOST_ADDR1: '',
    HOST_ADDR2: '',
    HOST_JUMIN1: '',
    HOST_JUMIN2: '',
    HOST_INTRO: '',
    HOST_ACCOUNT: '',
    HOST_BANK: ''
  });

  const {
    MEM_IDX,
    HOST_EMAIL,
    HOST_POST,
    HOST_ADDR1,
    HOST_ADDR2,
    HOST_JUMIN1,
    HOST_JUMIN2,
    HOST_INTRO,
    HOST_ACCOUNT,
    HOST_BANK } = insertHost;

  useEffect(() => { // 레벨 4 이하인(일반,호스트,관리자) 접근 가능. MEM_IDX 받아오기
    Auth(4, Navigate).then(Res => {
      setInsertHost({
        ...insertHost,
        'MEM_IDX': Res.MEM_IDX
      })
    })
  }, [])

  const setAddrInfo = (data) => { // 주소 모달에 입력하면 insertHost에 우편번호와 기본 주소가 들어감
    setInsertHost({
      ...insertHost,
      'HOST_ADDR1': data.HOST_ADDR1,
      'HOST_POST': data.HOST_POST
    })
    setShowAddrModal(false)
  }

  const onChange = (e) => {
    const { value, name } = e.target;
    setInsertHost({
      ...insertHost, // 기존의 input 객체를 복사한 뒤      
      [name]: value // name 키를 가진 값을 value 로 설정    
    });
  };

  const getImages = (image) => {
    setInsertFiles(image)
  }
  // 미리보기로 만들어진 이미지를 저장 


  // 등록하기 버튼을 누르면 유효성 검사 진행, 진행에 무리 없으면 insertModel 띄워줌
  const insertOnClick = () => {

    if (insertHost.HOST_EMAIL === '') {
      alert('이메일을 입력해주세요.')
    } else {
      if (insertHost.HOST_POST === '') {
        alert('우편번호를 입력해주세요..')
      } else {
        if (insertHost.HOST_ADDR1 === '') {
          alert('주소를 입력해주세요.')
        } else {
          if (insertHost.HOST_ADDR2 === '') {
            alert('상세주소를 입력해주세요.')
          } else {
            if (insertHost.HOST_JUMIN1 === '') {
              alert('주민등록번호 앞자리를 입력해주세요.')
            } else {
              if (insertHost.HOST_JUMIN2 === '') {
                alert('주민등록번호 뒷자리(1자리)를 입력해주세요.')
              } else {
                if (insertHost.HOST_INTRO === '') {
                  alert('소개글을 입력해주세요.')
                } else {
                  if (insertHost.HOST_BANK === '') {
                    alert('은행명을 입력해주세요.')
                  } else {
                    if (insertHost.HOST_ACCOUNT === '') {
                      alert('계좌번호를 입력해주세요.')
                    } else {
                      if (insertFiles[0] === undefined) {
                        alert('사진을 한 장 이상 입력해주세요.')
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
  }

  return (
    <div>
      <div className="container">


        <hr />
        <h3>호스트 전환</h3>
        <hr /><br />
        <h5>관리자 승인 후, 호스트 페이지를 이용하실 수 있습니다.</h5><br />

        <div className="row d-flex justify-content-end align-items-center ">
          <label className="col-md-3 col-form-label">이메일</label>
          <div className='col-md-5 text-center'>
            <input type='email' name='HOST_EMAIL' placeholder="name@example.com"
              value={insertHost.HOST_EMAIL} className="form-control" onChange={onChange}></input></div>
          <div className='col-md-4'></div>
        </div><br />

        <div className="row d-flex justify-content-end align-items-center ">
          <label className="col-md-3 col-form-label">우편번호</label>
          <div className='col-md-5 text-center'>
            <input type='text' name='HOST_POST'
              value={insertHost.HOST_POST} className="form-control" placeholder="우편번호 입력" onChange={onChange}></input></div>
          <div className='col-md-4'>
            <Button variant="btn btn-outline-primary" onClick={() => setShowAddrModal(true)}>우편번호 찾기</Button> </div>
        </div><br />

        <div className="row d-flex justify-content-end align-items-center ">
          <label className="col-md-3 col-form-label">기본 주소</label>
          <div className='col-md-5 text-center'>
            <input type='text' name='HOST_ADDR1' placeholder="기본 주소"
              value={insertHost.HOST_ADDR1} className="form-control" onChange={onChange}></input></div>
          <div className='col-md-4'></div>
        </div><br />

        <div className="row d-flex justify-content-end align-items-center ">
          <label className="col-md-3 col-form-label">상세 주소</label>
          <div className='col-md-5 text-center'>
            <input type='text' name='HOST_ADDR2' placeholder="상세 주소"
              value={insertHost.HOST_ADDR2} className="form-control" onChange={onChange}></input></div>
          <div className='col-md-4'></div>
        </div><br />

        <div className="row d-flex justify-content-stretch align-items-center ">
          <label className="col-md-3 col-form-label">주민 등록 번호</label>

          <div className='col-md-3 text-center'>
            <input type='text' name='HOST_JUMIN1' placeholder="******"
              value={insertHost.HOST_JUMIN1} className="form-control" onChange={onChange}></input></div> -

          <div className='col-md-1 text-center'>
            <input type='text' name='HOST_JUMIN2' placeholder="*"
              value={insertHost.HOST_JUMIN2} className="form-control" onChange={onChange}></input></div>  ******

          <div className='col-md-5'></div>
        </div><br />

        <div className="row d-flex justify-content-end align-items-center ">
          <label className="col-md-3 col-form-label">소개글</label>
          <div className='col-md-5 text-center'>
            <textarea className="form-control" id="exampleTextarea" name='HOST_INTRO' placeholder="본인 소개글 (경력, 자격증, 포부, 자기소개 등)"
              value={insertHost.HOST_INTRO} onChange={onChange} rows="4"></textarea></div>
          <div className='col-md-4'></div>
        </div><br />

        <div className="row d-flex justify-content-start align-items-center ">
          <div className="col-md-8">
            <label className="col-md-4 col-form-label">호스트 사진 및 소개글 관련 사진</label>
            {/* 사진 첨부 */}
            <ImageUploadBox getImages={getImages} />
          </div></div>
        <br /><br />

        <div className="row d-flex justify-content-end align-items-end ">
          <label className="col-md-3 col-form-label">은행명</label>
          <div className='col-md-5 text-center'>
            <select className="form-select" id="exampleSelect1" onChange={onChange} name="HOST_BANK" value={insertHost.HOST_BANK}>
              <option>은행명을 선택하세요</option>
              <option>신한</option>
              <option>국민</option>
              <option>우리</option>
              <option>하나</option>
              <option>농협</option>
            </select></div>
          <div className='col-4'></div>
        </div><br />

        <div className="row d-flex justify-content-end align-items-end ">
          <label className="col-md-3 col-form-label">계좌번호</label>
          <div className='col-md-5 text-center'>
            <input type='text' name='HOST_ACCOUNT' placeholder="계좌번호 입력"
              value={insertHost.HOST_ACCOUNT} className="form-control" onChange={onChange}></input></div>
          <div className='col-md-4'></div>
        </div><br /><br />

        <div className="row d-flex justify-content-center align-items-end">
          <div className='col-md-7'>
            <Button className="btn btn-primary " type="button"
              onClick={insertOnClick}>
              전환요청</Button> &emsp;&emsp;&emsp;
            <Button className="btn btn-secondary" type="button">
              <Link to={'/'} style={{ textDecoration: "none", color: "white" }}>취소</Link>
            </Button>
          </div>
        </div>

        <InsertHost
          show={insertModal}
          onHide={() => setInsertModal(false)}
          props={{
            'insertHost': insertHost,
            'insertFiles': insertFiles,
            'fileType': '1',
          }} />

        {/* 입력확인창 모달로 띄우기 */}
        <Modal
          show={showAddrModal}
          onHide={() => setShowAddrModal(false)}>

          {/* 주소 검색 모달 */}
          <HostAddress
            setAddrInfo={setAddrInfo} />
        </Modal>
      </div>
      <br />

    </div >



  )
}

export default MemChange

