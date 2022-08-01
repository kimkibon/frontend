import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, Link, renderMatches } from 'react-router-dom';
import UpdateFiles from './UpdateFiles';
import ImageUploadBox from '../myBoard/component/ImageUploadBox';
import { Modal } from 'react-bootstrap';
import HostAddress from '../../member/HostAddress';

// 회원정보 보기 - 수정(HostInfo -> 수정하기 버튼 눌러야 페이지 확인 가능)

const HostModify = () => {
  const [url, setUrl] = useState();
  const [file, setFile] = useState([]);
  const [showAddrModal, setShowAddrModal] = React.useState(false);
  const [updateFiles, setUpdateFiles] = useState([]);
 
  const location = useLocation();
  const mem = location.state.mem;   // HostInfo의 member 정보를 HostModify로 넘겨줌 (mem)

  const [hostModify , setHostModify] = useState ({ // hostModify 초기값으로 mem의 값 지정
    MEM_ID : mem.MEM_ID,
    MEM_IDX : mem.MEM_IDX,
    MEM_PW : mem.MEM_PW, 
    MEM_NAME : mem.MEM_NAME, 
    MEM_PHONE : mem.MEM_PHONE,
    HOST_EMAIL : mem.HOST_EMAIL,
    HOST_POST : mem.HOST_POST,
    HOST_ADDR1 : mem.HOST_ADDR1,
    HOST_ADDR2 : mem.HOST_ADDR2,
    HOST_INTRO : mem.HOST_INTRO,
    HOST_BANK : mem.HOST_BANK,
    HOST_ACCOUNT : mem.HOST_ACCOUNT
  });

  const { MEM_ID, MEM_IDX, MEM_PW, MEM_NAME, MEM_PHONE, HOST_EMAIL,
    HOST_POST, HOST_ADDR1, HOST_ADDR2, HOST_INTRO, HOST_BANK, HOST_ACCOUNT} = hostModify;


  const HostModifySuccess= () => { // 수정완료 버튼 클릭 시 update sql문 실행됨
    axios({
    method : 'post',
    url : '/GareBnB/host/myPage/hostModify.do',
    contentType:"apllication/json; charset=UTF-8",
    params : {
      MEM_IDX : MEM_IDX,
      HOST_EMAIL : HOST_EMAIL,
      HOST_POST : HOST_POST,
      HOST_ADDR1 : HOST_ADDR1,
      HOST_ADDR2 : HOST_ADDR2,
      HOST_INTRO : HOST_INTRO,
      HOST_BANK : HOST_BANK,
      HOST_ACCOUNT : HOST_ACCOUNT
    } })
  .then(Response => {
    alert('수정완료 성공');
    window.location.href = '../host/hostInfo'; // 수정완료 성공 알림창 확인 버튼 클릭 시 회원정보 보기 페이지로 이동됨
  })
  }

  const onChange = (e) => { // 수정하면 복사된 hostModify name & value가 setHostModify 입력됨 
    const {name, value} = e.target;
    setHostModify( {
      ...hostModify, 
      [name] : value
    });
  };

  const setAddrInfo = (data) => {
    setHostModify({
      ...hostModify,
      'HOST_ADDR1': data.HOST_ADDR1,
      'HOST_POST': data.HOST_POST
    })
    setShowAddrModal(false)
    console.log(hostModify)
  }


  // 미리보기로 만들어진 이미지를 저장 
  const getImages = (image) => {
    setUpdateFiles(image)
   }


  const files = updateFiles.map(file => {
    let arr = file.url.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return (
      new File([u8arr], file.fileName, { type: mime })
    )
  })
 
  
  // 파일 DB에 파일 정보 저장하려고 UpdateFiles 정보 보내기
  files.map(async (file, index) => {  
    await UpdateFiles(file , MEM_IDX , index , '1'); 
                      // file, MEM_IDX, index, FILE_BOARD_TYPE
    })
  
   
  return (
    <article>
      <h1>회원정보 수정</h1>
      <h5>이름, 비밀번호, 휴대폰번호는 일반회원 페이지에서 수정하실 수 있습니다.</h5>
      
      <ul>
      <h3>호스트 사진 : </h3>
          {/* 사진 첨부 */}
      <ImageUploadBox getImages={getImages} />
      <li>아이디 : {MEM_ID} </li>
      <li>이름 : {MEM_NAME} </li>
      <li>비밀번호 : {MEM_PW} </li>
      <li>휴대폰 번호 : {MEM_PHONE}</li>
      <li>이메일 : <input name="HOST_EMAIL" value={HOST_EMAIL} onChange={onChange}></input></li>
      <li>우편번호 : 
      <input name="HOST_POST" placeholder="우편번호 입력" onChange={onChange} value={HOST_POST} />
      <button
      className="btn btn-outline-secondary"
      type="button"
      id="button-addon"
      onClick={() => setShowAddrModal(true)}>
      우편번호 찾기
      </button></li>
      <li>기본주소 : <input name="HOST_ADDR1" value={HOST_ADDR1} onChange={onChange}></input></li>
      <li>상세주소 : <input name="HOST_ADDR2" value={HOST_ADDR2} onChange={onChange}></input></li>
      <li>소개글 : <input name="HOST_INTRO" value={HOST_INTRO} onChange={onChange}></input></li>
      <li>은행 : <input name="HOST_BANK" value={HOST_BANK} onChange={onChange}></input></li>
      <li>계좌번호 : <input name="HOST_ACCOUNT" value={HOST_ACCOUNT} onChange={onChange}></input></li>
      <button type="submit" onClick={HostModifySuccess}>수정완료</button>  &emsp; &emsp; 
      <button><Link to = '../hostInfo'>취소</Link></button>

         {/* 입력확인창 모달로 띄우기 !  */} {/* 주소 검색 모달 */}
         <Modal
          show={showAddrModal}
          onHide={() => setShowAddrModal(false)}>
          <HostAddress
            setAddrInfo={setAddrInfo}/>
         </Modal>
 
      </ul>
     </article>
  )
  }


export default HostModify