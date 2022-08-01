// 회원정보 보기 (수정하기 버튼), (회원 탈퇴) 도 같은 페이지에 보여야 함)
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Modal from '../../member/Modal';
import Carousel from 'react-bootstrap/Carousel';
import SelectFileList from '../../../commons/Files/SelectFileList';
import ImageUploadBox from '../myBoard/component/ImageUploadBox';


const HostInfo = () => { 

    const [hostDetail, sethostDetail] = useState([]);
    const [url, setUrl] = useState();
    const [file, setFile] = useState([]);
    const [memDelete, setmemDelete] = useState([]); // 탈퇴 회원으로 레벨 업데이트 
    
    const onDeleteMem = (mem_id) => {
        axios({ 
        method : 'post',
        url : '/GareBnB/mypage/memDelete.do', 
        contentType:"application/json; charset=UTF-8",
        params : { 
            MEM_ID : mem_id
        }})
    .then(Response => { 
    console.log(Response.data);
    setmemDelete(Response.data);
    })
    };

    const [modalOpen, setModalOpen] = useState(false); //  모달 오픈 상태 (true: 열림, false : 닫힘) - 비밀번호 입력하는 모달
    const openModal = () => {
        setModalOpen(true);
      };
      const closeModal = () => {
        setModalOpen(false);
      };
    

    const [originPW, setOriginPw] = useState(""); // 탈퇴할 때 입력하는 비밀번호 

    const PWCHECK = () => {
        if(originPW === hostDetail.MEM_PW) { // 비밀번호와 입력한 비밀번호가 일치하면 회원 탈퇴 페이지로 이동
            alert("탈퇴가 완료되었습니다")
            onDeleteMem(hostDetail.MEM_ID) // 탈퇴 진행 (레벨 6으로 업데이트)
            window.location.href = '../index/' // 메인 페이지로 이동 
        
        } else {
            alert("비밀번호가 일치하지 않습니다")
        }
    }

   // 회원정보 보여주기
   useEffect(() => {
        axios({ 
        method : 'post' ,
        url : '/GareBnB/host/myPage/hostInfo.do' , 
        contentType:"application/json; charset=UTF-8",
        params : { 
            MEM_ID : 'MEM_20',
            MEM_IDX : '20'
        }})

    .then(Response => { 
    console.log(Response.data);
    sethostDetail(Response.data);
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
  },[]); 

   hostDetail['URL'] = url;


    return ( 
        <article>
        <h1>회원정보 보기(HOST)</h1>
        <ul>
        <li>호스트 사진</li>  {/* 캐러셀 */}
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

        <li>아이디 : {hostDetail.MEM_ID}</li>
        <li>이름 : {hostDetail.MEM_NAME}</li>
        <li>비밀번호(임시) : {hostDetail.MEM_PW}</li>
        <li>휴대폰 번호 : {hostDetail.MEM_PHONE}</li>
        <li>이메일 : {hostDetail.HOST_EMAIL}</li>
        <li>우편번호 : {hostDetail.HOST_POST}</li>
        <li>기본주소 : {hostDetail.HOST_ADDR1}</li>
        <li>상세주소 : {hostDetail.HOST_ADDR2}</li>
        <li>소개글 : {hostDetail.HOST_INTRO}</li>
        <li>은행 : {hostDetail.HOST_BANK}</li>
        <li>계좌 : {hostDetail.HOST_ACCOUNT}</li>
        {/* 주민등록번호는 회원정보에 띄우지 않았음..! */}
        </ul>
       


        <Link to = {'../HostModify'} state = {{mem : hostDetail, file: file}}><button>수정하기</button></Link>
        &nbsp; &nbsp; &nbsp; &nbsp; 
    

        <button onClick={openModal}>탈퇴하기</button>
        
        <Modal open = {modalOpen} close= {closeModal}>
        <h3>비밀번호 입력 : <input type="password" placeholder='비밀번호를 입력하세요' onChange={e => setOriginPw(e.target.value)} ></input></h3>
        <button onClick={PWCHECK}>확인</button> &nbsp; &nbsp; &nbsp; &nbsp;
        <button onClick={()=>setModalOpen(false)}>취소</button>
        </Modal>
        
        <br/><br/><br/>
        </article>
    )
}

    export default HostInfo 