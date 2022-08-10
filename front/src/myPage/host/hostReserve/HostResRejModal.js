import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import SelectOneFile from '../../../commons/Files/SelectOneFile';

const HostResRejModal =(props) => {

    const [resContent, setResContent] = useState();

    const onChange = (e) => {
        setResContent(e.target.value);  
    };

    const insertRej=()=>{
        //거절 사유 입력
        axios({

            method : 'post' ,
            url : '/GareBnB/host/mypage/resRejectPut.do' ,
            contentType:"application/json;charset=UTF-8",
            params : {
            RES_REJ : resContent,
            RES_IDX : props.state.residx
            }
        }).then(Response => {
            window.location.href="/myPage/host/hostReserve"
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
                    <h4>거절 사유를 입력해 주세요</h4>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                <textarea onChange={(e) => { onChange(e) }} value={resContent} style={{width:100+"%",height:100+"px",resize:'none',border:'none'}}/>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='danger' onClick={()=>{setResContent('');props.onHide();}}>취소</Button>
                <Button variant="primary" onClick={async() => {await insertRej()}}>
                    확인
                </Button>
            </Modal.Footer>
        </Modal>
      )
}
export default HostResRejModal;