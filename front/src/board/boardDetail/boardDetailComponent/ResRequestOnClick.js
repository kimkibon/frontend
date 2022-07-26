import axios from "axios";
import { async } from "q";
import { Button, Modal } from "react-bootstrap"
import { useNavigate } from "react-router";

function ResRequestOnClick(props) {
    const navigate = useNavigate();
    console.log(props.props);

    async function reservation(){
       await axios({
            method : 'post',
            url: '/GareBnB//mypage/resRequest.do',
            params : props.props
        }).then(Response =>{

            navigate('/board/resDetail');

        }).catch(()=>{
            alert('예약 요청에 실패했습니다. 다시 시도해주세요.');
            navigate('/board/resDetail');

            
        })
    }
  return ( 
    <Modal 
    {...props}
    >
        <Modal.Header closeButton>
          <Modal.Title>예약 확인</Modal.Title>
        </Modal.Header>
        <Modal.Body>해당 내용으로 예약 하시겠습니까?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>
            취소
          </Button>
          <Button variant="primary" onClick={async() => {await reservation()}}>
            예약
          </Button>
        </Modal.Footer>
      </Modal>
  )
  
}

export default ResRequestOnClick