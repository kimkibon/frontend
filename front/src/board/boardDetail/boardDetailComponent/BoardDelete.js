import axios from 'axios';
import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

const BoardDelete = (props) => {

    const navigate = useNavigate();
    
    const onClick = () => {

        axios({
            method :'post',
            url : '/GareBnB/host/mypage/myboardDelete.do',
            params : {
                'BOARD_NO' : props.state
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
                <Modal.Title>글 삭제 확인</Modal.Title>
            </Modal.Header>
            <Modal.Body>해당 글을 삭제 하시겠습니까?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.onHide}>
                    취소
                </Button>
                <Button type='submit' variant="danger" onClick={async () => { await onClick() }}>
                    삭제
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default BoardDelete