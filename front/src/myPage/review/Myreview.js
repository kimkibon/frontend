import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Rating } from 'react-simple-star-rating';

const Myreview =() => {
    const location = useLocation();
    const mem_id = location.state.CLI_ID;
    const board_no = location.state.RES_BOARD_NO;
    const after_date = location.state.after_date;
    const review_check = location.state.reviewcheck;
    

    const [myreview, setMyreview] = useState([]);

    useEffect(() => {
        axios({

            method : 'post' ,
            url : '/GareBnB/mypage/myReview.do' ,
            contentType:"application/json;charset=UTF-8",
            params : {
                MEM_ID : mem_id,
                BOARD_NO : board_no
        
            }
        }).then(Response => {
            //console.log(Response.data); 
            setMyreview(Response.data);
        });
    },[]);


    //뒤로가기 동작
    const navigate = useNavigate();



    return (
        <div>
            <h1>리뷰 확인</h1>
            {review_check===0 ? <h3>작성한 리뷰가 없습니다.</h3> 
            :   <div>
                    <div className='App'>
                        <Rating allowHalfIcon ratingValue={myreview.SCORE*20} readonly size={50} showTooltip/>
                    </div>
                    <p/>
                    후기: {myreview.REVIEW_CONTENT}<br/>
                    <p/>
                    {new Date().getTime()<after_date && 
                        <Link to ={'ModifyReview'} state={{'REVIEW_IDX': myreview.REVIEW_IDX, 'SCORE':myreview.SCORE, 'REVIEW_CONTENT':myreview.REVIEW_CONTENT}}>
                            <button type="button" class="btn btn-primary">수정하기</button>
                        </Link> 
                    } 
                    &nbsp; 
                    <Link to ={'DeleteReview'} state={{'REVIEW_IDX': myreview.REVIEW_IDX}}>
                        <button type="button" class="btn btn-primary">삭제하기</button>
                    </Link>
                    &nbsp; 
                    <button type="button" class="btn btn-primary" onClick={(e)=>{
                            e.preventDefault();
                            navigate(-1); }}>확인</button>

                </div>

            }
        </div>

    )
}
export default Myreview;