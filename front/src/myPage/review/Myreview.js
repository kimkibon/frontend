import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Rating } from 'react-simple-star-rating';

const Myreview =() => {
    const location = useLocation();
    const mem_id = location.state.CLI_ID;
    const res_idx = location.state.RES_IDX;
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
                RES_IDX : res_idx
        
            }
        }).then(Response => {
            //console.log(Response.data); 
            setMyreview(Response.data);
        });
    },[]);


    //뒤로가기 동작
    const navigate = useNavigate();



    return (
        <div class="d-flex justify-content-center row">
        <div class="col-md-4 ">
            <h1>리뷰 확인</h1>
            {review_check===0 
            ? <div><h3>작성한 리뷰가 없습니다.</h3><br/><button type="button" class="btn btn-primary" onClick={(e)=>{e.preventDefault();navigate(-1); }}>확인</button></div>
            :   <div>
                    <div className='App'>
                        <Rating allowHalfIcon ratingValue={myreview.SCORE*20} readonly size={50} showTooltip/>
                    </div>

                    <p/>

                    <div className='row mx-auto'>
                    <div class="bg-white border rounded align-items-center col-10" style={{height: 120 + 'px'}} >
                        {myreview.REVIEW_CONTENT}
                    </div>
                    <div className='col-2'>
                    {new Date().getTime()<after_date && 
                            <Link to ={'ModifyReview'} state={{'REVIEW_IDX': myreview.REVIEW_IDX, 'SCORE':myreview.SCORE, 'REVIEW_CONTENT':myreview.REVIEW_CONTENT}}>
                                <button type="button" class="btn btn-success">수정</button>
                            </Link> 
                        } 
                         
                        <Link to ={'DeleteReview'} state={{'REVIEW_IDX': myreview.REVIEW_IDX}}>
                            <button type="button" class="btn btn-secondary ">삭제</button>
                        </Link>
                    </div>
                    </div>

                    <p/>
                    <div className='text-lg-center'>
                        <button type="button" class="btn btn-primary" onClick={(e)=>{
                                e.preventDefault();
                                navigate(-1); }}>확인</button>
                    </div>

                </div>

            }
            </div>
        </div>

    )
}
export default Myreview;