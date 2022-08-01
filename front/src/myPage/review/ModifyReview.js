import axios from 'axios';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Rating } from 'react-simple-star-rating';

const ModifyReview =() => {
    const location = useLocation();
    const review_idx = location.state.REVIEW_IDX;
    const score_before = location.state.SCORE;
    const content = location.state.REVIEW_CONTENT;

    const navigate = useNavigate();

    const [inputs, setInputs] = useState({    
        score: score_before,    
        review: content  
    });   

    const { score, review } = inputs;

    const onChange = (e) => {    
        const { value, name } = e.target;  
        setInputs({      
        ...inputs, // 기존의 input 객체를 복사한 뒤      
        [name]: value // name 키를 가진 값을 value 로 설정    
        });  
    };


    const updatereview = (e)=>{
        e.preventDefault();

        axios({
        method : 'post' ,
        url : '/GareBnB/mypage/reviewModify.do' ,
        contentType:"application/json;charset=UTF-8",
        params : {
            REVIEW_IDX : review_idx,
            SCORE : score,
            REVIEW_CONTENT : review
        }
        }).then(Response => {
            window.location.href="/myPage/memUseListPage"
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
        <h3>리뷰수정</h3>
        <div className='App'>
            <Rating transition onClick={handleRating} ratingValue={rating} allowHalfIcon showTooltip/>
        </div>
        <br/>
        <h3>내용 : </h3>      
        <input name="review" placeholder="후기" onChange={onChange} value={review}/>
        <button onClick={updatereview}>수정완료</button>
        <button onClick={(e)=>{
                e.preventDefault();
                navigate(-1); }}>취소</button>
        </div>
        
    )
}
export default ModifyReview;