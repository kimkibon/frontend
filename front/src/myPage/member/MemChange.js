import React, { useState } from 'react'
import { Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ImageUploadBox from '../host/myBoard/component/ImageUploadBox';
import HostAddress from './HostAddress';
import InsertHost from './InsertHost';
import {Button,Form} from 'react-bootstrap';

const MemChange = () => {

  // MEM_IDX 불러오는 기능있어야함

  const [insertModal, setInsertModal] = React.useState(false);
  const [showAddrModal, setShowAddrModal] = React.useState(false);
  const [insertFiles, setInsertFiles] = useState([]);
  const [insertHost, setInsertHost] = useState({    
    MEM_IDX : '3',
    HOST_EMAIL : '',
    HOST_POST : '',
    HOST_ADDR1 : '',
    HOST_ADDR2 : '',
    HOST_JUMIN1 : '',
		HOST_JUMIN2 : '',
		HOST_INTRO : '',
		HOST_ACCOUNT : '',
		HOST_BANK : ''
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

    const setAddrInfo = (data) => {
      setInsertHost({
        ...insertHost,
        'HOST_ADDR1': data.HOST_ADDR1,
        'HOST_POST': data.HOST_POST
      })
      setShowAddrModal(false)
      console.log(insertHost)
    }

  const onChange = (e) => {    
    const { value, name } = e.target;  
    setInsertHost({      
      ...insertHost, // 기존의 input 객체를 복사한 뒤      
      [name]: value // name 키를 가진 값을 value 로 설정    
    });  
   console.log(insertHost)
  };

  const getImages = (image) => {
    setInsertFiles(image)
  }
   // 미리보기로 만들어진 이미지를 저장 

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

      <div className="col-md-6">
      <h2>호스트 전환하기</h2>
      <div>
      <Form.Group>
        <Form.Label>이메일 주소</Form.Label>
        <Form.Control type="email" placeholder="이메일 입력" 
        onChange={onChange} name="HOST_EMAIL" value={insertHost.HOST_EMAIL} />
      </Form.Group>

      <Form.Group>
        <Form.Label>우편번호 </Form.Label>
        <Form.Control type="text" placeholder="우편번호 입력" 
                      onChange={onChange} name="HOST_POST" value={insertHost.HOST_POST} 
                      aria-describedby="button-addon" className="input-group mb-3"></Form.Control>
                       <button className="btn btn-primary" type="button" id="button-addon" onClick={() => setShowAddrModal(true)}>우편번호 찾기</button>
      </Form.Group>
     
      <Form.Group>
        <Form.Label>기본 주소</Form.Label>
        <Form.Control type="text" placeholder="기본 주소" 
        onChange={onChange} name="HOST_ADDR1" value={insertHost.HOST_ADDR1} />
      </Form.Group>
     
      <Form.Group>
        <Form.Label>상세 주소</Form.Label>
        <Form.Control type="text" placeholder="상세 주소" 
        onChange={onChange} name="HOST_ADDR2" value={insertHost.HOST_ADDR2} />
      </Form.Group>

      <Form.Group>
        <Form.Label>주민 등록 번호</Form.Label>
        <Form.Control type="number" placeholder="주민 등록 번호 앞자리" 
        onChange={onChange} name="HOST_JUMIN1" value={insertHost.HOST_JUMIN1} /> -
        <Form.Control type="number" placeholder="주민 등록 번호 뒷자리 1번째" 
        onChange={onChange} name="HOST_JUMIN2" value={insertHost.HOST_JUMIN2} /> ******
      </Form.Group>

      <Form.Group>
        <Form.Label>본인 소개</Form.Label>
        <Form.Control type="text" placeholder="본인 소개글" 
        onChange={onChange} name="HOST_INTRO" value={insertHost.HOST_INTRO} />
      </Form.Group>

      <Form.Group>
        <Form.Label>호스트 사진 및 소개 파일</Form.Label>
        <ImageUploadBox getImages={getImages} />
      </Form.Group>


      <div class="form-group">
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
          }}/>

        {/* 입력확인창 모달로 띄우기 !  */} {/* 주소 검색 모달 */}
        <Modal
          show={showAddrModal}
          onHide={() => setShowAddrModal(false)}>
          <HostAddress
            setAddrInfo={setAddrInfo}/>
        </Modal>
        </div>
 
        <div className='col-lg-12 text-lg-left'>
          <Button variant="primary" type="submit" onClick={insertOnClick}>
          등록하기
          </Button>
          <div className='col-lg-12 text-lg-center'>
          <Button variant="primary" type="submit">
          <Link to='/'>취소</Link>
          </Button>
        </div>
       
       </div>

       
    </div>
    

    
  )
}

export default MemChange

