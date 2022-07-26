import React from 'react'

const Join = () => {

  const [JoinID, setJoinID] = useState("");
  const [JoinIDCheck, setJoinIDCheck] = useState(""); //0: 중복체크 완료 , 1: 중복체크 미완료
  const [JoinPassword, setJoinPassword] = useState("");
  const [JoinPwCheck, setJoinPwCheck] = useState("");
  const [JoinName, setJoinName] = useState("");
  const [JoinPhone, setJoinPhone] = useState("");
 
 
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
    if(dataRuleCheckForPW){

    }


  }

  

  const IDDupCheck = () =>{
    
    if(JoinID !== ""){
      axios({
        method : 'post' ,
        url : '/GareBnB/login/IDCheck.do' ,
        contentType:"application/json;charset=UTF-8",
        params : {
            'MEM_ID' : JoinID   
        }}).then(Response => {
          if (Response.date = null){
            alert("해당 아이디가 존재하지 않습니다.");  
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
    JoinPassword.length < 8 ? true : false;
  }
  const SameCheckForPW =() =>{
    JoinPassword != JoinPwCheck ? true : false;
  }

  const Join = () => {
    console.log({JoinID, JoinPassword});

    if(CheckedID !== ""){
      
    }


  }


  return (
    <div>
      <input
        type="text"
        id="ID"
        name="ID"
        placeholder="아이디"
        className="input-id"
        value={JoinID}
        onChange={(e) => getJoinID(e)} //내용이 바뀔떄마다 ID GET
      />
      <input
        type="text"
        id="PW"
        name="PW"
        placeholder="비밀번호"
        className="input-pw"
        value={JoinPassword}
        onChange={(e) => setJoinPassword(e.target.value)} //내용이 바뀔떄마다 PW GET
      />
    </div>
  )
}

export default Join