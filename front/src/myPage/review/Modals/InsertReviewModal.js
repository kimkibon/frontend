import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Rating } from 'react-simple-star-rating';

const InsertReviewModal =(props) => {

    const mem_id = props.state.REVIEW_MEM_ID;
    const board_no = props.state.BOARD_NO;
    const res_idx = props.state.RES_IDX;
  
  
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

    const inputreview = ()=>{

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
        })
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
        <Modal
            {...props}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <div className='App'>
                        <Rating transition onClick={handleRating} ratingValue={rating} allowHalfIcon showTooltip/>
                    </div>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                <textarea onChange={onChange} name="review" placeholder="리뷰를 작성하세요" value={review} style={{width:100+"%",height:100+"px",resize:'none',border:'none'}}/>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='danger' onClick={()=>{setInputs('');props.onHide();}}>취소</Button>
                <Button variant="primary" onClick={async() => {await inputreview()}}>
                    확인
                </Button>
            </Modal.Footer>
        </Modal>
      )
}
export default InsertReviewModal;