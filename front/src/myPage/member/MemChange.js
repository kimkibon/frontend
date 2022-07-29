import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';


const MemChange = () => {

    const navigate = useNavigate();
    const [memChange, setMemChange] = useState({
      'MEM_IDX' : '1',
      'HOST_EMAIL' : '',
      'HOST_POST' : '',
      'HOST_ADDR1' : '',
      'HOST_ADDR2' : '',
      'HOST_JUMIN1' : '',
      'HOST_JUMIN2' : '',
      'HOST_INTRO' : '',
      'HOST_ACCOUNT' : '',
      'HOST_BANK' : ''
    });

    const {HOST_EMAIL, HOST_POST, HOST_ADDR1, HOST_ADDR2,
    HOST_JUMIN1, HOST_JUMIN2, HOST_INTRO, HOST_ACCOUNT, HOST_BANK} = memChange;

    const onChange = (e) => { 
      const {name, value} = e.target;
      setMemChange( {
        ...memChange, 
        [name] : value
      })
    };
    console.log(memChange);

    // const JoinHost = () => { // HOST DB에 input 
    //   axios({ 
    //     method : 'post' ,
    //     url : '/GareBnB/mypage/memChange.do' , 
    //     contentType:"application/json; charset=UTF-8",
    //     params : { 
    //       'MEM_IDX' : '1',
    //       'HOST_EMAIL' : HOST_EMAIL,
    //       'HOST_POST' : HOST_POST,
    //       'HOST_ADDR1' : HOST_ADDR1,
    //       'HOST_ADDR2' : HOST_ADDR2,
    //       'HOST_JUMIN1' : HOST_JUMIN1,
    //       'HOST_JUMIN2' : HOST_JUMIN2,
    //       'HOST_INTRO' : HOST_INTRO,
    //       'HOST_ACCOUNT' : HOST_ACCOUNT,
    //       'HOST_BANK': HOST_BANK
    //     }}).then(Response => { 
    //      alert("ok")
    // })

  return (
    <ul>
        <h1>호스트 전환하기</h1>
        
        <li>이메일 : <input type="text" placeholder='이메일 입력' value={HOST_EMAIL} onChange={onChange}></input></li>
        <li>우편번호 : <input type="text" placeholder='12345' value={HOST_POST} onChange={onChange}></input>
        <button>우편번호 찾기</button></li>
        <li>기본주소 : <input type="text" placeholder='기본주소' value={HOST_ADDR1} onChange={onChange}></input></li>
        <li>상세주소 : <input type="text" placeholder='상세주소 입력' value={HOST_ADDR2} onChange={onChange}></input></li>
        <li>주민등록번호 : <input type="number" placeholder='주민앞자리' value={HOST_JUMIN1} onChange={onChange}></input>-
        <input type="number" value={HOST_JUMIN2} onChange={onChange}></input>******</li>
        <li>본인 사진 :</li>
        <li>본인 소개 :<textarea cols="50" placeholder='경력, 자격증, 포부, 자기소개' value={HOST_INTRO} onChange={onChange}></textarea></li>
        <li>사진 첨부 : </li>
        <li>계좌 번호 : 
          <select value={HOST_BANK} onChange={onChange}>
          <option value="신한은행">신한은행</option>
          <option value="농협은행">농협은행</option>
          <option value="하나은행">하나은행</option></select>
          <input type="text" placeholder='계좌 번호 입력' value={HOST_ACCOUNT} onChange={onChange}></input></li>
          {/* <button onClick={JoinHost}>제출</button> <button>취소</button> */}
   
        </ul>
  
    )}
  
  // }
export default MemChange