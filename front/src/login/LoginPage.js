import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const LS_KEY_ID = "LS_KEY_ID";
const LS_KEY_SAVE_ID_FLAG = "LS_KEY_SAVE_ID_FLAG";

const Login = () => {
  const [loginID, setLoginID] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [saveIDFlag, setSaveIDFlag] = useState(false);
  const [passwordOption, setPasswordOption] = useState(false);
  const [passwordInputType, setPasswordInputType] = useState({
    type: "password",
    autoComplete: "current-password",
  });
  const [capsLockFlag, setCapsLockFlag] = useState(false);

  const checkCapsLock = (e) => {
    let capsLock = e.getModifierState("CapsLock");
    setCapsLockFlag(capsLock);
  };

  const dataRuleCheckForID = (ch) => {
    let ascii = ch.charCodeAt(0);
    if (48 /* 0 */ <= ascii && ascii <= 57 /* 9 */) return true;
    if (65 /* A */ <= ascii && ascii <= 90 /* Z */) return true;
    if (97 /* a */ <= ascii && ascii <= 122 /* z */) return true;
    if (ch === ".") return true;

    return false;
  };

  const getLoginID = (event) => {
    let value = event.target.value;

    if (value === "") {
      setLoginID(value);
      return;
    }

    let length = value.length;
    if (dataRuleCheckForID(value[length - 1]) === false) return;
   
    setLoginID(value);

    return;
  };

  const handleSaveIDFlag = () => {
    localStorage.setItem(LS_KEY_SAVE_ID_FLAG, !saveIDFlag);
    setSaveIDFlag(!saveIDFlag);
  };

  const login = () => {
    console.log({ loginID, loginPassword });

    if (loginID === "") {
      alert("아이디를 입력해주세요.");
    }
    if (loginPassword === "") {
      alert("비밀번호를 입력해주세요.");
    }

    if (true /* login success */) {
      if (saveIDFlag) localStorage.setItem(LS_KEY_ID, loginID);
    }
  };

  useEffect(() => {

    let idFlag = JSON.parse(localStorage.getItem(LS_KEY_SAVE_ID_FLAG));
    if (idFlag !== null) setSaveIDFlag(idFlag);
    if (idFlag === false) localStorage.setItem(LS_KEY_ID, "");

    let data = localStorage.getItem(LS_KEY_ID);
    if (data !== null) setLoginID(data);
  }, []);

  useEffect(() => {
    if (passwordOption === false)
      setPasswordInputType({
        type: "password",
        autoComplete: "current-password",
      });
    else 
      setPasswordInputType({ 
        type: "text", 
        autoComplete: "off" 
      });
  }, [passwordOption]);

  return (
    <div className="login-form">
      <div className="login-wrapper">
        <div className="login-container">
          <div className="login-logo">
            <span className="logo-image">LOGO</span>
          </div>
          <form id="loginForm">
            <div className="input-group">
              <input
                type="text"
                id="email"
                name="email"
                placeholder="NAVER 아이디"
                className="input-id"
                onKeyDown={(e) => checkCapsLock(e)}
                value={loginID}
                onChange={(e) => getLoginID(e)}
              />
              <input
                type={passwordInputType.type}
                id="password"
                name="password"
                placeholder="비밀번호"
                className="input-pw"
                autoComplete={passwordInputType.autoComplete}
                onKeyDown={(e) => checkCapsLock(e)}
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
            </div>
            <div className="checkbox-wrapper">
              <span className="checkbox-item">
              <input
                type="checkbox"
                name="saveEmail"
                id="saveEmail"
                checked={saveIDFlag}
                onChange={handleSaveIDFlag}
              />
              <label>
                <span>아이디 저장</span>
              </label>
              </span>
              <span className="checkbox-item">
                <input
                  type="checkbox"
                  checked={passwordOption}
                  onChange={() => setPasswordOption(!passwordOption)}
                />
                <label>
                  <span>비밀번호 표시</span>
                </label>
              </span>
            <span
              className={
                capsLockFlag ? "caps-lock caps-lock-on" : "caps-lock"
              }
            >
              {capsLockFlag ? "Caps Lock On" : "Caps Lock Off"}
            </span>
            </div>

          <span className="login-button" onClick={login}>
            로그인
          </span>
          </form>
          <ul className="login-li-group">
            <li>
              <span onClick={() => alert("잘 기억해보세요.")}>아이디 찾기</span>
            </li>
            <li>
              <span onClick={() => alert("잘 기억해보세요.")}>
                비밀번호 찾기
              </span>
            </li>
            <li>
              <Link to="/signUp">
                <span className="bold">회원가입</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Login;