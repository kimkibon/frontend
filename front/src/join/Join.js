import React, { useEffect, useState }from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Join = () => {

  const [JoinID, setJoinID] = useState("");
  const [JoinIDCheck, setJoinIDCheck] = useState("1"); //0: 중복체크 완료 , 1: 중복체크 미완료
  const [JoinPassword, setJoinPassword] = useState("");
  const [JoinPwCheck, setJoinPwCheck] = useState("");
  const [JoinName, setJoinName] = useState("");
  const [JoinPhone, setJoinPhone] = useState("");
  const navigate = useNavigate();
 
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
          if (Response.data == 0){
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
  }
  
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
        onChange={(e) => getJoinPhone(e)} //내용이 바뀔떄마다 PWCheck GET
      />
      <button onClick={IDDupCheck}> 중복확인 </button>
      <button onClick={Join}> 가입 </button>
      <button onClick={Exit}> 취소 </button>     
    </div>
  )
}

export default Join