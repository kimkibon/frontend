import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useLocation } from 'react-router-dom';
import SelectOneFile from '../../../commons/Files/SelectOneFile';

const HostDetailModal =(props) => {

    const [hostDetail, setHostDetail] = useState([]);
    const [url,setUrl] = useState(); //이미지파일 불러오기
  
    //호스트아이디
    const hostId = props.state.hostId;

    const gender=(num)=>{
      if(num===1){
        return '남';
      }
      else{
        return '여';
      }
    }
     
    useEffect(() => {
      setUrl('')
      if(!!props.state.hostId){
      //호스트정보 가져오기
      axios({
  
          method : 'post' ,
          url : '/GareBnB/myPage/hostDetail.do' ,
          contentType:"application/json;charset=UTF-8",
          params : {
            MEM_ID :props.state.hostId
      
          }
      }).then(Response => {
          console.log(Response.data); 
          setHostDetail(Response.data);
  
          SelectOneFile(1,Response.data.MEM_IDX,0).then(Res=>{
            setUrl("data:image/;base64,"+Res.URL);
          }); 
  
      });
  
    }
    } ,[props.state.hostId]);
  
  
    hostDetail['URL'] = url;

    
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <h4>{hostDetail.MEM_ID} 호스트의 정보</h4>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div className="container">
                <div className="row">
                    <div className="col-sm-4">
                        <img src={hostDetail.URL} width="300px" height="300px"/>
                    </div>
                    <div className='col-sm-8 align-self-center' >
                      <h5 className='float-end'>
                        이름 : {hostDetail.MEM_NAME}<br/>
                        전화번호 : {hostDetail.MEM_PHONE}<br/>
                        호스트 성별 : {gender(hostDetail.HOST_JUMIN2)}<br/>
                      </h5>
                    </div>
                </div>
            </div>

          </Modal.Body>
          <Modal.Footer>
            <Button onClick={props.onHide}>확인</Button>
          </Modal.Footer>
        </Modal>
      )
}
export default HostDetailModal;