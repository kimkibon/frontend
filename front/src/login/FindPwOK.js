import React from "react";

import axios from "axios";
import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import { Button, Modal } from "react-bootstrap";
import FindPw from "./FindPw";

//비밀번호를 찾을 계정이 있는지 체크 -> 아이디를 findPW로 전달
const FindPwOK = (Login) => {
  const [inputName, setInputName] = useState("");
  const [inputPhone, setInputPhone] = useState("");
  const [inputID, setInputID] = useState("");
  const [IDRequest, setIDRequest] = useState([]);  //입력 변수 저장
  const [findPwOKClick, setfindPwOKClick] = React.useState(false); // 모달창 온오프 변수 

  const navigate = useNavigate();

  const getInputName = (event) => {
    //이름
    let value = event.target.value;
    setInputName(value);
  };

  const getInputPhone = (event) => {
    //핸드폰번호
    let value = event.target.value;
    setInputPhone(value);
  };

  const getInputID = (event) => {
    //ID
    let value = event.target.value;
    setInputID(value);
  };

  const Exit = () => {
    //취소하기
    navigate("/");
  };

  useEffect(() => {

    const request = {
      'MEM_ID': getInputID
    }

    setIDRequest(request);
    
  }, [findPwOKClick])

  async function findPwOK() {
    await axios({
      method: "post",
      url: "/GareBnB/login/findPwOK.do",
      contentType: "application/json;charset=UTF-8",
      params: {
        MEM_ID: inputID,
        MEM_NAME: inputName,
        MEM_PHONE: inputPhone //ID,이름,핸드폰 받음
      },
    })
      .then((Response) => {
        if (Response.data === null) {
          alert("계정을 찾을수 없습니다.");
        } else {
          setfindPwOKClick(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>
    
    <Modal
      {...Login}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>비밀번호 확인</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="container ">

        <div className="row p-4">
            <div className="col-sm-1 offset-3 ">
              <label for="inputName" className="control-label">
                ID
              </label>
            </div>
            <div className="col-sm-3">
              <input
                type="text"
                className="form-control"
                placeholder="ID"
                value={inputID}
                onChange={(e) => getInputID(e)} //내용이 바뀔떄마다 ID GET
              />
            </div>
          </div>
          
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
            await findPwOK()
          }}
        >
          확인
        </Button>
      </Modal.Footer>
    </Modal>

    <FindPw
        show={findPwOKClick}
        onHide={() => setfindPwOKClick(false)}
        props={inputID} 
      /> 

    </div>
  )

  
}

export default FindPwOK;