import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { Rating } from 'react-simple-star-rating';

const InsertReview = () => {

  const location = useLocation();
  const mem_id = location.state.REVIEW_MEM_ID;
  const board_no = location.state.BOARD_NO;
  const res_idx = location.state.RES_IDX;


  const [inputs, setInputs] = useState({    
    score: '',    
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
        REVIEW_CONTENT : review,
        RES_IDX : res_idx
      }
    }).then(Response => {
        window.location.href="/myPage/memUseListPage"
    }).catch(error =>{
        alert("별점을 선택해주세요!")
    });
  }


  //별점
  const [rating, setRating] = useState(); // initial rating value

  // Catch Rating value
  const handleRating = (rate) => {

    const ratee = rate/20
    setInputs({      
      ...inputs, // 기존의 input 객체를 복사한 뒤      
      'score':  ratee// name 키를 가진 값을 value 로 설정    
    });  
  }



  return (
    <div>
      <h3>리뷰쓰기</h3>
      <div className='App'>
        <Rating transition onClick={handleRating} ratingValue={rating} allowHalfIcon showTooltip/>

      </div>
      <br/> 
      <textarea rows="4" cols="50" name="review" placeholder="후기를 작성하세요" onChange={onChange} value={review}/>
      <br/>
      <button type="button" className="btn btn-primary" onClick={inputreview}>등록하기</button>
    </div>
    
  )


}

export default InsertReview