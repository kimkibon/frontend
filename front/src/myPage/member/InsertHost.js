import axios from 'axios';
import React from 'react'
import { Button, Modal } from 'react-bootstrap';
import InsertHostFiles from './InsertHostFiles';


const InsertHost = (props) => {
  const insertHost = props.insert.insertHost;
  const insertHostFiles = props.insert.insertHostFiles;

  //변수 초기 세팅

  const InsertHost = async (e) => {
    e.preventDefault();
    e.persist();

    const files = insertHostFiles.map(file => {
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
      method : 'post' ,
      url : '/GareBnB/mypage/memChange.do' ,
      contentType:"application/json;charset=UTF-8",
      params : insertHost
    //insertHost 리턴으로 MEM_IDX를 받아옴
    }).then(async Response => {
      files.map(async (file, index) => {
        await insertHostFiles(file, Response.data.MEM_IDX , index);
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
      <Button type='submit' variant="primary" onClick={async (e) => { InsertHost(e) }}>
        등록
      </Button>
    </Modal.Footer>
  </Modal>
)
}


export default InsertHost