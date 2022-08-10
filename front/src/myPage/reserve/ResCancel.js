import axios from 'axios';
import { useLocation} from 'react-router-dom';

import Modal from 'react-bootstrap/Modal';


//예약취소 모달
const ReserveCancel =(props) => {

    const res_idx = props.state.RES_IDX;

    return (
        <Modal
            {...props}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body>
                예약을 취소하시겠습니까?
            </Modal.Body>
            <Modal.Footer>
                <button type="button" className="btn btn-secondary "  onClick={props.onHide}>취소</button>
                <button type="button" className="btn btn-primary " 
                        onClick={async() => {
                            await  axios({
                                method : 'post' ,
                                url : '/GareBnB/mypage/ResCancel.do' ,
                                contentType:"application/json;charset=UTF-8",
                                params : {
                                    RES_IDX : res_idx
                                }
                            }).then(Response => {
                                window.location.href="/myPage"
                            });
                        }}>
                    확인
                </button>
            </Modal.Footer>
        </Modal>
      )
}
export default ReserveCancel;