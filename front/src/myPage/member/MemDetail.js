
// 회원정보 보기 (수정하기 버튼), (회원 탈퇴) 도 같은 페이지에 보여야 함)
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Modal from '../member/Modal';

const MemDetail = () => { 

    const [memDetail, setMemDetail] = useState([]);

    useEffect(() => // 회원정보 보여주기
        { axios({ 
        method : 'post' ,
        url : '/GareBnB/mypage/MemDetail.do' , 
        contentType:"application/json; charset=UTF-8",
        params : { 
            MEM_IDX : '7' 
        }})

    .then(Response => { 
    console.log(Response.data);
    setMemDetail(Response.data);

    })
    },[]); 

    const [memDelete, setmemDelete] = useState([]); // 탈퇴 회원으로 레벨 업데이트 
    const onDeleteMem = (mem_id) => {
        axios({ 
        method : 'post' ,
        url : '/GareBnB/mypage/memDelete.do' , 
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
        if(originPW === memDetail.MEM_PW) { // 비밀번호와 입력한 비밀번호가 일치하면 회원 탈퇴 페이지로 이동
            alert("탈퇴가 완료되었습니다")
            onDeleteMem(memDetail.MEM_ID) // 탈퇴 진행 (레벨 6으로 업데이트)
            window.location.href = '../index/' // 메인 페이지로 이동 
        
        } else {
            alert("비밀번호가 일치하지 않습니다")
        }
    }


    return ( 
        <article>
        <h1>회원정보 보기</h1>
        <ul>
        <li>아이디 : {memDetail.MEM_ID}</li>
        <li>이름 : {memDetail.MEM_NAME}</li>
        <li>비밀번호(임시) : {memDetail.MEM_PW}</li>
        <li>휴대폰 번호 : {memDetail.MEM_PHONE}</li>
        </ul>
       


        <Link to = {'../member/MemModify'} state = {{mem : memDetail}}><button>수정하기</button></Link>
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

    export default MemDetail 