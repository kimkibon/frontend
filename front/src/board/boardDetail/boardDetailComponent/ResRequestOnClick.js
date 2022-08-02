import axios from "axios";
import { Button, Modal } from "react-bootstrap"
import { useNavigate } from "react-router";

// 예약 요청을 보내는 컴포넌트, 모달창
// 예약 확인을 누르면 예약 요청이 가고, 에러가 나오면 요청에 실패 했다고 나옴.

function ResRequestOnClick(props) {
    const navigate = useNavigate();
    
    async function reservation(){
       await axios({
            method : 'post',
            url: '/GareBnB//mypage/resRequest.do',
            params : props.props
        }).then(Response =>{

            navigate('/myPage');
            //응답이 완료되면 페이지 이동

        }).catch(()=>{
            alert('예약 요청에 실패했습니다. 다시 시도해주세요.');

            
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
      // resRequest 컴포넌트에서 변수를 받아옴. 
  )
  
}

export default ResRequestOnClick