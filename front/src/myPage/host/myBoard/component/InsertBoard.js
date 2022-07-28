import axios from 'axios';
import React from 'react'
import { Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router';

const InsertBoard = (props) => {
  const navigate = useNavigate();
  const insertBoard = props.insert.insertBoard;
  const insertFiles = props.insert.insertFiles.map(file => { return (file.split(',')[1]) })

  console.log(insertBoard);
  console.log(insertFiles);

  async function InsertBoard() {
    let formData = new FormData();
    for (let i = 0; i < insertFiles.length; i++) {
      formData.append("files", insertFiles[i]);
    }

    await axios({
      method: 'post',
      url: '/GareBnB/host/mypage/myboardPut.do',
      params: insertBoard

    }).then(Response => {

      axios({
        method: 'post',
        url: '/GareBnB/file/insert.do',
        params: {
          'BOARD_NO': Response.data.BOARD_NO,
          'FILE_BOARD_TYPE': '0',
        },
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: formData

      }).then(Response => {
        navigate('/')
      })

    }).catch(() => {
      alert('예약 요청에 실패했습니다. 다시 시도해주세요.');
    })

  }
  return (
    <Modal
      {...props}
    >
      <Modal.Header closeButton>
        <Modal.Title>글 등록 확인</Modal.Title>
      </Modal.Header>
      <Modal.Body>해당 내용으로 글을 작성하시겠습니까?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          취소
        </Button>
        <Button variant="primary" onClick={async () => { await InsertBoard() }}>
          등록
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default InsertBoard