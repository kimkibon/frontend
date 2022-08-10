import axios from 'axios';
import React from 'react'
import { Button, Modal } from 'react-bootstrap';
import InsertFiles from '../host/myBoard/component/InsertFiles';


const InsertHost = (props) => {
  const insertHost = props.props.insertHost;
  const insertFiles = props.props.insertFiles;

  //변수 초기 세팅
  const InsertHost = async (e) => {
    e.preventDefault();
    e.persist();

    const files = insertFiles.map(file => {
      let arr = file.URL.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);

      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return (
        new File([u8arr], file.FILE_NAME, { type: mime })
       
      )

    })


    //문자열로 변환된 이미지를 다시 file객체로 변환

    axios({ // 호스트 DB 에 정보 insert
      method : 'post' ,
      url : '/GareBnB/mypage/memChange.do' , 
      contentType:"application/json;charset=UTF-8",
      params : insertHost
      }).then(Response => {
      }).catch(err => {
        console.log(err);
      });

      
    axios({ // 호스트 등록 요청했으므로, 레벨을 2(일반) -> 3(호스트 대기)로 update
      method : 'post' ,
      url : '/GareBnB/mypage/updateHostMem.do' ,
      contentType:"application/json;charset=UTF-8",
      params : {
          MEM_IDX : insertHost.MEM_IDX
          }}).then(Response => {
          }).catch(err => {
            console.log(err);
          });
   
          // 파일 DB에 파일 정보 저장하려고 InsertFiles로 정보 보내기
      files.map(async (file, index) => {  
      await InsertFiles(file , insertHost.MEM_IDX , index , '0' , '1'); 
                      // file, BOARD_NO , index , FILE_MODIFY_NO , FILE_BOARD_TYPE
      })}

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