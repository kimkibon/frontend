import React from "react";

import axios from "axios";
import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import { Button, Modal } from "react-bootstrap";

const FindPw = (props) => {
  const [inputChangePW, setInputChangePW] = useState("");
  const [inputChangePWOK, setInputChangePWOK] = useState("");
  const [passwordOption, setPasswordOption] = useState(false); //비밀번호표시 checkBox컨트롤

  const [passwordInputType, setPasswordInputType] = useState({
    type: "password",
    autoComplete: "current-password",
  }); //type과 autoComplete를 변경하기 위한 useState

  const navigate = useNavigate();

  const getInputChangePW = (event) => {
    //이름
    let value = event.target.value;
    setInputChangePW(value);
  };

  const getInputChagnePWOK = (event) => {
    //핸드폰번호
    let value = event.target.value;
    setInputChangePWOK(value);
  };
  const SameCheckForPW = () => {
    return inputChangePW === inputChangePWOK ? true : false;
  };

  const Exit = () => {
    //취소하기
    navigate("/");
  };
  useEffect(() => {
    if (passwordOption === false)
      setPasswordInputType({
        type: "password",
        autoComplete: "current-password",
      });
    else
      setPasswordInputType({
        type: "text",
        autoComplete: "off",
      });
  }, [passwordOption]);

  async function findPw() {
    if (SameCheckForPW()) {
      await axios({
        method: "post",
        url: "/GareBnB/login/findPw.do",
        contentType: "application/json;charset=UTF-8",
        params: {
          MEM_ID: props.props,
          MEM_PW: inputChangePW,
        },
      })
        .then((Response) => {
          if (Response.data === "") {
            window.location.replace("/");
          }
        })
        .catch((err) => {
          alert("실패");
        });
    } else alert("비밀번호가 같지 않습니다.");
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>새 비밀번호 입력</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="container ">
          <div className="row p-4">
            <div className="col-sm-3 offset-2 ">
              <label htmlFor="inputchangePW" className="control-label">
                비밀번호
              </label>
            </div>
            <div className="col-sm-3">
              <input
                type={passwordInputType.type}
                className="form-control"
                placeholder="PW"
                value={inputChangePW}
                onChange={(e) => getInputChangePW(e)} //내용이 바뀔떄마다 ID GET
              />
            </div>
          </div>

          <div className="row p-4">
            <div className="col-sm-3 offset-2 ">
              <label for="inputChangePWOK" className="control-label">
                비밀번호 확인
              </label>
            </div>
            <div className="col-sm-3">
              <input
                type={passwordInputType.type}
                className="form-control"
                placeholder="PWCHECK"
                value={inputChangePWOK}
                onChange={(e) => getInputChagnePWOK(e)} //내용이 바뀔떄마다 ID GET
              />
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          취소
        </Button>
        <Button
          variant="primary"
          onClick={async () => {
            await findPw();
          }}
        >
          확인
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FindPw;
