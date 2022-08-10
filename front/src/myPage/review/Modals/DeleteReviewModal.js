import axios from 'axios';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const DeleteReviewModal =(props) => {

    const review_idx = props.state.REVIEW_IDX;

    return (
        <Modal
            {...props}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body>
                리뷰를 삭제하시겠습니까?
            </Modal.Body>
            <Modal.Footer>
                <button type="button" className="btn btn-secondary "  onClick={props.onHide}>취소</button>
                <button type="button" className="btn btn-primary " 
                        onClick={async() => {
                            await axios({
                                method : 'post' ,
                                url : '/GareBnB/mypage/deleteReview.do' ,
                                contentType:"application/json;charset=UTF-8",
                                params : {
                                    REVIEW_IDX : review_idx
                                }
                            }).then(Response => {
                                window.location.href="/myPage/memUseListPage"
                            });
                        }}>
                    확인
                </button>
            </Modal.Footer>
        </Modal>
      )
}
export default DeleteReviewModal;