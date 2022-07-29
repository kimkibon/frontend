import axios from 'axios';
import React, { useEffect } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router';

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

    for (let i = 0; i < insertFiles.length; i++) {
      formData.append(i, files[i]);
    }

    await axios({
      method: 'post',
      url: '/GareBnB/host/mypage/myboardPut.do',
      params: insertBoard

    }).then(async Response => {

      await axios({
        method: 'post',
        url: '/GareBnB/file/insert.do',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        params: {
          'BOARD_NO': Response.data.BOARD_NO,
          'FILE_BOARD_TYPE': '0'
        },
        data: formData,
        mode: 'cors'

      }).then(Response => {
        console.log(Response.data)
        // navigate('/')
      }).catch(() => {
        alert('예약 요청에 실패했습니다. 다시 시도해주세요.');
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