import axios from 'axios';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const DeleteReview =() => {
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <div className="d-flex justify-content-center row">
            <div className="col-md-4 ">
                <h1>리뷰를 삭제하시겠습니까?</h1>
                <p/>
                <button type="button" className="btn btn-primary" onClick={(e)=>{
                    e.preventDefault();
                    axios({
                            method : 'post' ,
                            url : '/GareBnB/mypage/deleteReview.do' ,
                            contentType:"application/json;charset=UTF-8",
                            params : {
                                REVIEW_IDX : location.state.REVIEW_IDX
                            }
                        }).then(Response => {
                            window.location.href="/myPage/memUseListPage"
                        });
                }}> 확인 </button>
                &nbsp;
                <button type="button" className="btn btn-secondary" onClick={(e)=>{
                    e.preventDefault();
                    navigate(-1); }}>취소</button>
            </div>
        </div>
        
    )
}
export default DeleteReview;