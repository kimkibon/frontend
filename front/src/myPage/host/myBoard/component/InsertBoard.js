import axios from 'axios';
import React from 'react'
import { Button, Modal } from 'react-bootstrap';
import InsertFiles from './InsertFiles';

const InsertBoard = (props) => {
  const insertBoard = props.insertBoard;
  const insertFiles = props.insertFiles;
  const FILE_BOARD_TYPE = props.fileType;
  const postUrl = props.postUrl;
  let BOARD_NO = ''
  let FILE_MODIFY_NO = ''

  if(insertBoard.MEM_IDX !== undefined) {
    BOARD_NO = insertBoard.MEM_IDX
    FILE_MODIFY_NO = '0'
  }

  if(insertBoard.BOARD_NO !== undefined){
    BOARD_NO = insertBoard.BOARD_NO
  }

  //변수 초기 세팅

  const InsertBoard = async (e) => {
    e.preventDefault();
    e.persist();

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

    //문자열로 변환된 이미지를 다시 file객체로 변환

    axios({
      method: 'post',
      url: postUrl,
      params: insertBoard
      //보드 인서트 리턴으로 보드 넘버를 받아옴
    }).then(async Response => {

      if(Response.data.BOARD_NO !== undefined) {
        BOARD_NO = Response.data.BOARD_NO
        FILE_MODIFY_NO = '0'
      } else if(Response.data.BOARD_MODIFY_NO !== undefined){
        FILE_MODIFY_NO = Response.data.BOARD_MODIFY_NO
      }

      files.map(async (file, index) => {

        await InsertFiles(file, index , BOARD_NO , FILE_MODIFY_NO , FILE_BOARD_TYPE);

      })
      
    })
    // 받아온 보드 넘버로 이미지 파일을 업로드
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