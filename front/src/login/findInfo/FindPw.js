import React from 'react'
import Modal from 'react-awesome-modal';

const FindPw = () => {
  const [inputName, setInputName] = useState("");
  const [inputPhone, setInputPhone] = useState("");
  const [inputID, setInputID] = useState("");
 

  const getInputName = (event) =>{  //이름
    let value = event.target.value;
    setInputName(value);
  };

  const getInputPhone = (event) =>{  //핸드폰번호
    let value = event.target.value;
    setInputPhone(value);
  };

  const getInputID = (event) =>{  //ID
    let value = event.target.value;
    setInputID(value);
  };

  const Exit = () => {  //취소하기
    navigate('/');
  };

  const findPw =() =>{  //PW찾기
    axios({
      method : 'post' ,
      url : '/GareBnB/login/findPw.do' ,
      contentType:"application/json;charset=UTF-8",
      params : {
          'MEM_ID' :  inputID ,
          'MEM_NAME'  : inputName ,
          'MEM_PHONE' : inputPhone   //ID,이름,핸드폰 받음
          

      }}).then(Response => {
        if (Response.data = null){  
          alert("아이디를 찾을 수 없습니다.");  //응답이 null일시 아이디 없는 상태
        } 
        else {
          console.log(Response.data.MEM_ID)
          alert(Response.data.MEM_ID)

          navigate('/');
        }
      }).catch(err => {
        console.log(err);
      });
    
  }


  return (
    <div>

      <input
        type="text"
        id="find_pw_id"
        name="find_pw_id"
        placeholder="아이디"
        value={inputID}
        onChange={(e) => getInputID(e)} //내용이 바뀔떄마다 ID GET
      />

      <input
        type="text"
        id="find_pw_name"
        name="find_pw_name"
        placeholder="이름"
        value={inputName}
        onChange={(e) => getInputName(e)} //내용이 바뀔떄마다 NAME GET
      />

      <input
        type="text"
        id="find_pw_phone"
        name="find_pw_phone"
        placeholder="전화번호"
        value={inputPhone}
        onChange={(e) => getInputPhone(e)} //내용이 바뀔떄마다 PHONE GET
      />

      

      <button onClick={findPw}> 비밀번호 찾기 </button>
      <button onClick={Exit}> 취소 </button>  

    </div>
  )
}

export default FindId