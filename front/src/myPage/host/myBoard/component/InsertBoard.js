import axios from 'axios';
import React, { useEffect } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import InsertFiles from './InsertFiles';

const InsertBoard = (props) => {
  const navigate = useNavigate();
  const insertBoard = props.insert.insertBoard;
  const insertFiles = props.insert.insertFiles;





  const InsertBoard = async (e) => {
    e.preventDefault();
    e.persist();

    let formData = new FormData();
    const files = insertFiles.map(file => {
      let arr = file.url.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);

      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return (
        new File([u8arr], file.fileName, { type: mime })
      )
    })

    await axios({
      method: 'post',
      url: '/GareBnB/host/mypage/myboardPut.do',
      params: insertBoard

    }).then(async Response => {
      files.map(async (file, index) => {
        await InsertFiles(file, Response.data.BOARD_NO , index);
      })
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
        <Button type='submit' variant="primary" onClick={async (e) => { InsertBoard(e) }}>
          등록
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default InsertBoard