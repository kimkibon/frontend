import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';

const InsertReview = () => {

  const location = useLocation();
  const mem_id = location.state.REVIEW_MEM_ID;
  const board_no = location.state.BOARD_NO;


  const [inputs, setInputs] = useState({    
    score: 5,    
    review: ''  
  });   

  const { score, review } = inputs;

  const onChange = (e) => {    
    const { value, name } = e.target;  
    setInputs({      
      ...inputs, // 기존의 input 객체를 복사한 뒤      
      [name]: value // name 키를 가진 값을 value 로 설정    
    });  
  };


  const inputreview = (e)=>{
    e.preventDefault();

    axios({
      method : 'post' ,
      url : '/GareBnB/mypage/reviewPut.do' ,
      contentType:"application/json;charset=UTF-8",
      params : {
        MEM_ID : mem_id,
        BOARD_NO : board_no,
        SCORE : score,
        REVIEW_CONTENT : review
      }
    }).then(Response => {
        window.location.href="/myPage/memUseListPage"
    });
  }

  return (
    <div>
      <h3>리뷰쓰기</h3>
      <h3>별점 : </h3>
      <input name="score" placeholder="별점" onChange={onChange} value={score} />
      <br/>
      <h3>내용 : </h3>      
      <input name="review" placeholder="후기" onChange={onChange} value={review}/>
      <button onClick={inputreview}>등록하기</button>
    </div>
    
  )


}

export default InsertReview