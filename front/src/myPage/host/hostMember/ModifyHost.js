import axios from 'axios';
import React from 'react'
import { Button, Modal } from 'react-bootstrap';
import DeleteFiles from './DeleteFiles';
import ImageUploadBox from '../myBoard/component/ImageUploadBox';
import InsertFiles from '../myBoard/component/InsertFiles';


const ModifyHost = (props) => {
  const hostModify = props.props.hostModify;
  const insertFiles = props.props.insertFiles;
  const deleteFiles = props.props.deleteFiles;

  //변수 초기 세팅
  const ModifyHost = async (e) => {
    e.preventDefault();
    e.persist();

     //문자열로 변환된 이미지를 다시 file객체로 변환 (deletefiles)
     const files = deleteFiles.map(file => {
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
      //문자열로 변환된 이미지를 다시 file객체로 변환 (insertfiles)
    const _files = insertFiles.map(file => {
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

    // 수정완료 버튼 클릭 시 update sql문 실행됨
    axios({
        method : 'post',
        url : '/GareBnB/host/myPage/hostModify.do',
        contentType:"apllication/json; charset=UTF-8",
        params : hostModify
        }).then(Response => {
            files.map(async (file, index) => {  
                await DeleteFiles(file , Response.data.MEM_IDX , index , '1'); 
                                // file, MEM_IDX, index, FILE_BOARD_TYPE
            })
        
                  // 파일 DB에 파일 정보 저장하려고 InsertFiles로 정보 보내기
            _files.map(async (file, index) => {  
              await InsertFiles(file , Response.data.MEM_IDX , index , '0' , '1'); 
                              // file, BOARD_NO, index, BOARD_MODIFY_NO, FILE_BOARD_TYPE
              })
        alert('수정완료 성공');
        window.location.href = '../host/hostInfo'; // 수정완료 성공 알림창 확인 버튼 클릭 시 회원정보 보기 페이지로 이동됨
        }).catch(err => {
            console.log(err);
        });

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
        <Button type='submit' variant="primary" onClick={async (e) => { ModifyHost(e) }}>
          등록
        </Button>
      </Modal.Footer>
    </Modal>
    )
  }
}

export default ModifyHost