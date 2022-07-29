import React from 'react'

import axios from 'axios';
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Modal from 'bootstrap/js/dist/modal';




const FindId = () => {
  const [inputName, setInputName] = useState("");
  const [inputPhone, setInputPhone] = useState("");
 
  const navigate = useNavigate();
  const [modalIsOpen, setModalIsOpen] = useState(false)


  const getInputName = (event) =>{
    let value = event.target.value;
    setInputName(value);
  };

  const getInputPhone = (event) =>{
    let value = event.target.value;
    setInputPhone(value);
  };

  const Exit = () => {
    navigate('/');
  };

  const findId =() =>{
    axios({
      method : 'post' ,
      url : '/GareBnB/login/findId.do' ,
      contentType:"application/json;charset=UTF-8",
      params : {
          'MEM_NAME'  : inputName ,
          'MEM_PHONE' : inputPhone 

      }}).then(Response => {
        if (Response.data = null){
          alert("아이디를 찾을 수 없습니다.");
        }
        else {
          console.log(Response.data.MEM_ID)

          navigate('/');
        }
      }).catch(err => {
        console.log(err);
      });
    
  }


  return (
    <div className='findId'>
      <button onClick={() => setModalIsOpen(true)}>Open modal</button>
      <Modal isOpen={modalIsOpen}>
        <h2>Modal title</h2>
        <p>Modal Body</p>
      </Modal>
      <input
        type="text"
        id="find_id_name"
        name="find_id_name"
        placeholder="이름"
        value={inputName}
        onChange={(e) => getInputName(e)} //내용이 바뀔떄마다 NAME GET
      />

      <input
        type="text"
        id="find_id_phone"
        name="find_id_phone"
        placeholder="전화번호"
        value={inputPhone}
        onChange={(e) => getInputPhone(e)} //내용이 바뀔떄마다 PHONE GET
      />

      <button onClick={findId}> 아이디 찾기 </button>
      <button onClick={Exit}> 취소 </button>  

    </div>
  )
}

export default FindId