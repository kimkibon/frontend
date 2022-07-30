import axios from 'axios'
import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const Refuse = (props) => {

    const navigate = useNavigate();

    const onClick = () => {

        axios({
            method :'post',
            url : '/GareBnB/Admin/hostBoardDeny',
            params : {
                'BOARD_NO' : props
            }
        }).then(()=> {
            // navigate('/')
        }).catch(err => {
            alert(err);
        })

    }

    return (
        <Modal
            {...props}
        >
            <Modal.Header closeButton>
                <Modal.Title>등록 거절 확인</Modal.Title>
            </Modal.Header>
            <Modal.Body>해당 글 등록을 거절하시겠습니까?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.onHide}>
                    취소
                </Button>
                <Button type='submit' variant="primary" onClick={async () => { await onClick() }}>
                    등록
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default Refuse