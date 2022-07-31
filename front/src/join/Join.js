import React, { useEffect, useState }from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import secret_key from './secret_sms';
import axios from 'axios';
import CryptoJS from 'crypto-js';

const Join = () => {

  const [JoinID, setJoinID] = useState("");
  const [JoinIDCheck, setJoinIDCheck] = useState("1"); //0: 중복체크 완료 , 1: 중복체크 미완료
  const [JoinPassword, setJoinPassword] = useState("");
  const [JoinPwCheck, setJoinPwCheck] = useState("");
  const [JoinName, setJoinName] = useState("");
  const [JoinPhone, setJoinPhone] = useState(""); //입력한 폰번호
  const [PhoneOK, setPhoneOK] = useState("0"); //미인증:0 인증:1 폰인증 됐는지?
  const [InputVerifyCode, setInputVerifyCode] = useState(""); //입력한 인증번호
  const navigate = useNavigate();

  const date = Date.now().toString;  
  const uri = secret_key.NCP_serviceID;
  const secretKey = secret_key.NCP_secretKey;
  const accessKey = secret_key.NCP_accessKey;
  const method = 'POST';
  const space =" ";
  const newLine = "\n";
  const url = 'https://sens.apigw.ntruss.com/sms/v2/services/ncp:sms:kr:290045243827:koo/messages';
  const url2 = '/sms/v2/services/${uri}/messages';
  
  // 헤더생성
  const hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, secretKey);

  // x-ncp-apigw-signature-v2 속성 설정을 위한 선언들
  hmac.update(method);
  hmac.update(space);
  hmac.update(url2);
  hmac.update(newLine);
  hmac.update(date);
  hmac.update(newLine);
  hmac.update(accessKey); 
  const hash = hmac.finalize();
  const signature = hash.toString(CryptoJS.enc.Base64);  //signature 선언

  const send = () => {  //인증문자 발송 함수
    const phoneNumber = JoinPhone;  //핸드폰번호 받기


    const verifyCode = Math.floor(Math.random()*(999999-100000))+100000; //난수로 인증번호 설정
    
     

    axios({
        method: method,  //POST
        json: true,  //JSON으로 전송
        url: url,  //api url
        headers:{  //헤더(수정X)
            'Content-Type' : 'application/json',
            'x-ncp-iam-access-key': accessKey,
            'x-ncp-apigw-timestamp': date,
            'x-ncp-apigw-signature-vw': signature,
        },
        data:{  //데이터
            type:'SMS',  //SMS로 전송
            contentType:'COMM', //광고문자 아닌 일반문자 전송
            countryCode:'82', //대한민국
            from: '01039578057',  //발신번호(등록해놓음)
            content:'[KOO]인증번호 [${verifyCode}를 입력해주세요.',  //내용
            messages:[
                {
                    to: '${phoneNumber}'  //수신번호(숫자사이 - 없어야함)
                },
            ],
        },
    })
    .then(Response => {  //성공여부 확인
        console.log("보냈다!!")
        sessionStorage.setItem('verifyCode',verifyCode)
    })
    .catch(err =>{
        if(err === undefined){
            console.log("보냈다")
            sessionStorage.setItem('verifyCode',verifyCode)
        }
        else console.log("안감?")
    });
  };

  const verify = () =>{ //인증문자 검증함수
    const verifyCode= sessionStorage.getItem('verifyCode')
    

    if(InputVerifyCode=== verifyCode){  //인증번호 = 입력된인증번호시)
        return setPhoneOK(1);
    }else if (InputVerifyCode!== verifyCode){  //캐시에 저장된 정보와 사용자가 입력한 인증번호가 다를시
        return setPhoneOK(0);
    }else{  //인증ok시
        console.log(PhoneOK)
    } 
  }
  const dataRuleCheckForID = (ch) => {
    let ascii = ch.charCodeAt(0);
    if (48 /* 0 */ <= ascii && ascii <= 57 /* 9 */) return true;
    if (65 /* A */ <= ascii && ascii <= 90 /* Z */) return true;
    if (97 /* a */ <= ascii && ascii <= 122 /* z */) return true;
    if (ch === ".") return true;

    return false;
  };

  const getJoinID = (event) =>{
    let value = event.target.value;

    if(value === ""){
      setJoinID(value);
      return;
    }
    let length = value.length;
    if(dataRuleCheckForID(value[length-1]) === false) return;

    setJoinID(value);
    setJoinIDCheck(1);

    return;
  };

  const getJoinPassword = (event) =>{
    let value = event.target.value;
    setJoinPassword(value);
  };
  const getJoinPwCheck = (event) =>{
    let value = event.target.value;
    setJoinPwCheck(value);
  };
  const getJoinName = (event) =>{
    let value = event.target.value;
    setJoinName(value);
  };
  const getJoinPhone = (event) =>{
    let value = event.target.value;
    setJoinPhone(value);
  };
  const getInputVerifyCode = (event) =>{
    let value = event.target.value;
    setInputVerifyCode(value);
  };

    


  

  const IDDupCheck = () =>{
    
    if(JoinID !== ""){
      axios({
        method : 'post' ,
        url : '/GareBnB//confirmId.do' ,
        contentType:"application/json;charset=UTF-8",
        params : {
            'MEM_ID' : JoinID   
        }}).then(Response => {
          console.log(Response.data)
          if (Response.data === 0){
            alert("아이디를 사용하실 수 있습니다.");  
            setJoinIDCheck(0);
          }
          else {
            alert("해당 아이디가 이미 존재합니다.");
          
          }
        }).catch(err => {
          console.log(err);
        });
      
    }
    else alert("아이디를 입력하세요");

  }

  const dataRuleCheckForPW =() =>{
    return (JoinPassword.length >= 8 ? true : false)
  }
  const SameCheckForPW =() =>{
    return (JoinPassword === JoinPwCheck ? true : false)
  }

  const Join = () => {
    console.log({JoinID, JoinPassword});
    if(JoinIDCheck===0){
      if(dataRuleCheckForPW()){
        if(SameCheckForPW()){
          if(JoinName!==""){
            if(JoinPhone!==""){
              axios({
                method : 'post' ,
                url : '/GareBnB//joinSuccess.do' ,
                contentType:"application/json;charset=UTF-8",
                params : {
                    'MEM_ID' : JoinID ,
                    'MEM_PW' : JoinPassword,
                    'MEM_NAME' : JoinName,
                    'MEM_PHONE' : JoinPhone  
                }}).then(Response => {
                  navigate('/');
                }).catch(err => {
                  console.log(err);
                });
              
            }
            else alert("휴대폰번호를 입력해주세요")
          }
          else alert("이름을 입력해주세요")
        }
        else alert("비밀번호가 같지 않습니다.")
      }
      else alert("비밀번호가 너무 짧습니다.")
    }
    else alert("아이디를 확인해주세요")
  };
  
  const Exit = () => {
    navigate('/');
  };

  return (
    <div>
      <input
        type="text"
        id="ID"
        name="ID"
        placeholder="아이디"
        value={JoinID}
        onChange={(e) => getJoinID(e)} //내용이 바뀔떄마다 ID GET
      />
      <input
        type="text"
        id="PW"
        name="PW"
        placeholder="비밀번호"
        value={JoinPassword}
        onChange={(e) => getJoinPassword(e)} //내용이 바뀔떄마다 PW GET
      />
      <input
        type="text"
        id="PWCheck"
        name="PWCheck"
        placeholder="비밀번호확인"
        value={JoinPwCheck}
        onChange={(e) => getJoinPwCheck(e)} //내용이 바뀔떄마다 PWCheck GET
      />
      <input
        type="text"
        id="NAME"
        name="NAME"
        placeholder="이름"
        value={JoinName}
        onChange={(e) => getJoinName(e)} //내용이 바뀔떄마다 Name GET
      />
      <input
        type="text"
        id="PHONE"
        name="PHONE"
        placeholder="전화번호확인"
        value={JoinPhone}
        onChange={(e) => getJoinPhone(e)} //내용이 바뀔떄마다 Phone GET
      />
      <input
        type="text"
        id="VerifyCode"
        name="VerifyCode"
        placeholder="인증번호 입력"
        value={InputVerifyCode}
        onChange={(e) => getInputVerifyCode(e)} //내용이 바뀔떄마다 INputVerifyCode GET
      />
      <button onClick={IDDupCheck}> 중복확인 </button>
      <button onClick={Join}> 가입 </button>
      <button onClick={Exit}> 취소 </button>     
      <button onClick={send}>인증번호 보내기</button>
      <button onClick={verify}>인증 확인</button>
    </div>
  )
}

export default Join