import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./login.css";
import axios from "axios";
import FindId from "./FindId";
import FindPwOK from "./FindPwOK";
import { Alert } from "react-bootstrap";



const LS_KEY_ID = "LS_KEY_ID"; //로컬스토리지에 저장할 ID
const LS_KEY_SAVE_ID_FLAG = "LS_KEY_SAVE_ID_FLAG"; //로컬스토리지에 저장 checkbox여부

const Login = () => {
  const [loginID, setLoginID] = useState(""); //LoginID를 Input에서 사용하고 OnChange에서 변경
  const [loginPassword, setLoginPassword] = useState(""); //비밀번호 입력을 위한 선언
  const [saveIDFlag, setSaveIDFlag] = useState(false); //ID저장 checkbox
  const [passwordOption, setPasswordOption] = useState(false); //비밀번호표시 checkBox컨트롤
  const [passwordInputType, setPasswordInputType] = useState({
    type: "password",
    autoComplete: "current-password",
  }); //type과 autoComplete를 변경하기 위한 useState
  const [capsLockFlag, setCapsLockFlag] = useState(false); //caps lock감지를 위한 flag
  const [findIdClick, setfindIdClick] = React.useState(false); // 모달창 온오프 변수 
  const [findPwOKClick, setfindPwOKClick] = React.useState(false); // 모달창 온오프 변수 

  const navigate = useNavigate();

  //getModifierState로 bool값을 얻어 CapsLockFlag로 set
  const checkCapsLock = (e) => {
    let capsLock = e.getModifierState("CapsLock");
    setCapsLockFlag(capsLock);
  };

  if (!!localStorage.getItem('MEM_ID')) {
    navigate('/');
  }

  //ID에 한글입력불가능
  // const dataRuleCheckForID = (ch) => {
  //   let ascii = ch.charCodeAt(0);
  //   if (48 /* 0 */ <= ascii && ascii <= 57 /* 9 */) return true;
  //   if (65 /* A */ <= ascii && ascii <= 90 /* Z */) return true;
  //   if (97 /* a */ <= ascii && ascii <= 122 /* z */) return true;
  //   if (ch === ".") return true;

  //   return false;
  // };

  // 가장 마지막에 입력된 문자로 dataRuleCheckForID를 호출하여 loginID를 set한다.
  const getLoginID = (event) => {
    let value = event.target.value.toUpperCase();
    setLoginID(value);
  };

  const handleSaveIDFlag = () => {
    localStorage.setItem(LS_KEY_SAVE_ID_FLAG, !saveIDFlag);
    setSaveIDFlag(!saveIDFlag);
  };

  const JoinClick = () => {
    navigate('/Join');

  }


  //로그인 버튼 눌렀을 때
  const loginClick = () => {

    if (loginID !== "") {
      //아이디가 비어있지 않을 때

      if (loginPassword !== "") {
        //패스워드가 비어있지 않을 때
        axios({
          //MEM_ID 와 MEM_PW로 확인하고 MEM_ID 로컬스토리지 저장
          method: "post",
          url: "/GareBnB/login/login.do",
          contentType: "application/json;charset=UTF-8",
          params: {
            'MEM_ID': loginID,
            'MEM_PW': loginPassword,
          },
        })
          .then((Response) => {
            if (Response.data === "") {
              //MEM_ID와 MEM_PW가 맞지않거나 없을 때 null이 리턴됨
              alert("아이디나 비밀번호를 잘못 입력하셨습니다.");
            } else {

              localStorage.setItem("MEM_ID", Response.data.MEM_ID); //MEM_ID만 로컬스토리지에 저장
              localStorage.setItem("JWT", Response.data.JWT);
              navigate('/')

            }
          })
          .catch((err) => {
            console.log(err);
            alert("로그인 에러입니다")
          });
      } else alert("비밀번호를 입력하세요");
    } else alert("아이디를 입력하세요");

    //체크박스 v인경우 (saveIDFlag ===true) 로컬스토리지에 loginId를 set
    if (saveIDFlag) localStorage.setItem(LS_KEY_ID, loginID);
  };

  /*페이지가 최초 렌더링 될 때 checkbox확인
  idFlag에 따라 checkbox를 변경해주고 false인 경우 ID를 ""로 set
  저장한 Id가 있다면 setLoginId로 ID를 보여준다.*/
  useEffect(() => {
    let idFlag = JSON.parse(localStorage.getItem(LS_KEY_SAVE_ID_FLAG));
    if (idFlag !== null) setSaveIDFlag(idFlag);
    if (idFlag === false) localStorage.setItem(LS_KEY_ID, "");

    let data = localStorage.getItem(LS_KEY_ID);
    if (data !== null) setLoginID(data);
  }, []);

  //PasswordOption이 변경될때마다 setPasswordInputType로 type과 autoComplete를 변경한다.
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

  const handleKeyPress = (e) => { // 비밀번호 입력 후, 엔터키를 누르면 로그인 함수 실행
    if (e.key === 'Enter') {
      loginClick();
    }
  }

  return (
    <section className="vh-100">
      <div className="container py-5 h-74">
        <div className="row d-flex align-items-center justify-content-center h-100">
          <div className="col-md-8 col-lg-7 col-xl-6">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              className="img-fluid"
              alt="Phone image"
            />
          </div>
          <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
            <form>
              <div className="col mb-4">
                <input
                  type="text"
                  id="ID"
                  className="form-control form-control-lg"
                  placeholder="ID"
                  value={loginID}
                  onChange={(e) => getLoginID(e)}
                />
              </div>

              <div className="form-outline mb-4">
                <input
                  type={passwordInputType.type}
                  id="PW"
                  className="form-control form-control-lg"
                  placeholder="PW"
                  autoComplete={passwordInputType.autoComplete}
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
              </div>

              <div className="d-flex justify-content-around align-items-center mb-4">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="form1Example3"
                    checked={saveIDFlag}
                    onChange={handleSaveIDFlag}
                  />
                  <label className="form-check-label" htmlFor="form1Example3">
                    {" "}
                    Remember me{" "}
                  </label>
                </div>
                <span>
                  forgot&nbsp;
                  <a href="#" onClick={() => setfindIdClick(true)}>ID</a> /&nbsp;
                  <a href="#" onClick={() => setfindPwOKClick(true)}>PassWord</a>
                  &nbsp;?
                </span>
              </div>

              <div className="form-outline mb-1">
                <div className="row d-flex justify-content-center align-items-center">
                  <div className='col-md-6'>
                    <button
                      type="button"
                      className="btn btn-primary btn-md btn-block"
                      onClick={() => loginClick()}
                    >
                      Sign In
                    </button>
                    &emsp;
                    <button
                      type="button"
                      className="btn btn-primary btn-md btn-block"
                      onClick={() => JoinClick()}
                    >
                      Sign Up
                    </button>
                  </div>
                </div> </div>
            </form>
          </div>
        </div>
      </div>

      <FindId
        show={findIdClick}
        onHide={() => setfindIdClick(false)}

      />

      <FindPwOK
        show={findPwOKClick}
        onHide={() => setfindPwOKClick(false)}
      />
    </section>
  );
};

export default Login;
