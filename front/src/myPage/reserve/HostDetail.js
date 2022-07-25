import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';


const HostDetail = () => {
  const [hostDetail, setHostDetail] = useState([]);

  const location = useLocation();

  const gender=(num)=>{
    if(num===1){
      return '남';
    }
    else{
      return '여';
    }
  }

  const navigate = useNavigate();
  
  useEffect(() => {
    axios({

        method : 'post' ,
        url : '/GareBnB/myPage/hostDetail.do' ,
        contentType:"application/json;charset=UTF-8",
        params : {
          MEM_ID : location.state.hostId
    
        }
    }).then(Response => {
        console.log(Response.data); 
        setHostDetail(Response.data);
    });
  } ,[]);

  return (
    <div>
      <h1>{hostDetail.MEM_ID} 호스트의 정보</h1>
      <h3>이름 : {hostDetail.MEM_NAME}<br/>
          전화번호 : {hostDetail.MEM_PHONE}<br/>
          호스트 성별 : {gender(hostDetail.HOST_JUMIN2)}<br/>
          호스트 사진
      </h3>
      <button onClick={()=> navigate(-1)}>확인</button>
    </div>
    
  )
}

export default HostDetail