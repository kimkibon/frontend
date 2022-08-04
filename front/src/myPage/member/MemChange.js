import React, { useState, useEffect } from 'react'
import { Modal } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import ImageUploadBox from '../host/myBoard/component/ImageUploadBox';
import HostAddress from './HostAddress';
import InsertHost from './InsertHost';
import { Button, Form } from 'react-bootstrap';
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
    // console.log(insertHost)
  }

  const onChange = (e) => {
    const { value, name } = e.target;
    setInsertHost({
      ...insertHost, // 기존의 input 객체를 복사한 뒤      
      [name]: value // name 키를 가진 값을 value 로 설정    
    });
    //  console.log(insertHost)
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
                      if (insertFiles[1] === undefined) {
                        alert('사진을 두 장 이상 입력해주세요')
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

    <div className="col-md-12">
      <h2>호스트 전환하기</h2>
      <div>
        <Form.Group>
          <Form.Label>이메일 주소</Form.Label>
          <Form.Control type="email" placeholder="name@example.com"
            onChange={onChange} name="HOST_EMAIL" value={insertHost.HOST_EMAIL} />
        </Form.Group>

        <div class="row">
          <div className='col-lg-6 col-sm-12'>
            <Form.Group>
              <Form.Label>우편번호 </Form.Label>
              <Form.Control type="text" placeholder="우편번호 입력"
                onChange={onChange} name="HOST_POST" value={insertHost.HOST_POST}
                aria-describedby="button-addon" className="input-group mb-3"></Form.Control>

            </Form.Group>
          </div>
          <div className='col-md-6 mt-4'>
            <button className="btn btn-primary" type="button" id="button-addon" onClick={() => setShowAddrModal(true)}>우편번호 찾기</button>
          </div>
        </div>
        <Form.Group>
          <Form.Label>기본 주소</Form.Label>
          <Form.Control type="text" placeholder="기본 주소"
            onChange={onChange} name="HOST_ADDR1" value={insertHost.HOST_ADDR1} />
        </Form.Group>


        <div className='mt-2'>상세 주소</div>
        <input type="text" class="form-control" placeholder="상세 주소" name="HOST_ADDR2" value={insertHost.HOST_ADDR2} onChange={onChange} />


        <div className='mt-2'>주민 등록 번호</div>
        <div class="row">
          <div class="col-sm-6 mt-2">
            <input type="number" class="form-control" placeholder="주민 등록 번호 앞자리" name="HOST_JUMIN1" value={insertHost.HOST_JUMIN1} onChange={onChange} />
          </div>
          <div class="col-sm-1 mt-3">
            -
          </div>
          <div class="col-sm-2 mt-2">
            <input type="number" class="form-control" placeholder="1" name="HOST_JUMIN2" value={insertHost.HOST_JUMIN2} onChange={onChange} />
          </div>
          <div class="col-sm-1 mt-3">
            ******
          </div>
        </div>

        <div class="form-group">
          <label for="exampleTextarea" class="form-label mt-4">본인 소개</label>
          <textarea class="form-control" id="exampleTextarea" rows="4" placeholder="본인 소개글" onChange={onChange} value={insertHost.HOST_INTRO}></textarea>
        </div>

        <Form.Group>
          <Form.Label>호스트 사진 및 소개 파일</Form.Label>
          <ImageUploadBox getImages={getImages} />
        </Form.Group>

        <div class="form-group col-sm-3">
          <label for="exampleSelect1" class="form-label mt-4">은행명</label>
          <select class="form-select" id="exampleSelect1" onChange={onChange} name="HOST_BANK" value={insertHost.HOST_BANK}>
            <option>은행명을 선택하세요</option>
            <option>신한</option>
            <option>국민</option>
            <option>우리</option>
            <option>하나</option>
            <option>농협</option>
          </select>
        </div>

        <Form.Group>
          <Form.Label>계좌번호</Form.Label>
          <Form.Control type="text" placeholder="계좌번호 입력"
            onChange={onChange} name="HOST_ACCOUNT" value={insertHost.HOST_ACCOUNT} />
        </Form.Group>

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
      <div class="row">
        <div className='col-lg-6 col-sm-12 text-lg-start'>
          <Button variant="primary" type="submit" onClick={insertOnClick}>
            등록하기
          </Button>
        </div>
        <div className='col-lg-6 col-sm-12 text-lg-end'>
          <Button variant="secondary" type="submit">
            <Link to='/'>취소</Link>
          </Button>
        </div>
      </div>

    </div >



  )
}

export default MemChange

