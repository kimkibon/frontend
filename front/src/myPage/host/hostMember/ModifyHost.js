import axios from 'axios';
import React from 'react'
import { Button, Modal } from 'react-bootstrap';
import DeleteFiles from './DeleteFiles';
import ImageUploadBox from '../myBoard/component/ImageUploadBox';
import InsertFiles from '../myBoard/component/InsertFiles';
import UpdateFiles from './UpdateFiles';
import FileDelete from './component/FileDelete';
import { useNavigate } from 'react-router-dom';

const ModifyHost = (props) => {
  const hostModify = props.props.hostModify;
  const updateFiles = props.props.updateFiles;
  const navigate = useNavigate();

  //변수 초기 세팅
  const modify = async (e) => {
    e.preventDefault();
    e.persist();

      //문자열로 변환된 이미지를 다시 file객체로 변환 (insertfiles)
    const files = updateFiles.map(file => {
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

    // 수정완료 버튼 클릭 시 update sql문 실행됨
    
    axios({
        method : 'post',
        url : '/GareBnB/host/myPage/hostModify.do',
        contentType:"apllication/json; charset=UTF-8",
        params : hostModify
        }).then(Response => {

            FileDelete(hostModify.MEM_IDX,'1').then(res=>{

            files.map(async (file,index) => {  
                await UpdateFiles(file , hostModify.MEM_IDX , index , '1'); 
            })

          }).then(res => {

            alert('수정완료 성공');
            navigate('../hostInfo') // 수정완료 성공 알림창 확인 버튼 클릭 시 회원정보 보기 페이지로 이동됨

          })
        }).catch(err => {
            console.log(err);
        });
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
        <Button type='submit' variant="primary" onClick={async (e) => { modify(e) }}>
          등록
        </Button>
      </Modal.Footer>
    </Modal>
    )
  
}

export default ModifyHost