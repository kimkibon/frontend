import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Navigate, useNavigate } from 'react-router-dom';
import InsertHost from './InsertHost';
import ImageUploadBox from '../host/myBoard/component/ImageUploadBox';

const MemChange = () => {
  const [insertModal, setInsertModal] = React.useState(false);
  
  const [insertHostFiles, setInsertHostFiles] = useState([]);
  const [insertHost, setInsertHost] = useState({
    'MEM_IDX' : '2',
    'HOST_EMAIL' : '',
    'HOST_POSTCODE' : '',
    'HOST_ADDR1' : '',
    'HOST_ADDR2' : '',
    'HOST_JUMIN1' : '',
		'HOST_JUMIN2' : '',
		'HOST_INTRO' : '',
		'HOST_ACCOUNT' : '',
		'HOST_BANK' : ''
  });

  const {
    MEM_IDX,
    HOST_EMAIL,
    HOST_POSTCODE,
    HOST_ADDR1,
    HOST_ADDR2,
    HOST_JUMIN1,
    HOST_JUMIN2,
    HOST_INTRO,
    HOST_ACCOUNT,
    HOST_BANK
  } = insertHost;

  const setItems = (e) => {
    const { name, value } = e.target;
    setInsertHost({
      ...insertHost,
      [name]: value
    })
    console.log(insertHost)
  };
  

  const getImages = (image) => {
    setInsertHostFiles(image)
  }

  return (
    <div>
    <h1>호스트 전환하기</h1>
    <Form>

      <Form.Group className="mb-3">
        <Form.Label>이메일 주소</Form.Label>
        <Form.Control type="email" placeholder="Enter email" value={HOST_EMAIL} onChange={(e)=> setItems(e)} />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>우편번호 <button>검색</button></Form.Label>
        <Form.Control type="number" placeholder="12345" value={HOST_POSTCODE} onChange={(e)=>setItems(e)} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>기본주소</Form.Label>
        <Form.Control type="text" placeholder="기본 주소" value={HOST_ADDR1} onChange={(e)=> setItems(e)} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>상세주소</Form.Label>
        <Form.Control type="text" placeholder="상세 주소" value={HOST_ADDR2} onChange={(e)=> setItems(e)} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>주민 등록 번호</Form.Label>
        <Form.Control type="number" placeholder="주민등록번호 앞자리" value={HOST_JUMIN1} onChange={(e)=> setItems(e)} /> -
        <Form.Control type="number" placeholder="1" value={HOST_JUMIN2} onChange={(e)=> setItems(e)} /> ******
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>본인 사진</Form.Label> <br/>
        <Form.Text className="text-muted">
         본인을 확인할 수 있는 사진 첨부 부탁드립니다. (예 : 증명 사진)
        </Form.Text>
        <ImageUploadBox getImages={getImages} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>본인 소개</Form.Label>
        <Form.Control as="textarea" placeholder="경력, 자격증, 포부, 자기소개" value={HOST_INTRO} onChange={(e)=> setItems(e)} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>사진 첨부</Form.Label> <br/>
        <Form.Text className="text-muted">
         본인 소개글에 대한 증명 자료로 사진이 있으시다면, 호스트 전환에 도움이 될 수 있으므로 추가 부탁드립니다.
        </Form.Text>
        <ImageUploadBox getImages={getImages} />
      </Form.Group>


      <Form.Group className="mb-3">
      <Form.Label>은행</Form.Label>
      <Form.Select defaultValue={HOST_BANK} onChange={(e)=> setItems(e)}>
      <option value="default">은행을 선택하여 주세요</option>
      <option value="신한은행">신한은행</option>
      <option value="하나은행">하나은행</option>
      <option value="국민은행">국민은행</option>
      </Form.Select>
      </Form.Group>

    <Form.Group className="mb-3">
        <Form.Label>계좌번호</Form.Label>
        <Form.Control type="text" placeholder="계좌 번호" defaultValue={HOST_ACCOUNT} onChange={(e)=> setItems(e)} />
      </Form.Group>

    </Form>
      <Button variant="primary" onClick={() => setInsertModal(true)}>전환하기</Button> &nbsp;
      <Button href="/mypage" variant="primary">취소</Button>

      <InsertHost
          show={insertModal}
          onHide={() => setInsertModal(false)}
          insert={{ "insertHost": insertHost, "insertHostFiles": insertHostFiles }}
        />
        {/* 입력확인창 모달로 띄우기 !  */}
    </div>
    )}
  
export default MemChange
