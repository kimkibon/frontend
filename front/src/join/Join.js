import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

const Join = () => {
  const [JoinID, setJoinID] = useState("");
  const [JoinIDCheck, setJoinIDCheck] = useState("1"); //0: 중복체크 완료 , 1: 중복체크 미완료
  const [JoinPassword, setJoinPassword] = useState("");
  const [JoinPwCheck, setJoinPwCheck] = useState("");
  const [JoinName, setJoinName] = useState("");
  const [JoinPhone, setJoinPhone] = useState(""); //입력한 폰번호
  const [PhoneOK, setPhoneOK] = useState("0"); //미인증:0 인증:1 폰인증 됐는지?
  const [InputVerifyCode, setInputVerifyCode] = useState(""); //입력한 인증번호
  const [RealVerifyCode, setRealVerifyCode] = useState(""); //서버에서 넘어온 VerifyCode
  const navigate = useNavigate();

  const dataRuleCheckForID = (ch) => {
    let ascii = ch.charCodeAt(0);
    if (48 /* 0 */ <= ascii && ascii <= 57 /* 9 */) return true;
    if (65 /* A */ <= ascii && ascii <= 90 /* Z */) return true;
    if (97 /* a */ <= ascii && ascii <= 122 /* z */) return true;
    if (ch === ".") return true;

    return false;
  };

  const getJoinID = (event) => {
    let value = event.target.value;

    if (value === "") {
      setJoinID(value);
      return;
    }
    let length = value.length;
    if (dataRuleCheckForID(value[length - 1]) === false) return;

    setJoinID(value);
    setJoinIDCheck(1);

    return;
  };

  const getJoinPassword = (event) => {
    let value = event.target.value;
    setJoinPassword(value);
  };
  const getJoinPwCheck = (event) => {
    let value = event.target.value;
    setJoinPwCheck(value);
  };
  const getJoinName = (event) => {
    let value = event.target.value;
    setJoinName(value);
  };
  const getJoinPhone = (event) => {
    let value = event.target.value;
    setJoinPhone(value);
  };
  const getInputVerifyCode = (event) => {
    let value = event.target.value;
    setInputVerifyCode(value);
  };

  const send = () => {
    axios({
      method: "post",
      url: "/GareBnB/PhoneNumberCheck.do",
      contentType: "application/json;charset=UTF-8",
      params: {
        to: JoinPhone,
      },
    })
      .then((Response) => {
        console.log(Response.data);
        console.log(Response.data.value);
        setRealVerifyCode(Response.data);
      })
      .catch((err) => {
        console.log(err);
        alert("에러");
      });
  };

  const verify = () => {
    if (InputVerifyCode == RealVerifyCode) {
      alert("인증이 완료되었습니다.");
      setPhoneOK(1);
      console.log(PhoneOK);
    } else {
      alert("인증에 실패하였습니다.");
      console.log(RealVerifyCode);
      console.log(InputVerifyCode);
    }
  };

  const IDDupCheck = () => {
    if (JoinID !== "") {
      axios({
        method: "post",
        url: "/GareBnB/confirmId.do",
        contentType: "application/json;charset=UTF-8",
        params: {
          MEM_ID: JoinID,
        },
      })
        .then((Response) => {
          console.log(Response.data);
          if (Response.data === 0) {
            alert("아이디를 사용하실 수 있습니다.");
            setJoinIDCheck(0);
          } else {
            alert("해당 아이디가 이미 존재합니다.");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else alert("아이디를 입력하세요");
  };

  const dataRuleCheckForPW = () => {
    return JoinPassword.length >= 8 ? true : false;
  };
  const SameCheckForPW = () => {
    return JoinPassword === JoinPwCheck ? true : false;
  };

  const Join = () => {
    console.log({ JoinID, JoinPassword });
    if (JoinIDCheck === 0) {
      if (dataRuleCheckForPW()) {
        if (SameCheckForPW()) {
          if (JoinName !== "") {
            if (JoinPhone !== "") {
              if (PhoneOK === 1) {
                axios({
                  method: "post",
                  url: "/GareBnB/joinSuccess.do",
                  contentType: "application/json;charset=UTF-8",
                  params: {
                    MEM_ID: JoinID,
                    MEM_PW: JoinPassword,
                    MEM_NAME: JoinName,
                    MEM_PHONE: JoinPhone,
                  },
                })
                  .then((Response) => {
                    navigate("/");
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }
            } else alert("휴대폰번호를 입력해주세요");
          } else alert("이름을 입력해주세요");
        } else alert("비밀번호가 같지 않습니다.");
      } else alert("비밀번호가 너무 짧습니다.");
    } else alert("아이디를 확인해주세요");
  };

  const Exit = () => {
    navigate("/");
  };

  return (
    <div className="container ">
      <div className="row p-4">
        <div class="col-sm-1 offset-3">
          <label for="inputID" className="control-label">
            ID
          </label>
        </div>
        <div className="col-sm-3">
          <input
            type="text"
            className="form-control"
            placeholder="아이디"
            value={JoinID}
            onChange={(e) => getJoinID(e)} //내용이 바뀔떄마다 ID GET
          />
        </div>

        <div className="col-sm-3 offset-1">
          <button
            type="button"
            className="btn btn-primary"
            onClick={IDDupCheck}
          >
            {" "}
            중복확인{" "}
          </button>
        </div>
      </div>

      <div className="row p-4">
        <div class="col-sm-1 offset-3">
          <label for="inputPW" className="col-sm-2 control-label">
            PW
          </label>
        </div>
        <div className="col-sm-3">
          <input
            type="password"
            className="form-control"
            placeholder="비밀번호"
            value={JoinPassword}
            onChange={(e) => getJoinPassword(e)} //내용이 바뀔떄마다 PW GET
          />
        </div>
      </div>
      <div className="row p-4">
        <div class="col-sm-1 offset-3">
          <label for="inputPWCheck" className="col-sm-2 control-label">
            PWCheck
          </label>
        </div>
        <div className="col-sm-3">
          <input
            type="password"
            className="form-control"
            placeholder="비밀번호확인"
            value={JoinPwCheck}
            onChange={(e) => getJoinPwCheck(e)} //내용이 바뀔떄마다 PWCheck GET
          />
        </div>
      </div>
      <div className="row p-4">
        <div class="col-sm-1 offset-3">
          <label for="inputName" className="col-sm-2 control-label">
            Name
          </label>
        </div>
        <div className="col-sm-3">
          <input
            type="text"
            className="form-control"
            placeholder="이름"
            value={JoinName}
            onChange={(e) => getJoinName(e)} //내용이 바뀔떄마다 Name GET
          />
        </div>
      </div>
      <div className="row p-4">
        <div class="col-sm-1 offset-3">
          <label for="inputPhone" className="col-sm-2 control-label">
            Phone
          </label>
        </div>
        <div className="col-sm-3">
          <input
            type="text"
            className="form-control"
            placeholder="핸드폰 번호"
            value={JoinPhone}
            onChange={(e) => getJoinPhone(e)} //내용이 바뀔떄마다 Phone GET
          />
        </div>
        <div className="col-sm-3 offset-1">
          <button type="button" className="btn btn-secondary" onClick={send}>
            인증번호 받기
          </button>
        </div>
      </div>
      <div className="row p-4">
        <div class="col-sm-1 offset-3">
          <label for="inputPhone" className="col-sm-2 control-label"></label>
        </div>
        <div className="col-sm-3">
          <input
            type="text"
            className="form-control"
            placeholder="인증번호 입력"
            value={InputVerifyCode}
            onChange={(e) => getInputVerifyCode(e)} //내용이 바뀔떄마다 INputVerifyCode GET
          />
        </div>
        <div className="col-sm-3 offset-1">
          <button type="button" className="btn btn-primary" onClick={verify}>
            인증 확인
          </button>
        </div>
      </div>
      <div className="input-group p-4 offset-6">
        <button type="submit" className="btn btn-1g btn-success" onClick={Join}>
          {" "}
          가입{" "}
        </button>
        <button type="button" className="btn btn-light" onClick={Exit}>
          {" "}
          취소{" "}
        </button>
      </div>
    </div>
  );
};

export default Join;
