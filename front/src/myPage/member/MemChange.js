import React, { useState } from 'react'
import InsertHost from './InsertHost';
import ImageUploadBox from '../host/myBoard/component/ImageUploadBox';

const MemChange = () => {

  // MEM_IDX 불러오는 기능있어야함

  const [inputs, setInputs] = useState({    
    MEM_IDX : 3,
    HOST_EMAIL : '',
    HOST_POST : '',
    HOST_ADDR1 : '',
    HOST_ADDR2 : '',
    HOST_JUMIN1 : '',
		HOST_JUMIN2 : '',
		HOST_INTRO : '',
		HOST_ACCOUNT : '',
		HOST_BANK : ''
  });  

  const {     
    MEM_IDX,
    HOST_EMAIL,
    HOST_POST,
    HOST_ADDR1,
    HOST_ADDR2,
    HOST_JUMIN1,
    HOST_JUMIN2,
    HOST_INTRO,
    HOST_ACCOUNT,
    HOST_BANK } = inputs;

  const onChange = (e) => {    
    const { value, name } = e.target;  
    setInputs({      
      ...inputs, // 기존의 input 객체를 복사한 뒤      
      [name]: value // name 키를 가진 값을 value 로 설정    
    });  
  };


  return (
    <div>

      <h3>이메일주소 : </h3>
      <input name="HOST_EMAIL" placeholder="Enter email" onChange={onChange} value={HOST_EMAIL} />
      <br/>
      <h3>우편번호 : </h3>
      <input name="HOST_POST" placeholder="Enter email" onChange={onChange} value={HOST_POST} />
      <br/>
      <h3>기본주소 : </h3>
      <input name="HOST_ADDR1" placeholder="Enter email" onChange={onChange} value={HOST_ADDR1} />
      <br/>
      <h3>상세주소 : </h3>
      <input name="HOST_ADDR2" placeholder="Enter email" onChange={onChange} value={HOST_ADDR2} />
      <br/>
      <h3>주민 등록 번호 : </h3>
      <input name="HOST_JUMIN1" placeholder="Enter email" onChange={onChange} value={HOST_JUMIN1} />
      <input name="HOST_JUMIN2" placeholder="Enter email" onChange={onChange} value={HOST_JUMIN2} />
      <br/>

      <h3>본인 소개 : </h3>
      <input name="HOST_INTRO" placeholder="Enter email" onChange={onChange} value={HOST_INTRO} />
      <br/>
      

      {/* 사진 첨부 */}

      <h3>은행 : </h3>
      <input name="HOST_BANK" placeholder="Enter email" onChange={onChange} value={HOST_BANK} />
      <br/>
      <h3>계좌번호 : </h3>
      <input name="HOST_ACCOUNT" placeholder="Enter email" onChange={onChange} value={HOST_ACCOUNT} />
      <br/>

      <button onClick={(e)=>{e.preventDefault();InsertHost(inputs);}}>등록하기</button>
    
    </div>
    
  )
}

export default MemChange
