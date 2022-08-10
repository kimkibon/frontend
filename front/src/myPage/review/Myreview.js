import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Rating } from 'react-simple-star-rating';
import DeleteReviewModal from './Modals/DeleteReviewModal';

const Myreview = () => {
    const location = useLocation();
    const mem_id = location.state.CLI_ID;
    const res_idx = location.state.RES_IDX;
    const after_date = location.state.after_date;


    const [myreview, setMyreview] = useState([]);

    //리뷰삭제 모달
    const [modalShow, setModalShow] = useState(false);


    useEffect(() => {
        axios({

            method: 'post',
            url: '/GareBnB/mypage/myReview.do',
            contentType: "application/json;charset=UTF-8",
            params: {
                MEM_ID: mem_id,
                RES_IDX: res_idx

            }
        }).then(Response => {
            setMyreview(Response.data);
        });
    }, []);

    //뒤로가기 동작
    const navigate = useNavigate();

    return (
        <div className="d-flex justify-content-center">
            <div className="col-4 ">
                <h1>리뷰 확인</h1>
                <div>
                    <div className='App'>
                        <Rating allowHalfIcon ratingValue={myreview.SCORE * 20} readonly size={50} showTooltip />
                    </div>

                    <p />

                    <div className="d-flex justify-content-start">
                        <div className="border rounded  col-11" style={{ height: 120 + 'px' }} >
                            {myreview.REVIEW_CONTENT}
                        </div>

                        <div className='col-4 m-2'>

                            {new Date().getTime() < after_date &&
                                //     <Link to={'ModifyReview'} state={{
                                //         'REVIEW_IDX': myreview.REVIEW_IDX,
                                //         'SCORE': myreview.SCORE, 'REVIEW_CONTENT': myreview.REVIEW_CONTENT
                                //     }}>
                                //         <button type="button" className="btn btn-info">
                                //             수정</button><br /><br />
                                //     </Link>
                                // }
                                <Button className="btn btn-secondary" type="button">
                                    <Link to={'ModifyReview'} style={{ textDecoration: "none", color: "white" }}
                                        state={{ 'REVIEW_IDX': myreview.REVIEW_IDX, 'SCORE': myreview.SCORE, 'REVIEW_CONTENT': myreview.REVIEW_CONTENT }}>수정</Link>
                                </Button>
                            } <br /><br />

                            <DeleteReviewModal show={modalShow} onHide={() => setModalShow(false)}
                                state={{ 'REVIEW_IDX': myreview.REVIEW_IDX }} />

                            {/* <button type="button" 
                                    style={{width:58+'px',height:38+'px',backgroundColor:'#F3969A',border:'none',color:'white',borderRadius:0.4+'em'}} 
                                    onClick={()=>{setModalShow(true)}}>삭제</button> */}
                            <Button className="btn btn-primary " type="button"
                                onClick={() => { setModalShow(true) }}>
                                삭제</Button>

                        </div>

                    </div>
                    <div className='text-lg-center m-4'>
                        <button type="button" className="btn btn-primary" onClick={(e) => {
                            e.preventDefault();
                            navigate(-1);
                        }}>확인</button>
                    </div>

                </div>


            </div>
        </div>

    )
}
export default Myreview;