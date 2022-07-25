import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Myreview =() => {
    const location = useLocation();
    const mem_id = location.state.CLI_ID;
    const board_no = location.state.RES_BOARD_NO;
    const after_date = location.state.after_date;


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
            {!myreview ? <h3>작성한 리뷰가 없습니다.</h3> 
            :   <div>
                    별점: {myreview.SCORE}<br/>
                    후기: {myreview.REVIEW_CONTENT}<br/>
                    {new Date().getTime()<after_date && 
                        <Link to ={'ModifyReview'} state={{'REVIEW_IDX': myreview.REVIEW_IDX, 'SCORE':myreview.SCORE, 'REVIEW_CONTENT':myreview.REVIEW_CONTENT}}>
                            <button>수정하기</button>
                        </Link> 
                    } 
                   
                    <Link to ={'DeleteReview'} state={{'REVIEW_IDX': myreview.REVIEW_IDX}}>
                        <button>삭제하기</button>
                    </Link>

                    <button onClick={(e)=>{
                            e.preventDefault();
                            navigate(-1); }}>뒤로가기</button>

                </div>

            }
        </div>

    )
}
export default Myreview;