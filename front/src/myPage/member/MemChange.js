import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, Navigate, useNavigate } from 'react-router-dom';

const MemChange = () => {

  const [host_email, setHost_email] = useState(''); // 이메일
  const [host_postcode, setHost_postcode] = useState(''); // 우편번호
  const [host_addr1, setHost_addr1] = useState(''); // 기본 주소
  const [host_addr2, setHost_addr2] = useState(''); // 상세 주소
  const [host_jumin1, setHost_jumin1] = useState(''); // 주민등록번호 앞자리
  const [host_jumin2, setHost_jumin2] = useState(''); // 주민등록번호 뒷자리
  const [host_intro, setHost_intro] = useState(''); // 호스트 소개글
  const [host_account, setHost_account] = useState(''); // 호스트 계좌번호
  const [host_bank, setHost_bank] = useState(''); // 호스트 은행명

  const JoinHost = (e) => { // HOST DB에 input 
    e.preventDefault();
    
    if(host_email!=="") {
      if(host_postcode!=="") {
        if(host_addr1!=="") {
          if(host_addr2!=="") {
            if(host_jumin1!=="") {
              if(host_jumin2!=="") {
                if(host_intro!=="") {
                  if(host_account!=="") {
                    if(host_bank!=="") {
    axios({ 
      method : 'post' ,
      url : '/GareBnB/mypage/memChange.do' , 
      contentType:"application/json; charset=UTF-8",
      params : { 
        MEM_IDX : 1,
        HOST_EMAIL : host_email,
        HOST_POSTCODE : host_postcode,
        HOST_ADDR1 : host_addr1,
        HOST_ADDR2 : host_addr2,
        HOST_JUMIN1 : host_jumin1,
        HOST_JUMIN2 : host_jumin2,
        HOST_INTRO : host_intro,
        HOST_ACCOUNT : host_account,
        HOST_BANK: host_bank
      }}).then(Response => { 
        Navigate('/mypage');
  })
                    } else alert("은행명을 선택해주세요")
                  } else alert("계좌번호를 입력해주세요")
                } else alert("호스트 소개를 입력해주세요")
              } else alert("주민등록번호 뒷자리를 입력해주세요")
            } else alert("주민등록번호 앞자리를 입력해주세요")
          } else alert("상세주소를 입력해주세요")
        } else alert("기본주소를 입력해주세요")
      } else alert("우편번호를 입력해주세요")
    } else alert("이메일을 입력해주세요")
}

  return (
    <div>
    <h1>호스트 전환하기</h1>
    <Form>

      <Form.Group className="mb-3">
        <Form.Label>이메일 주소</Form.Label>
        <Form.Control type="email" placeholder="Enter email" value={host_email} onChange={(e)=> setHost_email(e.target.value)} />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>우편번호 <button>검색</button></Form.Label>
        <Form.Control type="number" placeholder="12345" value={host_postcode} onChange={(e)=> setHost_postcode(e.target.value)} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>기본주소</Form.Label>
        <Form.Control type="text" placeholder="기본 주소" value={host_addr1} onChange={(e)=> setHost_addr1(e.target.value)} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>상세주소</Form.Label>
        <Form.Control type="text" placeholder="상세 주소" value={host_addr2} onChange={(e)=> setHost_addr2(e.target.value)} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>주민 등록 번호</Form.Label>
        <Form.Control type="number" placeholder="주민등록번호 앞자리" value={host_jumin1} onChange={(e)=> setHost_jumin1(e.target.value)} /> -
        <Form.Control type="number" placeholder="1" value={host_jumin2} onChange={(e)=> setHost_jumin2(e.target.value)} /> ******
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>본인 소개</Form.Label>
        <Form.Control as="textarea" placeholder="경력, 자격증, 포부, 자기소개" value={host_intro} onChange={(e)=> setHost_intro(e.target.value)} />
      </Form.Group>

      <Form.Group className="mb-3">
      <Form.Label>은행</Form.Label>
      <Form.Select defaultValue={host_bank} onChange={(e)=> setHost_bank(e.target.value)}>
      <option value="default">은행을 선택하여 주세요</option>
      <option value="신한은행">신한은행</option>
      <option value="하나은행">하나은행</option>
      <option value="국민은행">국민은행</option>
      </Form.Select>
      </Form.Group>

    <Form.Group className="mb-3">
        <Form.Label>계좌번호</Form.Label>
        <Form.Control type="text" placeholder="계좌 번호" defaultValue={host_account} onChange={(e)=> setHost_account(e.target.value)} />
      </Form.Group>

    </Form>
      <Button variant="primary" onClick={JoinHost}>전환하기</Button> &nbsp;
      <Button href="/mypage" variant="primary">취소</Button>
    </div>
    )}
  
export default MemChange
