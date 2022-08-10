import React from "react";

import axios from "axios";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import { Button, Modal } from "react-bootstrap";

const FindId = (Login) => {
  const [inputName, setInputName] = useState("");
  const [inputPhone, setInputPhone] = useState("");

  const navigate = useNavigate();

  const getInputName = (event) => {
    let value = event.target.value;
    setInputName(value);
  };

  const getInputPhone = (event) => {
    let value = event.target.value;
    setInputPhone(value);
  };

  const Exit = () => {
    navigate("/");
  };

  async function FindId() {
    await axios({
      method: "post",
      url: "/GareBnB/login/findId.do",
      contentType: "application/json;charset=UTF-8",
      params: {
        MEM_NAME: inputName,
        MEM_PHONE: inputPhone,
      },
    })
      .then((Response) => {
        if ((Response.data === null)) {
          alert("아이디를 찾을 수 없습니다.");
        } else {

          alert("아이디: "+Response.data.MEM_ID);
          Login.onHide();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    // <div className='findId'>
    //   <button onClick={() => setModalIsOpen(true)}>Open modal</button>
    //   <Modal isOpen={modalIsOpen}>
    //     <h2>Modal title</h2>
    //     <p>Modal Body</p>
    //   </Modal>
    //   <input
    //     type="text"
    //     id="find_id_name"
    //     name="find_id_name"
    //     placeholder="이름"
    //     value={inputName}
    //     onChange={(e) => getInputName(e)} //내용이 바뀔떄마다 NAME GET
    //   />

    //   <input
    //     type="text"
    //     id="find_id_phone"
    //     name="find_id_phone"
    //     placeholder="전화번호"
    //     value={inputPhone}
    //     onChange={(e) => getInputPhone(e)} //내용이 바뀔떄마다 PHONE GET
    //   />

    //   <button onClick={findId}> 아이디 찾기 </button>
    //   <button onClick={Exit}> 취소 </button>

    // </div>

    <Modal
      {...Login}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>아이디 확인</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="container ">
          <div className="row p-4">
            <div className="col-sm-1 offset-3 ">
              <label for="inputName" className="control-label">
                NAME
              </label>
            </div>
            <div className="col-sm-3">
              <input
                type="text"
                className="form-control"
                placeholder="이름"
                value={inputName}
                onChange={(e) => getInputName(e)} //내용이 바뀔떄마다 ID GET
              />
            </div>
          </div>

          <div className="row p-4">
            <div className="col-sm-1 offset-3 ">
              <label for="inputPhone" className="col-sm-2 control-label">
                PHONE
              </label>
            </div>
            <div className="col-sm-3">
              <input
                type="text"
                className="form-control"
                placeholder="전화번호"
                value={inputPhone}
                onChange={(e) => getInputPhone(e)} //내용이 바뀔떄마다 PW GET
              />
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={Login.onHide}>
          취소
        </Button>
        <Button
          variant="primary"
          onClick={async () => {
            await FindId();
          }}
        >
          확인
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FindId;
