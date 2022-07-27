import React from 'react'
import Modal from 'react-awesome-modal';

const FindPw = () => {
  const [inputName, setInputName] = useState("");
  const [inputPhone, setInputPhone] = useState("");
  const [inputID, setInputID] = useState("");
 

  const getInputName = (event) =>{
    let value = event.target.value;
    setInputName(value);
  };

  const getInputPhone = (event) =>{
    let value = event.target.value;
    setInputPhone(value);
  };

  const getInputID = (event) =>{
    let value = event.target.value;
    setInputID(value);
  };

  const Exit = () => {
    navigate('/');
  };

  const findPw =() =>{
    axios({
      method : 'post' ,
      url : '/GareBnB/login/findPw.do' ,
      contentType:"application/json;charset=UTF-8",
      params : {
          'MEM_ID' :  inputID ,
          'MEM_NAME'  : inputName ,
          'MEM_PHONE' : inputPhone 
          

      }}).then(Response => {
        if (Response.date = null){
          alert("아이디를 찾을 수 없습니다.");
        }
        else {
          console.log(Response.data.MEM_ID)

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